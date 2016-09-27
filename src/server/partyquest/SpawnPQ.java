package server.partyquest;

import java.awt.Point;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import client.MapleCharacter;

public class SpawnPQ {
	
	private List<MapleCharacter> chrs;
	private MapleMap map;
	private List<Integer> mobs = new ArrayList<Integer>();
	private Set<Point> respawnList = new HashSet<Point>();
	private List<Point> positions = new ArrayList<Point>();
	private ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
	private int time = 10;

	public SpawnPQ(List<MapleCharacter> chrs, MapleMap map) {
		this.chrs = chrs;
		this.map = map;
		instantiatePQ();
	}
	
	public void setSpawnTime(int time) {
		this.time = time;
	}
	
	public SpawnPQ getThis() {
		return this;
	}
	
	public void startPQ() {
        
		map.broadcastMessage(MaplePacketCreator.getClock((int) (time))); 

        executor.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
            	if (map.getCharacters().size() == 0) {
            		destroyPQ();
            		System.out.println("Destroying PQ.");
            		return;
            	}
            	map.broadcastMessage(MaplePacketCreator.getClock((int) (time))); 
            	for (Point point : respawnList) {
            		int index = positions.indexOf(point);
            		spawnMob(mobs.get(index), point);
            	}
            	System.out.println("Respawned " + respawnList.size() + " monsters.");
            	respawnList = new HashSet<Point>();
                // System.out.println("Done:" + new Date(System.currentTimeMillis()));
            }
        }, 0 , time, TimeUnit.SECONDS);
	}
	
	public void spawnMob(int mob, Point point) {
		MapleMonster monster = MapleLifeFactory.getMonster(mob);
		map.spawnMonsterOnGroundBelow(monster,  point);
		monster.setSpawnPQ(getThis());
		monster.setSpawnPoint(point);
		monster.disableDrops();
	}
	
	public void addMonsterKilled(MapleMonster monster) {
		int mobIndex = positions.indexOf(monster.getSpawnPoint());
		try {
			if (mobs.get(mobIndex) == monster.getId()) {
				System.out.println("Adding monster to current dead.");
				respawnList.add(monster.getSpawnPoint());
			}
		} catch (Exception xe) {
			System.out.println("Array was too short.");
		}
	}
	
	public void destroyPQ() {
		executor.shutdown();
		for (MapleCharacter chr : chrs) {
			chr.setSpawnPQ(null);
		}
	}
	
	public void checkStillIn() {
		for (MapleCharacter chr : chrs) {
			if (chr.getParty() == null) {
				chr.setSpawnPQ(null);
			}
		}
	}
	
	// NOT WORKING
	public String readableMobs() {
		String text = "";
		for (int x = 0; x < mobs.size(); x++) {
			text += "#L" + x + "#" + MapleLifeFactory.getMonster(mobs.get(x)).getName();
		}
		return text;
	}
	
	public List<Integer> getMonsters() {
		return mobs;
	}
	
	public void addMob(int mob, int posX, int posY) {
		if (!positions.contains(new Point(posX, posY))) {
			System.out.println("Adding mob to list.");
			positions.add(new Point(posX, posY));
			mobs.add(mob);
			respawnList.add(new Point(posX, posY));
		}
	}
	
	public void clearMobs() {
		positions = new ArrayList<Point>();
		mobs = new ArrayList<Integer>();
		respawnList = new HashSet<Point>();
		System.out.println("Clearing all mobs in the list.");
	}
	
	public void instantiatePQ() {
		for (MapleCharacter chr : chrs) {
			chr.setSpawnPQ(this);
		}
	}
}
