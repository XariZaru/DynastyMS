var status = -1;

function start() {
	if (cm.getPlayer().getJob().getId() == 2110) {
		if (cm.getQ() == 39) {
			switch(cm.getPlayer().getDynastyQuest("WuYuanAran")) {
				case 0:
					cm.sendNext("What do you want?");
					break;
				case 1:
					cm.sendOk("Get authorization from #bGold Richie#k and I'm sure I can do what you want.");
					cm.dispose();
					break;
				case 2:
					cm.sendOk("What? #bGold Richie#k actually approved the damn thing? Well, I suppose I can't do much now. Consider the shipping routes changed for the next 2 days.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 200000 exp");
					cm.getPlayer().completeDynastyQuest("WuYuanAran");
					cm.gainExp(200000);
					cm.dispose();
					break;
				default:
					cm.sendOk("Armament is a deadly but necessary thing.");
					cm.dispose();
					break;
			}
		} else {
			cm.sendOk("War takes a toll on us all, but we must be prepared!");
			cm.dispose();
		}
	} else {
		cm.sendOk("Armament is important in times of war!");
		cm.dispose();
	}
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		switch(cm.getPlayer().getDynastyQuest("WuYuanAran")) {
			case 0:
				cm.sendNext("I'd like to reroute all shipping routes coming into #bHenesys#k for the next 2 days toward the center of town.", 2);
				break;
		}
	} else if (status == 1) {
		switch(cm.getPlayer().getDynastyQuest("WuYuanAran")) {
			case 0:
				cm.sendOk("That can be done: but I would need authorization from the organizer in town, #bGold Richie#k. If you can get authorization from him, then I'm sure we can work something out.");
				cm.getPlayer().completeDynastyQuest("WuYuanAran");
				cm.dispose();
				break;
		}
	}
}