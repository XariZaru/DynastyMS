package net.server;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import tools.DatabaseConnection;
import client.MapleCharacter;

/**
 * GTOP Vote Checker
 * @author AskHugo
 * MIT Licensed
 */
public class VoteChecker implements Runnable {

    private final String[] details = {
        "90554",
        "matkimj1"
    };
    private final boolean silent = false;
    
    public void run() {
    	log("Updating Vote Logs");
    	
        // UltimatePrivateServers
        try {
        	PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM ultimatevotes");
        	ResultSet rs = ps.executeQuery();
        	while (rs.next()) {
        		countVote(rs.getString("name"));
        		log("Account: " + rs.getString("name") + " voted at UltimatePrivateServers");
        	}
        	ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM ultimatevotes");
        	ps.executeUpdate();
        	ps.close();
        	rs.close();
        } catch (Exception e) {
        	e.printStackTrace();
        	//log("Logging UltimatePrivateServer votes failed.");
        }
        
        try {
	        Document doc = makeDoc("http://www.gtop100.com/home/report1?siteid=" + details[0] + "&pass=" + details[1]);
	        NodeList entries = doc.getElementsByTagName("entry");
	        for (int i = 0; i < entries.getLength(); i++) {
	            Node entryNode = entries.item(i);
	            if (entryNode.getNodeType() == Node.ELEMENT_NODE) {
	                Element entryElement = (Element) entryNode;
	                Element ipElement = (Element) entryElement.getElementsByTagName("ip").item(0);
	                String ip = ((Node) ipElement.getChildNodes().item(0)).getNodeValue().trim();
	                countVoteByIp(ip);
	                log("IP: " + ip + " voted.");
	            }
	        }
        } catch (Exception e) {
            log("Your GTOP details are wrong or GTOP is messing up.");
        }
    }

    public static Document makeDoc(String site) {
        try {
            URL url = new URL(site);
            InputStream is = url.openStream();
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document d = db.parse(is);
            is.close();
            d.getDocumentElement().normalize();
            return d;
        } catch (ParserConfigurationException pce) {
        	System.out.println("ParserConfigurationException: VoteChecker");
            //pce.printStackTrace();
            return null;
        } catch (SAXException saxe) {
        	System.out.println("SAXException: VoteChecker");
            //saxe.printStackTrace();
            return null;
        } catch (IOException ioe) {
        	System.out.println("IOException: VoteChecker");
            //ioe.printStackTrace();
            return null;
        } catch (Exception e) {
        	return null;
        }
    }

//    public static boolean voteCounted(String ip, long time) {
//        Connection con = DatabaseConnection.getConnection();
//        try {
//            PreparedStatement ps = con.prepareStatement("SELECT `id` FROM `gtopvotes` WHERE `ip`=? AND `timestamp`=?");
//            ps.setString(1, ip);
//            ps.setLong(2, time);
//            ResultSet rs = ps.executeQuery();
//            boolean counted = rs.next();
//            rs.close();
//            ps.close();
//            return counted;
//        } catch (SQLException ex) {
//            ex.printStackTrace();
//        }
//        return false;
//    }

    public static boolean logVote(String ip, String time) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("INSERT INTO `gtopvotes` (`ip`,`timestamp`) VALUES (?,?)");
            ps.setString(1, ip);
            ps.setString(2, time);
            ps.execute();
            return true;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return false;
    }
    
    public static boolean countVoteByIp(String ip) {
    	Connection con = DatabaseConnection.getConnection();
        try {
        	
        	PreparedStatement ps = con.prepareStatement("SELECT * FROM votingrecords WHERE ip = ? AND siteid = 1 ORDER BY date DESC LIMIT 1");
        	ps.setString(1, ip);
        	ResultSet rs = ps.executeQuery();
        	rs.next();
        	if (rs.getString("account") != null) {
	        	Collection<MapleCharacter> players = Server.getInstance().getWorld(0).getPlayerStorage().getAllCharacters();
	        	synchronized (players) {
		    		for (MapleCharacter chr : players)
		    			if (chr.getClient().getAccountName().toLowerCase().equals(rs.getString("account").toLowerCase())) {
		    				chr.addVP(2);
		    				chr.gainNX(5000);
		    				chr.dropMessage(5, "Your account has received 5000 NX and 2 VP for voting GTOP! Thank you for voting!");
		    				return true;
		    			}
	        	}
        	}
        	
        	
            ps = con.prepareStatement("UPDATE `accounts` "
	                  + "SET `votepoints` = `votepoints` + 2, "
	                  + "`nxCredit` = `nxCredit` + 5000 "
	                  + "WHERE `name`= ?");
            ps.setString(1, rs.getString("account"));
            ps.executeUpdate();
            ps.close();
            rs.close();
            return true;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return false;
    }

    public static boolean countVote(String account) {
        Connection con = DatabaseConnection.getConnection();
        try {
        	Collection<MapleCharacter> players = Server.getInstance().getWorld(0).getPlayerStorage().getAllCharacters();
    		synchronized (players) {
        		for (MapleCharacter chr : players)
        			if (chr.getClient().getAccountName().toLowerCase().equals(account.toLowerCase())) {
        				chr.addVP(2);
        				chr.gainNX(5000);
        				chr.dropMessage(5, "Your account has received 5000 NX and 2 VP for voting UltimatePrivateServers! Thank you for voting!");
        				return true;
        			}
        	}
        	
            PreparedStatement ps = con.prepareStatement("UPDATE `accounts` "
                                                      + "SET `votepoints` = `votepoints` + 2,"
                                                      + "`nxCredit` = `nxCredit` + 5000 "
                                                      + "WHERE `name`= ?");
            ps.setString(1, account);
            ps.execute();
            ps.close();
            return true;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return false;
    }
    
    private void log(String msg) {
        if (!silent) {
            System.out.println("[VoteChecker] " + msg);
        }
    }
}  