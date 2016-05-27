package custom.dynasty;


import java.awt.Point;
import java.util.HashSet;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import client.MapleCharacter;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import tools.MaplePacketCreator;

public class TestDamage {

	private long timeStarted, timeEnded;
	private MapleMonster mob;
	private int timeTaken;
	private MapleCharacter chr;
	private ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
	
	public TestDamage(int mobid, int hp, int x, int y, MapleCharacter chr) {
		this.mob = MapleLifeFactory.getMonster(mobid);
		this.chr = chr;
		
		mob.setDummy(this, chr, hp);
		chr.getMap().spawnMonsterOnGroundBelow(mob, x, y);
		timeStarted = System.currentTimeMillis();
		runTimer();
	}
	
	public void runTimer() {
		 executor.scheduleAtFixedRate(new Runnable() {
	            @Override
	            public void run() {
	            	if (!mob.isAlive()) {
	            		timeEnded = System.currentTimeMillis();
	            		endTest();
	            		executor.shutdown();
	            	}
	            }
	        }, 0 , 1, TimeUnit.SECONDS);
	}
	
	public void endTest() {
		if (!executor.isShutdown()) {
			executor.shutdown();
		}
		int dps = calculateDamage();
		chr.message("You deal approximately " + dps + " damage per second. Calculations were done off of a " + mob.getMaxHp() + ""
				+ " hp monster where you did " + mob.damageTaken() + " damage over " + timeTaken + " seconds.");
	}
	
	public int calculateDamage() {
		timeTaken =  Math.round((timeEnded - timeStarted)/1000 * 100)/100;
		return (int)(mob.damageTaken())/timeTaken;
	}
}
