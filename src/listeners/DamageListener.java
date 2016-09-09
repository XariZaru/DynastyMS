package listeners;
import server.life.MapleMonster;
import client.MapleCharacter;

public interface DamageListener {

	public void addDamage(MapleCharacter from, MapleMonster mob, int damage);
	public int getDamageDone();
	
}
