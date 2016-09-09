package client.inventory;

import java.util.Arrays;
import java.util.List;

import server.MapleItemInformationProvider;
import server.life.MapleMonster;
import tools.MaplePacketCreator;
import client.MapleCharacter;
import client.listeners.DamageEvent;
import client.listeners.DamageListener;
import client.listeners.DropEvent;
import client.listeners.DropListener;

public class DonorPetFeature implements DamageListener, DropListener {
	
	/*
	 * 0 - Watches boss hp
	 * 1 - Watches for drops
	 * 2 - Displays DPS
	 */
	
	private final List<Integer> excluded_mobs = Arrays.asList(8170000, 8160000, 8500003, 8500004, 8820007, 6230101, 6300003, 6400003, 6400004);
	private int watched_item = 0;
	private int damage_done = 0, time_elapsed = 5; // time_elapsed in seconds
	private int uniquepetid;
	private int mob_last_damaged;
	private DonorPetFeatureType type;
	
	public DonorPetFeature(DonorPetFeatureType type, int uniquepetid) {
		this.type = type;
		this.uniquepetid = uniquepetid;
	}
	
	public void displayResults(MapleCharacter player) {
		StringBuilder str = new StringBuilder();
		try {
			switch (type) {
				case BOSSHP:
					if (damage_done > 0) {
						MapleMonster last_hit = player.getMap().getMonsterById(mob_last_damaged);
						if (last_hit != null && !excluded_mobs.contains(last_hit.getId()) && last_hit.isBoss())
							str.append(last_hit.getName() + ": " + (last_hit.getHp() * 100L / last_hit.getMaxHp()) + "%");
						damage_done = 0;
					}
					break;
				case DROP:
					if (watched_item != 0)
						str.append("A " + MapleItemInformationProvider.getInstance().getName(watched_item) + " has dropped nearby!");
					else
						str.append("I'm currently not searching for an item. Please select one!");
					break;
				case DPS:
					if (damage_done > 0) {
						str.append("DPS:").append("                   ").append(Math.round((damage_done / time_elapsed * 100))/100);
						damage_done = 0;
					}
					break;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		MaplePet[] pets = player.getPets();
		for (byte x = 0; x < 3; x++) {
			if (pets[x] != null && pets[x].getUniqueId() == this.getUniquePetId())
				player.getMap().broadcastMessage(player, MaplePacketCreator.petChat(player.getId(), x, (byte) 0, str.toString()), true);
		}
	}
	
	public void setDamage(int dmg) {
		damage_done = dmg;
	}
	
	public int getDamageDone() {
		return this.damage_done;
	}

	public void setWatchedItem(int item) {
		this.watched_item = item;
	}
	
	public void setType(DonorPetFeatureType type) {
		this.type = type;
	}

	public DonorPetFeatureType getType() {
		return this.type;
	}
	
	public int getUniquePetId() {
		return this.uniquepetid;
	}

	public int getWatchedItem() {
		return watched_item;
	}

	@Override
	public void addDamage(DamageEvent event) {
		if (event.getDamage() > 0) {
			damage_done += event.getDamage();
			mob_last_damaged = event.getMonster().getId();
		}
	}

	@Override
	public void drop(DropEvent event) {
		if (getWatchedItem() <= 0)
			return;
		if (event.getItem().getItemId() == getWatchedItem())
			displayResults(event.getOwner());
	}

}
