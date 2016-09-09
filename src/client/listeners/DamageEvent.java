package client.listeners;

import java.util.EventObject;

import server.life.MapleMonster;
import client.MapleCharacter;

public class DamageEvent extends EventObject {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1871361754135897451L;
	private int damage = 0;
	private MapleMonster mob;
	private MapleCharacter chr;
	
	public DamageEvent(Object source, MapleMonster mob, MapleCharacter chr, int damage) {
		super(source);
		this.damage = damage;
		this.mob = mob;
		this.chr = chr;
	}

	public int getDamage() {
		return damage;
	}
	
	public MapleCharacter getPlayer() {
		return chr;
	}
	
	public MapleMonster getMonster() {
		return mob;
	}
	
}
