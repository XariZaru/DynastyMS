package server.partyquest.dynastyPQ;

import client.MapleCharacter;
import server.life.MapleMonster;

public interface PointsListener {
	void addPoints(MapleCharacter player, MapleMonster mob);
	void addPoints(MapleCharacter player, int points);
}
