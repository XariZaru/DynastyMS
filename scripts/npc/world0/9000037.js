function start() {
	if (cm.getMapId() != 970030000) {
		cm.sendAcceptDecline("Do you wish to test your damage at the DPS map?");
	} else if (cm.getPlayer().getMap().countMobs() < 1) {
		cm.sendSimple("What would you like to do?", "Test my damage", "Leave");
	} else {
		cm.getPlayer().killDummy();
		cm.dispose();
	}
}

function action(m,t,s,status) {
	if (status == 0) {
		var blocked = [109040000, 910000000, 970030000];
		if (cm.getMapId() != 970030000) {
			if (blocked.indexOf(cm.getMapId) == -1)
				cm.getPlayer().saveLocation("WARPER");
			cm.warp(970030000);
			cm.dispose();
		} else {
			if (s == 1) {
				cm.warp(cm.getPlayer().getSavedLocation("WARPER"));
				cm.dispose();
			} else {
				cm.sendGetNumber("How much HP should the monster have?",1000,0,2147000000);
			}
		}
	} else if (status == 1) {
		cm.startDamageTest(9500400, s, 265, 2145);
		cm.dispose();
	}
}