package server.partyquest;
import java.util.List;

import client.MapleCharacter;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.partyquest.DynastyMS;

public class ItemQuest extends DynastyMS {

	private List<Integer> item, amount;
	
	public ItemQuest(List<Integer> mobs, List<Integer> item, List<Integer> amount, 
			final List<MapleCharacter> chrs, MapleMap map) {
		
		super(mobs, item.size(), chrs, map);
		
		this.item = item;
		this.amount = amount;
		
		
	}

	public boolean checkWin() {
		for (MapleCharacter chr : getParty()) {
			if (chr.haveItem(item.get(getLevel()), amount.get(getLevel()))) {
				return true;
			}
		}
		return false;
	}
	
	public int getItem(int level) {
		return item.get(level);
	}
	
	public int getAmount(int level) {
		return amount.get(level);
	}
	
}
