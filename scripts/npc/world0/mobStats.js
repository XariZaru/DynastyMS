importPackage(Packages.server.life);

var status = -1;

function start() { 
	cm.sendGetText("What is the name of the monster you wish to search for?");
}

function action(m,t,s) {
	if (m == 0 || m == -1 || s == 999)
		return;
	else if (s == 998) {
		status = -1;
		start();
	} else
		status++;
	if (status == 0) {
		if (cm.getText() == "") {
			cm.sendOk("You must specificy #esomething#n at least!");
			cm.dispose();
		} else {
			cm.sendSimple(cm.searchMobs(cm.getText()) + "\r\n#L998#Back\r\n#L999#Exit");
		}
	} else if (status == 1) {
		var monster = MapleLifeFactory.getMonster(s);
		cm.sendNext(cm.getMobInfo(s));
		//cm.sendOk(cm.getHarmlessMobInfo(s));
	} else if (status == 2) {
		status = -1;
		start();
	}
}