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

import client.MapleCharacter;
import net.server.channel.Channel;
import tools.DatabaseConnection;

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
        Document doc = makeDoc("http://www.gtop100.com/home/report1?siteid=" + details[0] + "&pass=" + details[1]);
        if (doc != null) {
            NodeList entries = doc.getElementsByTagName("entry");
            for (int i = 0; i < entries.getLength(); i++) {
                Node entryNode = entries.item(i);
                if (entryNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element entryElement = (Element) entryNode;
                    Element ipElement = (Element) entryElement.getElementsByTagName("ip").item(0);
                    String ip = ((Node) ipElement.getChildNodes().item(0)).getNodeValue().trim();
                    Element timeElement = (Element) entryElement.getElementsByTagName("time").item(0);
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-DD hh:mm:ss");
                    formatter.setLenient(false);
                    long time = 0;
                    Date date = null;
                    String str = ((Node) timeElement.getChildNodes().item(0)).getNodeValue().trim();
                    try {
						date = (Date) formatter.parse(str);
						time = date.getTime();
					} catch (DOMException e) {
						e.printStackTrace();
					} catch (ParseException e) {
						// e.printStackTrace();
					}
                    logVote(ip, "");
                    countVoteByIp(ip);
                    SimpleDateFormat sdf = new SimpleDateFormat("hh:mm dd/MM");
                    log("IP: " + ip + " voted at: " + sdf.format(new Date(time)));
                }
            }
            
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
            }
        } else {
            log("Your GTOP details are wrong");
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
            pce.printStackTrace();
            return null;
        } catch (SAXException saxe) {
            saxe.printStackTrace();
            return null;
        } catch (IOException ioe) {
            ioe.printStackTrace();
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
        	
        	PreparedStatement ps = con.prepareStatement("SELECT * FROM votingrecords WHERE ip = ? AND siteid = 1 LIMIT 1");
        	ps.setString(1, ip);
        	ResultSet rs = ps.executeQuery();
        	rs.next();
        	
        	for (Channel ch : Server.getInstance().getAllChannels()) {
        		Collection<MapleCharacter> players = ch.getPlayerStorage().getAllCharacters();
        		synchronized (players) {
	        		for (MapleCharacter chr : players)
	        			if (chr.getClient().getAccountName().equals(rs.getString("account"))) {
	        				chr.addVP(2);
	        				chr.gainNX(10000);
	        				chr.dropMessage(5, "Your account has received its rewards for voting! Thank you for voting!");
	        				return true;
	        			}
        		}
        	}
        	
        	
            ps = con.prepareStatement("UPDATE `accounts` "
	                  + "SET `votepoints` = `votepoints` + 2, "
	                  + "`nxCredit` = `nxCredit` + 10000 "
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
        	for (Channel ch : Server.getInstance().getAllChannels()) {
        		Collection<MapleCharacter> players = ch.getPlayerStorage().getAllCharacters();
	    		synchronized (players) {
	        		for (MapleCharacter chr : players)
	        			if (chr.getClient().getAccountName().equals(account)) {
	        				chr.addVP(2);
	        				chr.gainNX(10000);
	        				chr.dropMessage(5, "Your account has received its rewards for voting! Thank you for voting!");
	        				return true;
	        			}
	    		}
        	}
        	
            PreparedStatement ps = con.prepareStatement("UPDATE `accounts` "
                                                      + "SET `votepoints` = `votepoints` + 2,"
                                                      + "`nxCredit` = `nxCredit` + 10000 "
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