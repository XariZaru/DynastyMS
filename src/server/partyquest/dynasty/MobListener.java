package server.partyquest.dynasty;

public interface MobListener {

	void scheduler();
	void mobKilled();
	void addPoints();
	void spawnMobs();
	int numMobsKilled();
	
}
