function start() {
	cm.sendYesNo("Do you wish to go to Ludibrium?");
}

function action(m,t,s) {
	if (m <= 0) {
		cm.sendOk("If you change your mind, then talk to me.");
		cm.dispose();
		return;
	}
	cm.warp(220000000);
	cm.dispose();
}