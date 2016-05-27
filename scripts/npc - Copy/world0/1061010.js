/*
 * @Jonathan Nguyen
 * @Sparkling Crystal - DynastyMS PQ
 * @ The Other Dimension
 */

var min = 6;
var status = -1;

function start() {
    party = cm.getParty();
    inMap = cm.partyMembersInMap();
    ppl = party.getMembers();
    ready = 0;
    if (party == null) {
        cm.sendNext("#b(The crystal glistens with a power that seems to shine beyond the natural realm)#k",2);
    } else if (!cm.isLeader()) {
        cm.sendOk("You must be a leader to lead this expedition. Please contact your leader and request for him to begin the excavation.");
        cm.dispose();
    } else {
        text = "This is your team's status as of right now:\r\n#e";
        for (var i = 0; i < ppl.size(); i++) {
            text += "\r\n#b"+ppl.get(i).getName()+"#k #r(#m"+ppl.get(i).getMapId()+"#)#k -";
            if (ppl.get(i).getMapId() != cm.getMapId()) {
                text += " #eNOT READY#n";
            } else {
                text += " #eREADY#n";
                ready++;
            }
        }
        if (ready != inMap) {
            cm.sendOk("You cannot start the expedition right now; all players must be present and accounted for. " + text);
        } else {
            cm.sendAcceptDecline("Your team is ready to start. Everyone is present and accounted for. " + text);
        }
    }
}

function action(m,t,s) {
    if (m == 1) {
        status++;
    } else {
        cm.dispose();
        return false;
    }
    if (status == 0) {
        if (cm.getParty()== null ) {
            cm.sendOk("#b(The crystal remains unresponsive to the touch. It seems to vibrate with more intensity. Perhaps you should recruit a team to investigate this rock)#k",2);
        }
    }
    cm.dispose();
}