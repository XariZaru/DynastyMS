package client.listeners;
import java.util.EventListener;

public interface DamageListener extends EventListener {

	public void addDamage(DamageEvent event);
	public int getDamageDone();
	
}
