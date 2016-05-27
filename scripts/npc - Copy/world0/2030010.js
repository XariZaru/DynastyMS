function start() {
    cm.sendYesNo("Do you wish to leave? This will take your whole party out of the Zakum map.");
}

function action(m,t,s) {
    if (m == 1) {
        if (cm.getParty() == null) {
            cm.resetMap();
            cm.removeAll(4001017);
            cm.warp(211042300);
        } else {
            cm.resetMap();
            cm.removeFromParty(4001017, cm.getPartyMembers());
            cm.warpParty(211042300);
        }
    }
    cm.dispose();
    return true;
}