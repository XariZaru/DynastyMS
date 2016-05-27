package server.partyquest;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import server.maps.MapleMap;
import client.MapleCharacter;

public class PQBase {

	private List<MapleCharacter> party;
	private MapleMap map;
	private ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
	private long endTime;
	private int startingMap = 109040000;
	
	public PQBase(List<MapleCharacter> party, MapleMap map, int seconds) {
		this.party = party;
		this.map = map;
		this.endTime = System.currentTimeMillis() + seconds * 1000;
	}
	
	public long endTime() {
		return endTime;
	}
	
	public ScheduledExecutorService getExecutor() {
		return executor;
	}
	
	public List<MapleCharacter> getParty() {
		return party;
	}
	
	public MapleMap getMap() {
		return map;
	}
	
	public void setMap(MapleMap map) {
		this.map = map;
	}
	
	public void canContinue() {
		for (MapleCharacter chr : party) {
			if (chr.getPQ() != null) {
				return;
			}
		}
		endPQ();
	}
	
	public void endPQ() {
		System.out.println("Ending PQ.");
		executor.shutdown();
		map.killAllMonsters();
		map.clearDrops();
		warpAll(startingMap);
		for (MapleCharacter chr : party) {
			chr.setPQ(null);
		}
	}
	
	public void warpAll(int mapid) {
		for (MapleCharacter chr : getParty()) {
			if (chr.getPQ() != null) {
				chr.changeMap(mapid);
			}
		}
	}
	
	public void givePartyExp(int exp) {
		for (MapleCharacter chr : party) {
			if (chr.getPQ() != null) {
				chr.gainExp(exp, true, true);
			}
		}
	}
}
