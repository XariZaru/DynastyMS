package server.partyquest.dynasty;

import java.awt.Point;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import client.MapleCharacter;
import client.MapleClient;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import scripting.npc.NPCScriptManager;
import server.TimerManager;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;

public class CustomCPQParty {

	public long startTime, endTime;
	
	private MapleParty party;
	private MapleParty party2;
	private CustomCPQ cpq;
	private CustomCPQParty cpqparty2;
	private int spawnsLeft = 15;
	private int feverTime = 30; // How long fever time lasts in seconds
	private int currentpoints = 0;
	private int totalpoints = 0;
	private int pointsNeededForFever = 100;
	private boolean fever = false;
	private ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
	
	/*
	9300127 - Brown Teddy
	9300128 - Bloctopus 
	9300129 - Ratz
	9300130 - Chronos 
	9300131 - Toy Trojan
	9300132 - Tick-Tock
	9300133 - Robo
	9300134 - King Bloctopus
	9300135 - Master Chronos 
	9300136 - Rombot
	*/
	
	private int[][] mobPoints = {
		{9300127,2},{9300128,2},{9300129,2},{9300130,3},{9300131,3},
		{9300132,3},{9300133,3},{9300134,4},{9300135,4},{9300136,5}};
	
	private int[] mobCosts = {7,7,8,8,9,9,10,11,12,30};
//	HashMap<Integer, Integer> mobPoints = new HashMap<Integer, Integer>() {{
//	    put(9300127, 2); put(9300128, 2); put(9300129, 2); put(9300130, 3);
//	    put(9300131, 3); put(9300132, 3); put(9300133, 3); put(9300134, 4);
//	    put(9300135, 4); put(9300136, 5);
//	}};
	
	public CustomCPQParty(MapleParty party) {
		this.party = party;
		registerMembers();
	}
	
	public void registerMembers() {
		for (MaplePartyCharacter chr : getParty().getMembers()) {
			chr.getPlayer().setCPQParty(this);
		}
	}
	
	public boolean inFever() {
		return fever;
	}
	
	public void loseCurrentCP(int lose) {
		currentpoints -= lose;
	}
	public void addSpawn(int mobid) {
		getCPQ().addSpawn(mobid, this);
		for (int x = 0; x < mobPoints.length; x++) {
			if (mobPoints[x][0] == mobid) {
				currentpoints -= mobCosts[x];
				break;
			}
		}
		spawnsLeft--;
	}
	
	public void addPoints(int mobid) {
		for (int x = 0; x < mobPoints.length; x++) {
			if (mobPoints[x][0] == mobid) {
				this.currentpoints += mobPoints[x][1];
				this.totalpoints += mobPoints[x][1];
				if (totalpoints >= pointsNeededForFever) {
					pointsNeededForFever += 100;
					setFever();
				}
				for (MaplePartyCharacter chr : getParty().getMembers()) {
					if (chr.getPlayer().getCPQParty()!=null) {
						chr.getPlayer().fadeMessage(String.format("Total CP: %2d    Current CP: %2d", totalpoints, currentpoints));
					}
				}
				break;
			}
		}
	}
	
	public void yellowMessage(String msg) {
		for (MaplePartyCharacter chr : getParty().getMembers()) {
			if (chr.getPlayer().getCPQParty()!=null) {
				chr.getPlayer().yellowMessage(msg);
			}
		}
	}
	
	public boolean canGetRewards() {
		return (endTime - startTime) >= 480000;
	}
	
	public void setFever() {
		if (!fever) {
			feverTime = 30;
			getCPQ().getPartyMap(this).startMapEffect("Fever time has begun. Mobs are now 2x exp!!", 5120009, 8000);
		} else {
			yellowMessage("Fever time has ended! When you get another 100 CP points"
					+ " another fever will activate!");
		}
		fever = !fever;
	}
	
	public void fever() {
		
		executor.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
            	if (feverTime > 0 && fever) {
            		feverTime--;
            		if (feverTime % 10 == 0) {
            			yellowMessage(String.format("There are %2d seconds left in fever time!", feverTime));
            		}
            	} else if (fever) {
            		setFever();
            	}
            }
        }, 0 , 1, TimeUnit.SECONDS);
	}
	
	public int getTotalCP() {
		return totalpoints;
	}
	
	public int getCurrentCP() {
		return currentpoints;
	}
	
	public void startCPQ(int mapid, int mapid2) {
		setCPQ(new CustomCPQ(this, cpqparty2, getParty().getLeader().getPlayer().getMap(), mapid, mapid2));
		cpqparty2.setCPQ(getCPQ());
	}
	
	public void setCPQ(CustomCPQ cpq) {
		this.cpq = cpq;
	}
	
	public CustomCPQ getCPQ() {
		return cpq;
	}
	
	public void createCPQParty(MapleParty party) {
		cpqparty2 = new CustomCPQParty(party);
	}
	
	public void warpOut(int mapid) {
		for (MaplePartyCharacter chr : getParty().getMembers()) {
			if (chr.getPlayer().getCPQParty() != null) {
				chr.getPlayer().changeMap(mapid, 0);
			}
		}
		executor.shutdown();
		setCPQ(null);
	}
	
	public void sendRequest(MapleParty party) {
		party2 = party;
	}
	
	public MapleParty getParty2() {
		return party2;
	}
	
	public MapleParty getParty() {
		return party;
	}
	
	public int getSpawns() {
		return spawnsLeft;
	}
	
}
