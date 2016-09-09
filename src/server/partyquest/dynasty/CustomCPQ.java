package server.partyquest.dynasty;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import server.TimerManager;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.MapleMap;
import tools.MaplePacketCreator;

public class CustomCPQ {

	private CustomCPQParty party1 = null;
	private CustomCPQParty party2 = null;
	
	private ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
	private List<Integer> toSpawn = new ArrayList<Integer>();
	private int map1, map2;
	private MapleMap waitingMap;
	private ScheduledFuture<?> schedule = null;
	private int time = 600000;
	
	// Perma spawns for teams
	private List<Integer> teamOneMobs = new ArrayList<Integer>();
	private List<Integer> teamTwoMobs = new ArrayList<Integer>();
	
	private int[][] positions = {{},{},{},{},{},{},{},{},{},{}}; 
	
	private int pointsForFever = 100; // Points needed for fever
	private int feverLength = 20; // Seconds fever lasts
	
	public CustomCPQ(CustomCPQParty party1, CustomCPQParty party2, MapleMap waitingMap, int map1, int map2) {
		this.map1 = map1;
		this.map2 = map2;
		this.waitingMap = waitingMap;
		this.party1 = party1;
		this.party2 = party2;
		
		start();
	}

	public CustomCPQ getCPQ() {
		return this;
	}
	
	// Begins PQ. Loads for 10 seconds and broadcasts a clock. Warps everyone to their map upon start.
	public void start() {
		waitingMap.broadcastMessage(MaplePacketCreator.getClock(10));
		
		this.schedule = TimerManager.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
            	warpAll(party1, map1);
        		warpAll(party2, map2);
        		party1.fever();
        		party2.fever();
        		party1.startTime = System.currentTimeMillis();
        		party2.startTime = System.currentTimeMillis();
        		setTimer();
            	timedEventsManager();
            }
        }, 10000);
		
	}
	
	public void addSpawn(int mobid, CustomCPQParty party) {
		(party == teamOneMobs ? teamOneMobs : teamTwoMobs).add(mobid);
	}
	
	public void warpAll(CustomCPQParty party, int mapid) {
		party.getParty().warpParty(mapid);
	}
	
	public void timedEventsManager() {
		executor.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
            	if (getMap(map1).getAllPlayer().size() == 0 || getMap(map2).getAllPlayer().size() ==0) {
            		endPQ();
            		return;
            	}
            	if (teamOneMobs.size() > 0) {
            		System.out.println(String.format("Spawning %2d monsters against team one's opponents.", teamOneMobs.size()));
            		for (int x = 0; x < teamOneMobs.size(); x++) {
            			MapleMonster mob = MapleLifeFactory.getMonster(teamOneMobs.get(x));
            			mob.setCPQ(getCPQ());
            			teamOneMobs.remove(teamOneMobs.get(x));
            		}
            	}
            	
            	if (teamTwoMobs.size() > 0) {
            		System.out.println(String.format("Spawning %2d monsters against team two's opponents.", teamTwoMobs.size()));
            		for (int x = 0; x < teamOneMobs.size(); x++) {
            			MapleMonster mob = MapleLifeFactory.getMonster(teamTwoMobs.get(x));
            			mob.setCPQ(getCPQ());
            			teamTwoMobs.remove(teamTwoMobs.get(x));
            		}
            	}
            }
        }, 10 , 10, TimeUnit.SECONDS);
	}
	
	public MapleMap getMap(int mapid) {
		return party1.getParty().getLeader().getPlayer().getClient().getChannelServer().getMapFactory().getMap(mapid);
	}
	
	public MapleMap getPartyMap(CustomCPQParty party) {
		return (party == party1 ? getMap(map1) : getMap(map2));
	}
	
	public void endPQ() {
		party1.endTime = System.currentTimeMillis();
		party2.endTime = System.currentTimeMillis();
		party1.warpOut(map1 + 2);
    	party2.warpOut(map1 + 2);
    	executor.shutdown();
	}
	
	public void setTimer() {
		getMap(map1).broadcastMessage(MaplePacketCreator.getClock(time / 1000));
		getMap(map2).broadcastMessage(MaplePacketCreator.getClock(time / 1000));
		this.schedule = TimerManager.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
            	endPQ();
            }
        }, time);
	}
}
