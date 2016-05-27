function start() {
	cm.sendYesNo("Do you wish to go to Orbis?");
}

function action(m,t,s) {
	if (m <= 0) {
		cm.sendOk("If you change your mind, then talk to me.");
		cm.dispose();
		return;
	}
	cm.warp(200000100);
	cm.dispose();
}