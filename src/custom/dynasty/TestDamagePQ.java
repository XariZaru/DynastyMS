package custom.dynasty;


import net.server.Server;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import tools.Pair;
import client.MapleCharacter;
import client.listeners.DamageEvent;
import client.listeners.DamageListener;
import client.listeners.MobDeadEvent;
import client.listeners.MobDeadListener;

public class TestDamagePQ implements DamageListener, MobDeadListener {

	private long timeStarted = 0;
	private MapleMonster mob;
	private int damage_taken;
	private Pair<Integer, Integer> owner; // Contains character id and world
	
	public TestDamagePQ(int mobid, int hp, int x, int y, MapleCharacter chr) {
		if (chr == null)
			return;
		this.mob = MapleLifeFactory.getMonster(mobid);
		this.owner = new Pair<Integer, Integer>(chr.getId(), chr.getWorld());
		mob.setDummy(this, hp);
		mob.addMobDeadListener(this);
		mob.addDamageListener(this);
		chr.getMap().spawnMonsterOnGroundBelow(mob, x, y);
	}
	
	public MapleCharacter getOwner() {
		return Server.getInstance().getWorld(owner.getRight()).getPlayerStorage().getCharacterById(owner.getLeft());
	}

	@Override
	public int getDamageDone() {
		return damage_taken;
	}

	@Override
	public void mobKilled(MobDeadEvent event) {
		MapleCharacter chr = event.getKiller();
		long time_elapsed = (System.currentTimeMillis() - timeStarted)/1000;
		time_elapsed += time_elapsed < 1 ? 1 : 1;
		long dps = ((int) (damage_taken / time_elapsed * 100)) / 100;
		if (chr != null && damage_taken > 0)
			chr.message("You deal approximately " + dps + " damage per second (over "+time_elapsed+" seconds)");
	}

	@Override
	public void addDamage(DamageEvent event) {
		if (damage_taken == 0)
			timeStarted = System.currentTimeMillis();
		damage_taken += event.getDamage();
	}
}
