package custom.dynasty;

import java.sql.PreparedStatement;

import server.life.MapleMonster;
import tools.DatabaseConnection;
import net.server.Server;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import client.MapleCharacter;
import client.listeners.MobDeadEvent;
import client.listeners.MobDeadListener;

public class BossPQ implements MobDeadListener {
	
	int partyid;
	int world;
	
	public BossPQ(MapleParty party) {
		partyid = party.getId();
		world = party.getLeader().getWorld();
	}

	@Override
	public void mobKilled(MobDeadEvent event) {
		try {
    		for (MaplePartyCharacter chr : Server.getInstance().getWorld(world).getParty(partyid).getMembers()) 
    			giveBossPoints(chr.getPlayer(), event.getMonster());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void giveBossPoints(MapleCharacter player, MapleMonster mob) {
		double rand = (Math.random() * .3) + .9;
		int points = (int) (.0000625 * rand *  mob.getMaxHp());
		
		player.gainBossPoints(points);
		player.titleMessage(points + " boss points");
		player.dropMessage(5, "You gained " + points + " boss points");
		
		try {
			PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO boss_kills (characterid, mobid, amount) VALUES ('"+player.getId()+"', '"+mob.getId()+"', 1) ON DUPLICATE KEY UPDATE amount = amount + 1");
			ps.executeUpdate();
			
			ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO boss_kills (characterid, mobid, amount) VALUES ('"+player.getId()+"', 0, 1) ON DUPLICATE KEY UPDATE amount = amount + 1");
			ps.executeUpdate();
			ps.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
