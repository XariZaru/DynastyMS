package server.partyquest;
import static java.lang.System.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import client.MapleCharacter;
import scripting.AbstractPlayerInteraction;
import server.TimerManager;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import server.life.MapleLifeFactory;

public class DynastyMS {
	
	private int level, maxLevels;
	private String goal;
	private List<MapleCharacter> chrs;
	private List<Integer> mobs;
	private long time = 0;
    private long timeStarted = 0;
    private ScheduledFuture<?> schedule = null;
    private ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
    private MapleMap map;
	
	public DynastyMS(List<Integer> mobs, int maxLevels, List<MapleCharacter> chrs, MapleMap map)  {
		
		this.mobs = mobs;
		this.maxLevels = maxLevels;
		this.level = 0;
		this.chrs = chrs;
		this.goal = "Test run.";
		this.map = map;
		
		this.timeStarted = System.currentTimeMillis();
        this.time = 10000; 
        
        
        startRunnable();
        
        /*
		this.schedule = TimerManager.getInstance().schedule(new Runnable() {
            @Override
            public void run() {

            	//chrs.get(0).getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(100100), chrs.get(0).getPosition());
            }

        }, time);*/
		
	}
	
	public void startRunnable() {
		
		map.broadcastMessage(MaplePacketCreator.getClock((int) (time / 1000))); 
        
        executor.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
            	map.broadcastMessage(MaplePacketCreator.getClock((int) (time / 1000))); 
            	int mobsLeft = 5 - map.countMobs();
            	for (int x = 0; x < mobsLeft; x++) {
            		map.spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(mobs.get(level)), chrs.get(0).getPosition());
            	}
                // System.out.println("Done:" + new Date(System.currentTimeMillis()));
            }
        }, /* same, can be 0*/ time / 1000 , time / 1000, TimeUnit.SECONDS);
	}
	
	public int getLevel() {
		return this.level;
	}
	
	public void levelUp() {
		level++;
		killAll();
	}
	
	public void killAll() {
		map.killAllMonsters();
	}
	
	public int getMaxLevel() {
		return maxLevels;
	}
	
	public List<MapleCharacter> getParty() {
		return chrs;
	}
}
