package custom.dynasty;


import java.awt.Point;
import java.util.HashSet;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import net.server.Server;
import listeners.DamageListener;
import listeners.MobListener;
import client.MapleCharacter;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import tools.MaplePacketCreator;

public class TestDamage implements DamageListener, MobListener {

	private long timeStarted = 0;
	private MapleMonster mob;
	private int damage_taken;
	private int characterid = -1;
	private int world = 0;
	
	public TestDamage(int mobid, int hp, int x, int y, MapleCharacter chr) {
		this.mob = MapleLifeFactory.getMonster(mobid);
		this.characterid = chr.getId();
		this.world = chr.getClient().getWorld();
		
		mob.setDummy(this, chr, hp);
		mob.addListener(this);
		mob.addDamageListener(this);
		chr.getMap().spawnMonsterOnGroundBelow(mob, x, y);
		
	}

	@Override
	public void mobKilled() {
		MapleCharacter chr = Server.getInstance().getWorld(world).getPlayerStorage().getCharacterById(characterid);
		long time_elapsed = (System.currentTimeMillis() - timeStarted)/1000 + 1;
		long dps = (damage_taken / time_elapsed * 100) / 100;
		if (chr != null && damage_taken > 0)
			chr.message("You deal approximately " + dps + " damage per second. Calculations were done off of a " + mob.getMaxHp() + ""
				+ " hp monster where you did " + mob.damageTaken() + " damage over " + time_elapsed + " seconds.");
	}

	@Override
	public void mobKilled(MapleMonster mob) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addPoints() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public int numMobsKilled() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void addDamage(MapleCharacter from, MapleMonster mob, int damage) {
		if (damage_taken == 0)
			timeStarted = System.currentTimeMillis();
		damage_taken += damage;
	}

	@Override
	public int getDamageDone() {
		return damage_taken;
	}
}
