var status = -1;
var mummy_wrap = 4000205;

function start() {
	if (cm.getJobId() < 2110) {
		cm.sendOk("The men require blessings and weapons in order to do their job.");
		cm.dispose();
	} else {
		if (cm.getQ() == 39) {
			if (cm.getPlayer().getDynastyQuest("AranFaHai") == 0) {
				cm.sendNext("Ah, are you a man of the army? Praise you for fighting for the majesty! How may I help you today?");
			} else if (cm.getPlayer().getDynastyQuest("AranFaHai") == 1) {
				if (!cm.haveItem(mummy_wrap, 150)) {
					cm.sendOk("If you want to talk about the supplies, then clear out the infestation at #eRemains <Tomb> I#n and bring me back 150 #b#z"+mummy_wrap+"##k.");
					cm.dispose();
				} else {
					cm.sendOk("Consider your request granted: we'll ship our next shipment of supplies to #bHenesys#k. Blessings be upon you, my friend.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 150000 exp");
					cm.gainItem(mummy_wrap, -150);
					cm.getPlayer().completeDynastyQuest("AranFaHai");
					cm.gainExp(150000);
					cm.talkGuide("Well, we cleared out the shipments in Kerning City! If we have any other places to go, then let's do it!", 5);
					cm.dispose();
				}
			} else {
				cm.sendOk("Peace be upon you, my friend.");
				cm.dispose();
			}
		} else {
			cm.sendOk("Blessings be upon you, friend.");
			cm.dispose();
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
		cm.sendNext("I need food and supplies: I'm taking them down to Henesys where we'll be distributing resources to the main army.", 2);
	} else if (status == 1) {
		cm.sendNext("But ... does Henesys not have its own food supply chain? Why are you requesting such things from a side district?");
	} else if (status == 2) {
		cm.sendNext("Either way, if you can show me that you're actually an agent of the army, then you must be able to take care of a little problem, no?");
	} else if (status == 3) {
		cm.sendOk("There's a bit of a monster infestation piling up near #eRemains <Tomb> I#n. If you can bring me back 150 #b#z"+mummy_wrap+"##k, then we'll talk.");
		cm.getPlayer().completeDynastyQuest("AranFaHai");
		cm.dispose();
	}
}