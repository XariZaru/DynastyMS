function start() {
	cm.sendYesNo("Do you wish to go to Leafre?");
}

function action(m,t,s) {
	if (m <= 0) {
		cm.sendOk("If you change your mind, then talk to me.");
		cm.dispose();
		return;
	}
	cm.warp(240000000);
	cm.dispose();
}