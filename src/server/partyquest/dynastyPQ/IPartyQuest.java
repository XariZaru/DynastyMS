package server.partyquest.dynastyPQ;

import client.MapleCharacter;
import net.server.world.MapleParty;

public interface IPartyQuest {
	
	public MapleParty getParty();
	public void registerParty();
	
	public void mobDied();
	public void addPoints();
	
	public void start();
	public void end();
	
	public void nextStage();
	public int getStage();
	
	public void unregisterPlayer(MapleCharacter player);
	public void registerPlayer(MapleCharacter player);
}
