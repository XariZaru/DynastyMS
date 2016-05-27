function start() {
	cm.sendYesNo("Would you like to go to the " + (cm.getPlayer().getMapId() == 222020210 ? "2nd floor" : "99th floor") + "?");
}

function action(m,t,s) {
	if (m < 1) {
		cm.dispose();
		return;
	} else {
		cm.warp(cm.getPlayer().getMapId() == 222020210 ? 222020100 : 222020200, 0);
		cm.dispose();
	}
}