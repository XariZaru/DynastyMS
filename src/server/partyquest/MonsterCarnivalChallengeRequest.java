/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.partyquest;

import client.MapleCharacter;
import java.lang.ref.WeakReference;

/**
 *
 * @author David
 */
public class MonsterCarnivalChallengeRequest {

    WeakReference<MapleCharacter> challengers; //dat garbage collector doe
    String challengeMessage = "";

    public MonsterCarnivalChallengeRequest(MapleCharacter challengers) {
        this.challengers = new WeakReference<>(challengers);
        // Functional operations anyone?
        challengers.getParty().getMembers().stream().map((pc) -> challengers.getMap().getCharacterById(pc.getId())).filter((chr) -> (chr != null)).forEach((chr) -> {
            challengeMessage += ("#b" + chr.getName() + ", Level " + chr.getLevel() + " " + chr.getJob().name() + ", would like to challenge you in this PQ!#k");
        });
    }

    public MapleCharacter getChallengers() {
        return challengers.get();
    }

    public String getChallengeMessage() {
        return challengeMessage;
    }
}
