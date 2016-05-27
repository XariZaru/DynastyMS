package server.partyquest.dynasty;

import client.MapleCharacter;

public interface DynastyPQInterface {

	void registerAll();
	void start();
	void endPQ();
	void unregisterPlayer(MapleCharacter chr);
	boolean playerStillInPQ();
	
}
