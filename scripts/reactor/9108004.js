function act() {
    var eim = rm.getEventManager("HenesysPQ").getInstance("HenesysPQ");
    if (eim !== null) {
        var HPQ = Java.type("server.partyquest.HPQ");
        rm.mapMessage(6, "The yellow seed has sprouted a flower.");
        HPQ.incrementMoonState(eim);
    }
}
//function act() {
//	var eim = rm.getEventManager("HenesysPQ").getInstance("HenesysPQ");
//	if (eim != null) {
//		var stage = parseInt(eim.getProperty("stage")) + 1;
//		var newStage = stage.toString();
//		eim.setProperty("stage", newStage);
//		rm.mapMessage(6, "The yellow seed has sprouted a flower.");
//		if (eim.getProperty("stage").equals("6")) {
//			rm.mapMessage(6, "Protect the Moon Bunny!!!");
//			var map = rm.getParty().getLeader().getPlayer().getEventInstance().getMapInstance(rm.getReactor().getMap().getId());
//			map.allowSummonState(true);
//			map.spawnMonsterOnGroundBelow(9300061, -190, -190);
//		}
//	}
//}