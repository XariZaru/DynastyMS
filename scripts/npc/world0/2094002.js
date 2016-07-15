var status = -1;
var index;
var rookie_mark = 4001120;
var rising_mark = 4001121;
var veteran_mark = 4001122;
var key = 4001117;

function start() {
	var pq_maps = [925100000,925100100,925100200,925100300,925100400, 925100500];
	index = pq_maps.indexOf(cm.getPlayer().getMap().getId());
	if (index == -1)
		cm.sendNext("Let me get you on out of here.");
	else {
		if (index == 1 && cm.haveItem(rookie_mark, 20), cm.haveItem(rising_mark, 20), cm.haveItem(veteran_mark, 20) && !cm.getPlayer().getMap().getPortal("next00").getPortalState()) {
			cm.getParty().getPQ().nextStage();
			cm.sendOk("The way has been opened for you! Move on!");
			cm.gainItem(rookie_mark, -20);
			cm.gainItem(rising_mark, -20);
			cm.gainItem(veteran_mark, -20);
			cm.dispose();
		} else if (index == 4 && cm.haveItem(key, 4) && !cm.getPlayer().getMap().getPortal("next00").getPortalState()) {
			cm.getParty().getPQ().nextStage();
			cm.sendOk("The way has been opened for you! Move on!");
			cm.gainItem(key, -4);
			cm.dispose();
		} else {	
			if (cm.getMapId() != 925100500 && cm.getPlayer().getMap().getPortal("next00").getPortalState()) {
				cm.sendOk("Move on to the next area! Quick!");
				cm.dispose();
			} else if (cm.getParty().getPQ().getStage() > 5) {
				cm.warpParty(925100600);
				cm.dispose();
			} else {
				cm.sendSimple("Hey there, what do you want?\r\n\r\n#L0#Task\r\n#L1#Leave");
			}
		}
	}
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		if (s == 1 || index == -1) {
			cm.warp(251010404);
		} else {
			var text = index == 0 || index == 2 || index == 3 ? "You just have to kill all the monsters for me here!" : index == 1 ? "Collect 20 of each mark of the pirate for me!" : index == 4 ? "Collect 4 pirate keys for me so I can lock these guys back up!" : "Kill #bLord Pirate#k and free us from him!";
			cm.sendOk(text);
		}
		cm.dispose();
	}
}