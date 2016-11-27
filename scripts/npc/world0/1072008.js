/**
	Author: xQuasar
	NPC: Kyrin - Pirate Job Advancer
	Inside Test Room
**/

var item;
var status;

function start() {
    status = -2;
    action(1,0,0);
}

function action(mode,type,selection) {
	if (mode == 1)
		status++;
	else {
		cm.dispose();
		return;
	}
    if (status == -1) {
		item = cm.isQuestStarted(2191) ? 4031856 : 4031857;
		if (cm.getMapId() == 108000502 || cm.getMapId() == 108000501) {
			if (!(cm.haveItem(item,15))) {
				cm.sendNext("Are you sure you want to leave already? If you leave now you'll have to recollect all 15 #b#z"+item+"##k!");
			} else {
				status = 1;
				cm.sendNext("Wow, you have brought me 15 #b#z"+item+"##k! Congratulations. Let me warp you out now.");
			}
		}
	} else if (status == 0) {
		if (cm.getMapId() == 108000502 || cm.getMapId() == 108000501) {
			if (!(cm.haveItem(item,15))) {
				cm.removeAll(item);
				cm.warp(120000101,0)
				cm.dispose();
			} else {
				cm.sendNext("Wow, you have brought me 15 #b#z"+item+"##k! Congratulations. Let me warp you out now.");
			}
		}
    } else if (status == 2) {
		if (cm.isQuestStarted(2191))
			cm.completeQuest(2191);
		else
			cm.completeQuest(2192);
		cm.removeAll(item);
    	cm.warp(120000101,0);
		cm.dispose();
    }
}