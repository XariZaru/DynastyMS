package server.partyquest.dynasty;

import server.life.MapleMonster;

public interface MobListener {

	void scheduler();
	void mobKilled();
	void mobKilled(MapleMonster mob);
	void addPoints();
	void spawnMobs();
	int numMobsKilled();
	
}
