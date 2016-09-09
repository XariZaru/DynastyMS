package server.partyquest;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import tools.DatabaseConnection;
import client.MapleCharacter;

public class JumpQuest {
	
	private List<Integer> maps = new ArrayList<Integer>();
	private List<MapleCharacter> chrs = new ArrayList<MapleCharacter>();
	private int returnMap;
	private int level = 0;
	private long timeStarted;
	
	
	public JumpQuest(List<MapleCharacter> chrs, List<Integer> maps, int returnMap) {
		this.maps = maps;
		this.chrs = chrs;
		this.returnMap = returnMap;
		this.timeStarted = System.currentTimeMillis();
		registerAll();
		advanceStage();
	}
	
	public void registerAll() {
		for (MapleCharacter chr : chrs) {
			chr.setJumpQuest(this);
		}
	}
	
	public int getReturnMap() {
		return returnMap;
	}
	
	public boolean checkFinished() {
		return level >= maps.size();
	}
	
	public void advanceStage() {	
		
		double timeFinished = (System.currentTimeMillis() - timeStarted)/1000;
	
		for (MapleCharacter chr : chrs) {
			
			if (level >= maps.size()) {
				endPQ();
				return;
			}
			
			if (chr.getJQ() != null) {
				if (level == 0) {
					chr.yellowMessage("The JQ has just begun!!");
					break;
				} else {
					setScores(chr, chr.getMapId(), timeFinished);
					chr.yellowMessage("You completed this JQ in " + timeFinished + " seconds.");
				}
			}
		}
		level++;
		timeStarted = System.currentTimeMillis();	
	}
	
	public void endPQ() {
		
		float timeFinished = (System.currentTimeMillis() - timeStarted)/1000;
		
		for (MapleCharacter chr : chrs) {
			if (chr.getJQ() != null) {
				setScores(chr, chr.getMapId(), timeFinished);
				chr.changeMap(returnMap);
				chr.setJumpQuest(null);
				chr.yellowMessage("You have finished the JQ in " + timeFinished +" seconds! Congratulations!");
			}
		}
	}
	
	public int getLevel() {
		return level;
	}
	
	public List<Integer> getMaps() {
		return maps;
	}
	
	public int getCurrentMap() {
		return maps.get((int) (level - 1));
	}
	
	public int getMap(int map) {
		return (int) maps.get(map);
	}
	
	public int getNextMap() {
		return maps.get(level);
	}
	
	public void setScores(MapleCharacter chr, int mapid, double time) {
		Connection con1 = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps;
            ps = con1.prepareStatement("SELECT time from jumpquests WHERE name = ? AND mapid = ?");
            ps.setString(1, chr.getName());
            ps.setInt(2, mapid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                if (time < rs.getFloat("time")) {
                	executeScores(chr, mapid, time);
                }
            } else {
            	executeScores(chr, mapid, time);
            }
            rs.close();
            ps.close();
        } catch (Exception Ex) {
        }
	}
	
	public void executeScores(MapleCharacter chr, int mapid, double time) {
		System.out.println("Setting scores for " + chr.getName() + " for map " + mapid + " at time " + time);
		Connection con1 = DatabaseConnection.getConnection();
		try {
			PreparedStatement ps = con1.prepareStatement("REPLACE INTO jumpquests (name, mapid, time) values (?,?,?)");
	    	ps.setString(1, chr.getName());
	    	ps.setInt(2, mapid);
	    	ps.setDouble(3, time);
	    	ps.executeUpdate();
	    	ps.close();
		} catch (Exception e) {
		}
	}	
}
