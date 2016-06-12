package server.partyquest.dynastyPQ;

import java.awt.Point;
import java.sql.SQLException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import client.MapleCharacter;
import client.inventory.Item;
import net.server.world.MapleParty;
import scripting.event.EventInstanceManager;
import server.TimerManager;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.partyquest.dynasty.MobListener;
import tools.MaplePacketCreator;

public class BalrogAlone implements IPartyQuest, MobListener {

	private MapleCharacter player;
	
	private int stage = 0;
	private int lastStage = 3; // When 3 is finished, end PQ (stage > 3)
	
	// PQ maps
	private int[] maps = {910500100, 910500200, 105100300};
	
	// Mob IDs and mob related stuff
	private int   jr_balrog		 = 9300203;
	private int[] stage2_mobs    = {8150000,9300085,7130100,7130101};
	private int[] balrog_parts 	 = {8830000,8830001,8830002};
	private int   mob_counter	 = 0; // increments each time mob is killed
	private int	  stage1_needed  = 100;
	
	private int	  stage1_initial_amount = 50;
	private int	  stage2_initial_amount = 100;
	private int   stage2_drop_id 			= 4031906;
	
	private int time = 1800000; // in milliseconds -> 30 minutes
	private long start_time;

	// Timer Manager stuff
	private ScheduledFuture<?> schedule;
	private ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
	
	// Maps
	int lobby = 105100100;

	public BalrogAlone(MapleCharacter player) {
		this.player = player;
		player.registerPQ(this);
	}
	
	public MapleCharacter getPlayer() {
		return player;
	}
	
	public BalrogAlone getInstance() {
		return this;
	}

	@Override
	public void start() {
		
		start_time = System.currentTimeMillis();
		player.getMap().broadcastMessage(MaplePacketCreator.getClock(time / 1000));
		
		for (int x = 0; x < stage1_initial_amount; x++)
			spawnMonster(MapleLifeFactory.getMonster(jr_balrog));
		
		// Ends PQ in 30 minutes -> set by var time
		TimerManager.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                end();
            }

        }, time);
	}

	@Override
	public void mobKilled(MapleMonster mob) {
		
		// Stage 1 -> when monster dies respawn it in middle of map
		if (stage == 0) {
			mob_counter++;
			if (mob_counter >= this.stage1_needed) {
				stage++;
				setStage();
				return;
			}
			spawnMonster(mob);
			getPlayer().getMap().broadcastTitleMessage(String.format("%d/%d", mob_counter, stage1_needed));
		} else if (stage == 1) {
			int rand = (int) (Math.random() * 100);
			System.out.println(rand);
			if (rand == 50)
				player.getMap().spawnItemDrop(getPlayer(), getPlayer(), new Item(stage2_drop_id, (short) 0, (short) 1), mob.getPosition(), true, true);
		}
	}
	
	public void spawnMonster(MapleMonster mob) {
		MapleMonster respawn = MapleLifeFactory.getMonster(mob.getId());
		respawn.disableDrops();
		respawn.addListener(this);
		if (stage == 0)
			getPlayer().getMap().spawnMonsterOnGroudBelow(respawn, new Point(-317, 130));
		else if (stage == 1) {
			getPlayer().getMap().spawnMonsterOnGroudBelow(respawn, new Point(-449, 130));
		}
	}
	
	public void rewards() {
		try {
			player.completeDynastyQuest("Killed Balrog");
			player.gainExp(45000000, true, true);
			player.dropMessage("Congratulations on killing Balrog! A true menace has been laid to waste forever!");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	// Destroys the PQ and schedulers
	@Override
	public void end() {
		executor.shutdownNow();
		if (player != null)
			player.changeMap(lobby);
	}
	
	public void setStage() {
		player.getMap().resetAll();
		player.getMap().broadcastMessage(MaplePacketCreator.getClock((int) (time - (System.currentTimeMillis() - this.start_time) / 1000)));
		player.changeMap(maps[stage]);
		if (stage == 1) {
			for (int x = 0; x < stage2_initial_amount; x++)
				spawnMonster(MapleLifeFactory.getMonster(this.stage2_mobs[(int) (Math.random() * stage2_mobs.length)]));
			this.executor.scheduleAtFixedRate(new Runnable() {
				public void run() {
					System.out.println(String.format("Spawning %d",stage2_initial_amount - player.getMap().countMobs()));
					if (player == null || !inMap()) {
						end();
						return;
					} else if (player.haveItem(stage2_drop_id)) {
						stage++;
						setStage();
						executor.shutdownNow();
						return;
					}
					for (int x = 0; x < stage2_initial_amount - player.getMap().countMobs(); x++)
						spawnMonster(MapleLifeFactory.getMonster(stage2_mobs[(int) (Math.random() * stage2_mobs.length)]));
				}
			}, 0, 5, TimeUnit.SECONDS);
		} else if (stage == 2) {
			player.changeMap(maps[stage]);
		}
	}
	
	
	// UNUSED ABSTRACT METHODS
	

	@Override
	public void nextStage() {
	}
	
	public boolean inMap() {
		for (int map : maps)
			if (getPlayer().getMapId() == map)
				return true;
		return false;
	}

	@Override
	public int getStage() {
		return stage;
	}
	
	@Override
	public void mobKilled() {
		// TODO Auto-generated method stub
		
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
	public void scheduler() {
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
	public MapleParty getParty() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void registerParty() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addPoints() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mobDied() {
		// TODO Auto-generated method stub
		
	}

}