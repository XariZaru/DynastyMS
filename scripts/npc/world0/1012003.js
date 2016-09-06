var status = -1;
var mush_cap = 4000012;

function start() {
	if (cm.getLevel() >= 15) {
		switch (cm.getPlayer().getDynastyQuest("The Mayor Of Henesys")) {
			case 2:
				cm.sendOk("Thank you for helping me out with this favor. It helps me a lot when samaritans such as you give assistance!");
				cm.dispose();
				break;
			case 1:
				if (!cm.haveItem(mush_cap, 100)) {
					cm.sendOk("Can you go and kill some #egreen mushrooms#n nearby and bring me back 100 of their caps as proof?");
					cm.dispose();
				} else {
					cm.sendOk("Fantastic work my friend! Here's a little something from me to commend you and your efforts\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 3500\r\n#fUI/UIWindow.img/QuestIcon/7/0# 5500");
					cm.gainMeso(5500);
					cm.gainExp(3500);
					cm.gainItem(mush_cap, -100);
					cm.getPlayer().completeDynastyQuest("The Mayor of Henesys");
					cm.dispose();
				}
				break;
			case 0:	
				cm.sendNext("God, there's so much to do and so little time!  The Empire will have their agents conducting an investigation if I don't finish my task fast enough. They might think I'm plotting against them! Good god, there's so much to do!" + cm.getPlayer().getDynastyQuest("The Mayor of Henesys"));
				break;
			default:
				cm.sendOk("It's very tiring running a city for the Empire. So many rules, so many laws. It's so much!!");
				cm.dispose();
				break;
		}
	} else {
		cm.sendOk("It's very tiring running a city for the Empire. So many rules, so many laws. It's so much!");
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
		switch (cm.getPlayer().getDynastyQuest("The Mayor Of Henesys")) {
			case 0:
				cm.sendNext("You look a little bothered. Is there anything I can do to help you?", 2);
				break;
		}
	} else if (status == 1) {
		switch (cm.getPlayer().getDynastyQuest("The Mayor Of Henesys")) {
			case 0:
				cm.sendAcceptDecline("Hmm, it seems you look strong enough. Yes, yes. I believe this could work out for the both of us. Me, the Mayor, with an inexhaustible supply of resources, and you, a newly come adventurer who I bet is strong enough to do the task I need to be done. #eYes!#n If you do what I need, I'll reward you greatly. How does that sound?");
				break;
		}
	} else if (status == 2) {
		switch (cm.getPlayer().getDynastyQuest("The Mayor Of Henesys")) {
			case 0:
				cm.sendOk("The empire wants me to clamp down on the number of monsters raiding convoy routes that are coming into #bHenesys#k. Can you take care of some #eGreen Mushrooms#n and bring me back 100 of their caps?");
				cm.getPlayer().completeDynastyQuest("The Mayor of Henesys");
				cm.dispose();
				break;
		}
	}
}