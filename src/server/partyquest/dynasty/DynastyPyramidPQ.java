package server.partyquest.dynasty;

import java.awt.Point;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import client.MapleCharacter;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import server.life.MapleMonster;

public class DynastyPyramidPQ extends DynastyPQ implements MobListener, DynastyPQInterface, PointsInterface {

	private int points;
	private int mobsKilled;
	private int returnMap;
	private ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
	
	public DynastyPyramidPQ(MapleParty party, int returnMap) {
		super(party);
		this.returnMap = returnMap;
		start();
	}

	@Override
	public void scheduler() {
		executor.scheduleAtFixedRate(new Runnable() {
			public void run() {
				System.out.println("RUNNING.");
				if (playerStillInPQ())
					spawnMobs();
				else
					endPQ();
			}
		}, 0, 5, TimeUnit.SECONDS);
	}

	@Override
	public void mobKilled() {
		mobsKilled++;
	}

	@Override
	public void addPoints() {
		// TODO Auto-generated method stub
	}

	@Override
	public void registerAll() {
		for (MaplePartyCharacter chr : getParty().getMembers()) {
			System.out.println("Setting DynastyPQ for " + chr.getPlayer().getName());
			chr.getPlayer().setDynastyPQ(this);
		}
	}

	@Override
	public void unregisterPlayer(MapleCharacter chr) {
		chr.setDynastyPQ(null);
	}

	@Override
	public int getPoints() {
		return points;
	}

	@Override
	public int totalPoints() {
		return 0;
	}

	@Override
	public void start() {
		registerAll();
		scheduler();
	}

	@Override
	public int numMobsKilled() {
		return mobsKilled;
	}

	@Override
	public void spawnMobs() {
		Point position = getLeader().getPlayer().getPosition();
		for (int x = 0; x < 20 * (getLevel() + 1); x++) {
			if (getCurrentMap().countMobs() <= 20 * (getLevel() + 1))
				getCurrentMap().spawnMonsterOnGroudBelow(100100, position);
			else
				break;
		}
	}

	@Override
	public boolean playerStillInPQ() {
		for (MaplePartyCharacter chr : getParty().getMembers()) {
			if (chr.getPlayer().getDynastyPQ() != null) {
				return true;
			}
		}
		return false;
	}
	
	public void endPQ() {
		executor.shutdown();
		getCurrentMap().resetAll();
		for (MaplePartyCharacter chr : getParty().getMembers()) {
			if (chr.getPlayer().getDynastyPQ() != null) {
				unregisterPlayer(chr.getPlayer());
				chr.getPlayer().changeMap(returnMap, 0);
				chr.getPlayer().message("Congratulations on finishing the PQ!");
			}
		}
	}

	@Override
	public void mobKilled(MapleMonster mob) {
		// TODO Auto-generated method stub
		
	}

}
