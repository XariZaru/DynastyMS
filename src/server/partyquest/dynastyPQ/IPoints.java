package server.partyquest.dynastyPQ;

import net.server.world.MapleParty;

public interface IPoints {
	int getPoints(MapleParty party);
	void addPoints(MapleParty party, int points);
}
