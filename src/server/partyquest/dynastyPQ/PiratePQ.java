package server.partyquest.dynastyPQ;

import java.util.concurrent.ScheduledFuture;

import server.TimerManager;
import server.life.MapleMonster;
import server.maps.MapleMapFactory;
import server.partyquest.dynasty.MobListener;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import client.MapleCharacter;

public class PiratePQ implements IPartyQuest, MobListener {
	
	ScheduledFuture<?> schedule;
	MapleMapFactory map_factory;
	MapleParty party;
	int stage = 0;
	int starting_map = 925100000;
	int exit_map = 925100700;
	
	long time_finished;
	long time_started;
	long time_limit = 30 * 60 * 1000;
	
	public PiratePQ(MapleParty party) {
		map_factory = party.getLeader().getPlayer().getClient().getChannelServer().getMapFactory();
		time_started = System.currentTimeMillis();
		this.party = party;
		timer();
	}
	
	public void timer() {
		schedule = TimerManager.getInstance().schedule(new Runnable() {
			public void run() {
				party.warpParty(exit_map);
				party.setPQ(null);
			}
		}, time_limit);
	}
	
	@Override
	public MapleParty getParty() {
		return this.party;
	}

	@Override
	public void registerParty(MapleParty party) {
		this.party = party;
	}

	@Override
	public void addPoints() {
		// TODO Auto-generated method stub

	}

	@Override
	public int getPoints() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void start() {
		// TODO Auto-generated method stub

	}

	@Override
	public void end() {
		schedule.cancel(true);
		this.party.warpParty(exit_map);
	}

	@Override
	public void nextStage() {
		// Stages
		if (stage != 5) {
			map_factory.getMap(starting_map + stage * 100).getPortal("next00").setPortalState(true);
			for (MaplePartyCharacter member : party.getMembers())
				member.getPlayer().startMapEffect("The way has been cleared! Move on!", 5120020);
		// Finished the PQ
		} else {
			this.time_finished = System.currentTimeMillis();
		}
		stage++;
	}

	@Override
	public int getStage() {
		return this.stage;
	}

	@Override
	public void unregisterPlayer(MapleCharacter player) {
		// TODO Auto-generated method stub

	}

	@Override
	public void registerPlayer(MapleCharacter player) {
		// TODO Auto-generated method stub

	}

	@Override
	public void playerKilled(MapleCharacter player) {
		// TODO Auto-generated method stub

	}

	@Override
	public void scheduler() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mobKilled() {
		if (stage == 0 || stage == 2 || stage == 3 || stage == 5)
			if (map_factory.getMap(starting_map + 100 * stage).countMobs() == 0)
				nextStage();
	}

	@Override
	public void mobKilled(MapleMonster mob) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void spawnMobs() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public int numMobsKilled() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long getTimeLeft() {
		return time_limit - (System.currentTimeMillis() - time_started);
	}

}
