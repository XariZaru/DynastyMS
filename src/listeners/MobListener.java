package listeners;

import server.life.MapleMonster;

public interface MobListener {

	void mobKilled();
	void mobKilled(MapleMonster mob);
	void addPoints();
	int numMobsKilled();
	
}
