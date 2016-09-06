var status = -1;
var shell = 4000045;
var quest;

function start() {
	quest = cm.getPlayer().getDynastyQuest("ChefAran");
	if (cm.getJobId() == 2110) {
		if (quest == 0) {
			cm.sendNext("Cooking, cooking, cooking is just sublime! Sublime I say!");
		} else if (quest == 1) {
			if (cm.itemQuantity(shell) < 100) {
				cm.sendOk("Nah, this isn't good enough. I need at least 100 #b#z"+shell+"##k!");
				cm.dispose();
			} else {
				cm.sendOk("Fantastic! And deliver these to #bHenesys#k you say? Will do!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 250000 exp");
				cm.gainExp(250000);
				cm.gainItem(shell, -100);
				cm.getPlayer().completeDynastyQuest("ChefAran");
				cm.dispose();
			}
		} else {
			cm.sendOk("God I love cooking. Thank you for giving me the opportunity to cook for such a large audience!");
			cm.dispose();
		}
	} else {
		cm.sendOk("What a delight!");
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
		if (quest == 0) {
			cm.sendNext("What's that? You want me to cook some food for you? No, for a whole population?! Well that just sounds amazing!");
		}
	} else if (status == 1) {
		if (quest == 0) {
			cm.sendOk("Tell you what. If you can get me 100 #b#z"+shell+"##k then I'll be able to create a delicious handheld cuisine that will rock your world!");
			cm.getPlayer().completeDynastyQuest("ChefAran");
			cm.dispose();
		}
	}
}