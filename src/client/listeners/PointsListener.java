package client.listeners;

import server.life.MapleMonster;
import client.MapleCharacter;

public interface PointsListener {
	void addPoints(MapleCharacter player, MapleMonster mob);
	void addPoints(MapleCharacter player, int points);
}
