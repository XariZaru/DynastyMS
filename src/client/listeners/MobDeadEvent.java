package client.listeners;

import java.util.EventObject;

import server.life.MapleMonster;

public class MobDeadEvent extends EventObject {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5187422275722511386L;

	private MapleMonster monster;
	
	public MobDeadEvent(Object arg, MapleMonster monster) {
		super(arg);
		this.monster = monster;
	}

	public MapleMonster getMonster() {
		return monster;
	}
	
}
