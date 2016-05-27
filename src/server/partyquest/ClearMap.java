package server.partyquest;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import client.MapleCharacter;
import client.MapleClient;
import net.server.Server;
import scripting.npc.NPCScriptManager;
import server.life.MapleLifeFactory;
import server.maps.MapleMap;
import tools.MaplePacketCreator;

public class ClearMap {
	
	private int npc;
	private MapleMap map;
	private MapleClient c;
	private MapleCharacter character;
	private ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
	
	public ClearMap(int npc, MapleMap map, MapleCharacter character, MapleClient c, String message) {
		this.npc = npc;
		this.map = map;
		this.character = character;
		this.c = c;
		map.killAllMonsters();
		character.setClearNpc(this);
		Server.getInstance().broadcastGMMessage(MaplePacketCreator.earnTitleMessage(message));
		startRunnable();
	}
	
	public void startRunnable() {
	        
	        executor.scheduleAtFixedRate(new Runnable() {
	            @Override
	            public void run() {
	            	
	            	if (map.countMobs() == 0) {
	            		c.removeClickedNPC();
	            		NPCScriptManager.getInstance().dispose(c);
	            		NPCScriptManager.getInstance().start(c, npc, null, null);
	            	}
	            	
	                // System.out.println("Done:" + new Date(System.currentTimeMillis()));
	            }
	        }, /* same, can be 0*/ 5 , 5, TimeUnit.SECONDS);
	}

	public void endRunnable() {
		executor.shutdown();
		character.setClearNpc(null);
	}
	
}
