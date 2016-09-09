package client.listeners;
import java.util.EventListener;

import client.MapleCharacter;
import server.life.MapleMonster;

public interface DamageListener extends EventListener {

	public void addDamage(DamageEvent event);
	public int getDamageDone();
	
}
