var status = -1;

function start() {
	cm.getPlayer().completeSQuest(1000);
	cm.sendNext(cm.getPlayer().checkSQuest(1000));
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
		cm.sendOk("Okay!");
		cm.dispose();
	}
}