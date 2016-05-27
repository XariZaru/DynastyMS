package server.partyquest;

import java.awt.Point;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import scripting.npc.NPCScriptManager;
import server.TimerManager;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import client.MapleCharacter;
import client.MapleClient;

public class KillMobs extends PQBase {
	
	private ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
	private List<Integer> positions;
	private List<Integer> mobs;
	private List<Integer> exp;
	private List<Integer> mapids;
	private TimerManager schedule = null;
	private int level = 0;
	private int currentLevel = 1;
	private int npc;
	private boolean completedStage = false;
	
	/*
	 * Format of the NPC Script for this PQ...
	 * 
	 * Initiate the PQ from NPCConversationManager
	 * Add mobs after instantiating in form of multi-dimensional arrays.
	 * The mobs will be spawned with the original coordinates passed through class constructor.
	 * After they're all dead NPC will popup.
	 */
	
	
	public KillMobs(List<MapleCharacter> party, MapleMap map, List<Integer> positions, 
					List<Integer> exp, List<Integer> mobs, int time, int npc, List<Integer> mapids) {
		
		super(party, map, time);
		this.exp = exp;
		this.npc = npc;
		this.mobs = mobs;
		this.mapids = mapids;
		this.positions = positions;
		
		setTimer(time);
		setStatuses();
		
		startPQ();
		
	}
	
	public void nextStage(MapleMap map, List<Integer> positions, List<Integer> exp, List<Integer> mobs) {
		this.exp = exp;
		setMap(map);
		this.mobs = mobs;
		this.positions = positions;
		this.level = 0;
		completedStage = false;
		currentLevel++;
		setTimer((int) (endTime()/1000 - System.currentTimeMillis()/1000));
		startPQ();
	}
	
	public int getStage() {
		return currentLevel;
	}
	
	public boolean isCompleted() {
		return completedStage;
	}
	
	public List<Integer> getMobs() {
		return mobs;
	}
	
	public String getReadable() {
		String text = "";
		text += "Mobs: " + mobs;
		text += "\r\nExp: " + exp;
		text += "\r\nPositions: " + positions;
		return text;
	}
	
	// If they're not in any of the PQ maps, get rid of 'em
	public void removeInactive() {
		for (MapleCharacter chr : getParty()) {
			if (!mapids.contains(chr.getMapId())) {
				System.out.println("Setting " + chr.getName() + " current PQ status to null.");
				chr.setPQ(null);
			}
		}
	}
	
	public void startPQ() {
		
        getExecutor().scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
            	
            	// Start of the PQ and every time they clear the map
            	if (getMap().countMobs() == 0) {
            		
            		try {
            			
            			System.out.println("Continuing!");
            			
            			// Removal of party members from PQ
            			removeInactive();
            			canContinue();
            			
            			// If they cleared all the levels
	            		if (level >= mobs.size() && !completedStage) {
	            			finishStage();
	            			System.out.println("Level is " + level + " and completed stage is " + completedStage);
	            		}
		            	
		            	// If there are still levels left 
		            	if (level < mobs.size() && !completedStage) {
		            		System.out.println("Spawning Mobs.");
		            		if (level > 0) {
		            			givePartyExp(exp.get(level - 1));
		            		}
			            	spawnMobs();
			            	levelUp();
		            	}
		            	
            		} catch (Exception e) {
            			System.out.println(e);
            		}
            		
            	}
            }
        }, /* same, can be 0*/ 0 , 5, TimeUnit.SECONDS);
	}
	
	public void finishStage() {
		completedStage = true;
		MapleClient c = null;
		for (MapleCharacter chr : getParty()) {
			if (chr.isLeader()) {
				c = chr.getClient();
				break;
			}
		}
		c.removeClickedNPC();
		NPCScriptManager.getInstance().dispose(c);
		NPCScriptManager.getInstance().start(c, npc, null, null);
	}
	
	public List<Integer> getPositions() {
		return positions;
	}
	
	public void setStatuses() {
		for (MapleCharacter chr : getParty()) {
			chr.setPQ(this);
		}
	}
	
	public void setTimer(int seconds) {
		
		getMap().broadcastMessage(MaplePacketCreator.getClock(seconds));
		
		this.schedule = TimerManager.getInstance();
		
		this.schedule.schedule(
			new Runnable() {
				@Override
	            public void run() {
					endPQ();
            	}
	        }, seconds * 1000);
	}
	
	public void levelUp() {
		if (level > 0) {
			getMap().broadcastMessage(MaplePacketCreator.environmentChange("Party1/Clear", 4));
			getMap().broadcastMessage(MaplePacketCreator.environmentChange("quest/party/clear", 3));
		}
		level++;
	}
	
	public void spawnMobs() {
		for (int x = 0; x < positions.size() - 2; x += 2) {
			for (int y = 0; y < getParty().size() * 3; y++) {
				getMap().spawnMonsterOnGroundBelow(mobs.get(level), positions.get(x), positions.get(x + 1));
			}
		}
	}
	 
}
