package listeners;
import client.MapleCharacter;
import server.life.MapleMonster;

public interface DamageListener {

	public void addDamage(MapleCharacter from, MapleMonster mob, int damage);
	public int getDamageDone();
	
}
