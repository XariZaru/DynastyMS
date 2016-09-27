package server.partyquest;

import client.MapleCharacter;
import java.util.LinkedList;
import java.util.List;
import server.maps.MapleMap;
import tools.MaplePacketCreator;

/**
 * @author Rob
 */
public class MonsterCarnivalParty {

    private List<MapleCharacter> members = new LinkedList<>();
    private MapleCharacter leader;
    private byte team;
    private short availableCP = 0, totalCP = 0;
    private int summons = 10;
    private boolean winner = false;

    public MonsterCarnivalParty(final MapleCharacter owner, final List<MapleCharacter> members1, final byte team1) {
        leader = owner;
        members = members1;
        team = team1;

        for (final MapleCharacter chr : members) {
            chr.setCarnivalParty(this);
            chr.setTeam(team);
        }
    }

    public final MapleCharacter getLeader() {
        return leader;
    }

    public void addCP(MapleCharacter player, int ammount) {
        if (ammount > 0) totalCP += ammount;
        availableCP += ammount;
        player.addCP(ammount);
    }

    public void resetCP() {
        totalCP = 0;
        availableCP = 0;
    }
    
    public int getTotalCP() {
        return totalCP;
    }

    public int getAvailableCP() {
        return availableCP;
    }

    public void useCP(MapleCharacter player, int ammount) {
        availableCP -= ammount;
        player.useCP(ammount);
    }

    public List<MapleCharacter> getMembers() {
        return members;
    }

    public int getTeam() {
        return team;
    }

    public int getOppositeTeam() {
        return (team == 0 ? 1 : 0);
    }
    
    public void warpOut(final int map) {
        for (MapleCharacter chr : members) {
            chr.changeMap(map, 0);
        }
        members.clear();
    }

    public void warp(final MapleMap map, final String portalName) {
        for (MapleCharacter chr : members) {
            chr.changeMap(map, map.getPortal(portalName));
        }
        if(map.getId() % 10 == 1) { //fieldMap
            map.broadcastMessage(MaplePacketCreator.openUI((byte) 18));
        }
    }

    public void removeMember(MapleCharacter chr) {
        members.remove(chr);
        if(!chr.getMap().isMCPQVictoryOrDefeatMap() && chr.getMapId() != 980000000 && chr.getMapId() != 980000010) {
            chr.changeMap(980000010);
        }
        // If you are, Spiegelmann will warp you himself.
        chr.setCarnivalParty(null);
    }

    public boolean isWinner() {
        return winner;
    }

    public void setWinner(boolean status) {
        winner = status;
    }

    public void displayMatchResult() {
        final String effect = winner ? "quest/carnival/win" : "quest/carnival/lose";

        for (final MapleCharacter chr : members) {
            chr.announce(MaplePacketCreator.showEffect(effect));
        }
    }

    public void summon() {
        this.summons--;
    }

    public boolean canSummon() {
        return this.summons > 0;
    }
    
    public void sendClock(int time) {
        for (MapleCharacter chr : members) {
            chr.getClient().announce(MaplePacketCreator.getClock(time));
        }
    }
}
