package server.partyquest.dynasty;

import java.awt.Point;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import server.maps.MapleMap;

public class MobSpawner {

	private List<Integer> mobs = new ArrayList<Integer>();
	private List<Point> points = new ArrayList<Point>();
	private int interval;
	private MapleMap map;
	private ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
	
	public MobSpawner(int interval, List<Integer> mobs, List<Point> points, MapleMap map) {
		this.mobs = mobs;
		this.points = points;
		this.interval = interval;
		this.map = map;
	}
	
	public void scheduler() {
		executor.scheduleAtFixedRate(new Runnable() {
			public void run() {
				if (map.getPlayerCount() > 0)
					spawnMobs();
				else
					endMobSpawn();
			}
		}, 0, interval, TimeUnit.SECONDS);
	}
	
	public MapleMap getMap() {
		return map;
	}
	
	public void spawnMobs() {
		for (int x = 0; x < mobs.size(); x++) {
			map.spawnMonsterOnGroudBelow(mobs.get(x), points.get(x));
		}
	}
	
	public void endMobSpawn() {
		executor.shutdown();
		map.resetAll();
	}
	
	public ScheduledExecutorService getExecutor() {
		return executor;
	}
	
	public void addMob(int mob, int x, int y) {
		mobs.add(mob);
		points.add(new Point(x, y));
	}
	
	public void deleteMob(int mob) {
		for (int x = 0; x < mobs.size(); x++) {
			if (mobs.get(x) == mob) {
				mobs.remove(x);
				points.remove(x);
				break;
			}
		}
	}
	
	public void clearAll() {
		mobs = new ArrayList<Integer>();
		points = new ArrayList<Point>();
	}
	
	public List<Integer> getMobs() {
		return mobs;
	}
	
	public List<Point> getPoints() {
		return points;
	}
	
}
