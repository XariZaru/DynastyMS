function act() {
//    if (rm.getReactor().getCurrState() === 1) { //do nothing when it has already sprouted a flower
//        return;
//    }
    var eim = rm.getEventManager("HenesysPQ").getInstance("HenesysPQ");
    if (eim !== null) {
//        var rid = rm.getReactor().getId();

//        if (eim.getProperty(rid) !== null/*eim.getProperty(rid).equals("1")*/) { //do nothing when it has already sprouted a flower
//            return;
//        }
//        eim.setProperty(rid, 1);
        var HPQ = Java.type("server.partyquest.HPQ");
        rm.mapMessage(6, "The green seed has sprouted a flower.");
        HPQ.incrementMoonState(eim);
    }
}
