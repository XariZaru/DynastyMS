var status = -1;
var helmet = 4000502;
var spear = 4000503;
var steel_ore = 4010001;
var food = 4031580;

function start() {
	switch (cm.getQ()) {
		case 36:
			if (cm.itemQuantity(steel_ore) < 3) {
				cm.sendOk("Look, how many times do I have to tell you? Go get 3 #i"+steel_ore+"#!");
				cm.dispose();
			} else {
				cm.sendOk("Very good! Very good, this makes me happy. We'll be able to repair the armor and weapons and sell them now. I'm indebted to your services. Oh, and here, take this!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 100000\r\n#fUI/UIWindow.img/QuestIcon/7/0# 100000\r\n#i" + food + "#");
			}
			break;
		case 35:
			cm.sendNext("That was some good work you did for me earlier. Now, in order to repair these materials I'll have to have some mineral to patch them up. They're in a horrid state of condition, but if we can manage to get a material that they were made of we'll be able to repair the armor to its original condition. Sounds pretty easy right?\r\n\r\n#eWrong!#n");
			break;
		case 32:
			cm.sendNext("Come look at my fine wares! Come, come, come! Come look at how they #esparkle#n. Look at how they #eglimmer#n! Yes, yes, #byou#k, young adventurer. Come here!");
			break;
		case 33:
			cm.sendAcceptDecline("Glad to see you could make it. Now, I've got my eye on some tattered weapons over at a place called #bMushroom Kingdom#k. If you can grab me some materials from those areas, then I'm sure we'll be able to make them into fine wares indeed. One man's junk is another man's treasure, and I spy treasures all around me that people discard. They are so wasteful, really. What do you say? There is a little something for you at the end if you can help me out a little!");
			break;
		case 34:
			if (!cm.haveItem(helmet, 60) || !cm.haveItem(spear, 60)) {
				cm.sendOk("Did you even bring me 60 of each #i"+spear+"# and #i"+helmet+"#? I'm going to need a lot of those wares to make this time investment profitable!");
				cm.dispose();
			} else {
				cm.sendOk("Great job on this! Here is a little something as a reward for your efforts; however, if you still want what you were looking for earlier, you're going to have to do one more task for me.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 60000\r\n#fUI/UIWindow.img/QuestIcon/7/0# 100000");
			}
			break;
	}
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		switch (cm.getQ()) {
			case 36:
				if (!cm.canHold(food)) {
					cm.sendOk("Please clear your #eETC.#n inventory so that I can give you a little something for your hard work.");
					cm.dispose();
					return;
				}
				cm.completeQ();
				cm.gainItem(steel_ore, -3);
				cm.gainItem(food, 1, true, true);
				cm.gainExp(100000);
				cm.gainMeso(100000);
				cm.talkGuide("Let's go back to the Master Thief! We got our food ... without stealing?", 0);
				break;
			case 35:
				cm.sendYesNo("We're going to need to get some #e#z"+steel_ore+"##n, and we're going to need a good amount. Luckily, many monsters in this world drop such a commodity. The hard part, however, is finding which of the monsters carry it. Though I'm sure you can find that all out on your own, no?");
				break;
			case 34:
				cm.completeQ();
				cm.gainExp(60000);
				cm.gainMeso(100000);
				cm.gainItem(helmet, -60);
				cm.gainItem(spear, -60);
				cm.dispose();
				break;
			case 32:
				cm.sendNext("#b(You look closer and see fine wares sparkling with gold, and behind them a repository of food as far as the eye can see. Perhaps you should steal from this man)#k",2);
				break;
			case 33:
				cm.sendOk("Great, then I need you to collect 60 #i"+helmet+"# and 60 #i"+spear+"#. Can you do that? I'm sure you can find these wares somewhere in the Skyscraper maps of Mushroom Kingdom.");
				cm.dispose();
				break;
		}
	} else if (status == 1) {
		switch (cm.getQ()) {
			case 35:
				cm.sendAcceptDecline("Brilliant. Get me 3 #e#z"+steel_ore+"##n and I'll be sure to reward you finely.");
				break;
			case 32:
				cm.sendAcceptDecline("#eTry to steal from this man?#n");
				break;
			case 33:
				cm.completeQ();
				cm.talkGuide("Let's go to the Skyscraper maps at Mushroom Kingdom. We should be able to find what Richie is looking for.", 0);
				cm.dispose();
				break;
		}
	} else if (status == 2) {
		switch (cm.getQ()) {
			case 35:
				cm.completeQ();
				cm.talkGuide("We can check what monsters drop steel ore by using #e@helper#n and going to the #eserver utilities#n!", 0);
				cm.dispose();
				break;	
			case 32:
				cm.sendNext("#eWhoah!#n Hold on there young adventurer. Don't think that I haven't seen my fair share of thieves in my day. Though I admire your adamancy for commiting such a crime, I can't leave it unpunished. Listen here, instead of me alerting the guards to your deed, how about you do me a favor and work for me a little, huh? And as a bonus, I'll even award you the food you were going after!");
				break;
		}
	} else if (status == 3) {
		switch (cm.getQ()) {
			case 32:
				cm.sendOk("#eFantastic!#n Talk to me again if you want details to what you need to do.");
				break;
		}
	} else if (status == 4) {
		switch (cm.getQ()) {
			case 32:
				cm.completeQ();
				cm.talkGuide("Let's talk to this strange man again. Perhaps we can get more than we need and go back to the master after this.", 0);
				cm.gainExp(30000);
				cm.dispose();
				break;
		}
	}
}