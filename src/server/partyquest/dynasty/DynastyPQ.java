package server.partyquest.dynasty;

import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import server.maps.MapleMap;

public class DynastyPQ {

	MapleParty party;
	int level;
	
	public DynastyPQ(MapleParty party) {
		this.party = party;
		this.level = 0;
	}
	
	public void advanceStage() {
		level++;
	}
	
	public int getLevel() {
		return level;
	}

	public MapleParty getParty() {
		return party;
	}
	
	public MaplePartyCharacter getLeader() {
		return party.getLeader();
	}
	
	public MapleMap getCurrentMap() {
		return getLeader().getPlayer().getMap();
	}
	
}
