package server.life;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import tools.DatabaseConnection;

public class MapleNPCFactory {
	public static Set<Integer> npcs = new HashSet<Integer>();
	
	public static void reloadNPC() {
		synchronized (npcs) {
			try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT npcid FROM npcs_scriptable")) { 
				ResultSet rs = ps.executeQuery();
				while (rs.next())
					npcs.add(rs.getInt("npcid"));
				rs.close();
				ps.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	public static void clearNPC() {
		npcs.clear();
	}
}
