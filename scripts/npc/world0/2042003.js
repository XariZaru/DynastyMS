function start() {
	cm.getPlayer().getCPQParty().endCPQParty(980000000);
	cm.dispose();
}

//function start() {
//	if (cm.getParty() == null) {
//		cm.sendOk("You must be in a party.");
//		cm.dispose();
//	} else if (cm.getPlayer().getSpawnPQ() == null) {
//		cm.sendOk("Created spawn pq.");
//		cm.startSpawnPQ();
//		spawn = cm.getPlayer().getSpawnPQ();
//		spawn.addMob(100100, 159, -48);
//		spawn.addMob(100100, 248, 132);
//		spawn.startPQ();
//		cm.dispose();
//	} else {
//		cm.sendNext("Setting new stage ...");
//	}
//}
//
//function action(m,t,s,status) {
//	if (status == 0) {
//		spawn = cm.getPlayer().getSpawnPQ();
//		spawn.destroyPQ();
//		/*
//		var text = "What mobs do you wish to stop from spawning?\r\n";
//		for (var x = 0; x < spawn.getMonsters().length; x++) {
//			text += "#L" + x + "# #o"+spawn.getMonsters()[x]+" #\r\n";
//		}
//		cm.sendSimple(text);*/
//		cm.dispose();
//	}
//}