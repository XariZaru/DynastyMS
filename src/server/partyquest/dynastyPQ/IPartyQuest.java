package server.partyquest.dynastyPQ;

import net.server.world.MapleParty;
import server.life.MapleMonster;
import client.MapleCharacter;

public interface IPartyQuest {
	
	public MapleParty getParty();
	public void registerParty(MapleParty party);
	
	public long getTimeLeft();
	public void addPoints();
	public int getPoints();
	
	public void start();
	public void end();
	
	public void nextStage();
	public int getStage();
	
	public void unregisterPlayer(MapleCharacter player);
	public void registerPlayer(MapleCharacter player);
	
	public void playerKilled(MapleCharacter player);
	
	void scheduler();
	void mobKilled();
	void mobKilled(MapleMonster mob);
	void spawnMobs();
	int numMobsKilled();
}
