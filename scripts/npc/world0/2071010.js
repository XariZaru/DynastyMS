var status = -1;

importPackage(Packages.server.life);

// First quest
var req_items = {4001372: 400, 4000021: 400, 999: 100000000};
var saddle = 1912000;

// Second quest
var kenta_report = 4031508; // Need to get your pig mount
var hog = 1902000;
var pig_map = 677000010;

function start() {
	if (cm.getLevel() < 100) {
		cm.sendOk("No, you don't seem strong enough to even begin learning what I have to teach you dude.");
	} else {
		switch (cm.getPlayer().getDynastyQuest("A Sweet New Ride")) {
			case 5:
				cm.sendOk("You've learned all you need from me dude, ride on!");
				cm.dispose();
				break;
			case 0:
				cm.sendNext("You look like a rad dude, dude! If you want to check out some serious rides and learn how to use them you've come to the right guy!");
				break;
			case 1:
				var complete = true;
				for (var item in req_items) 
					if (item != 999 && !cm.haveItem(item, req_items[item]))
						complete = false;
					else if (cm.getMeso() < req_items[item])
						complete = false;
				if (complete) {
					cm.sendOk("Brilliant, brilliant! Here is your reward! It is of fantastic quality. If you wish to learn how to obtain your sweet ride next, then just talk to me again!\r\n\r\n#eItem Obtained!#n\r\n#i" + saddle + "#");
					for (var item in req_items)
						if (item != 999)
							cm.gainItem(item, -req_items[item]);
						else
							cm.gainMeso(-req_items[item]);
					cm.gainItem(saddle, 1);
					cm.getPlayer().completeDynastyQuest("A Sweet New Ride");
				} else {
					cm.sendOk("Hey man! You need to grab these before we can do any transactions. Mano y mano, you know what I'm sayin'?\r\n\r\n" + listItems(req_items));
				}
				cm.dispose();
				break;
			case 2:
				if (cm.getMapId() != pig_map) 
					cm.sendNext("So I bet you're thinkin', duuuuudeeeee! Why give me this sack of leather for so much but don't even give me the sweet ride that comes with it?");
				else {
					if (cm.getPlayer().getMap().countMobs() == 0) {
						cm.sendOk("Damn man! Nice going, here's the sweet ride you wanted and while we're at it, I've also given you the skill needed to ride him! Great going dude!\r\n\r\n#eItem Obtained!#n\r\n#i" + hog + "#");
						cm.gainItem(hog, 1);
						cm.getPlayer().completeDynastyQuest("A Sweet New Ride");	
						cm.teachSkill(1004, 1, 1, -1);
						cm.teachSkill(10001004, 1, 1, -1);
						cm.teachSkill(20001004, 1, 1, -1);
					} else {
						cm.sendOk("Ladi daaaa!");
					}
					cm.dispose();
				}
				break;
			case 3:
				cm.sendOk("You're back? I'm guessing you want to purchase mounts from me, huh?");
				cm.dispose();
				break;
			default:
				cm.sendOk("Do you need something?");
				cm.dispose();
				break;
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
		switch (cm.getPlayer().getDynastyQuest("A Sweet New Ride")) {
			case 0:
				cm.sendNext("In order for you to get onto your sweet ride, we're going to have to take a few steps to make sure you're ready!");
				break;
			case 2:
				cm.sendNext("And you are totally rad for thinkin' that! This is just a step into getting what you need man! You're so close! I can tell you right now that you're borderlining the line for getting a great awesome ride!");
				break;
		}
	} else if (status == 1) {
		switch (cm.getPlayer().getDynastyQuest("A Sweet New Ride")) {
			case 0:
				cm.sendAcceptDecline("We're first going to have to make your saddle! Making this bit is always the most important, so you've gotta be diligent with your work. Are you up for the challenge man?");
				break;
			case 2:
				cm.sendYesNo("You literally just have to do one thing dude. Just one thing. You've gotta tame a #epig#n. If you can do that, I'll give you your pig man. Are you ready? Do you want me to take you to tame that hog man?");
				break;
		}
	} else if (status == 2) {
		switch (cm.getPlayer().getDynastyQuest("A Sweet New Ride")) {
			case 0:
				cm.sendOk("Great, you're going to have to collect:\r\n\r\n" + listItems(req_items));
				cm.getPlayer().completeDynastyQuest("A Sweet New Ride");
				cm.dispose();
				break;
			case 2:
				if (cm.getPlayerCount(pig_map) == 0) {
					var pig = MapleLifeFactory.getMonster(4230103);
					pig.setHp(1000000);
					pig.setBoss(true);
					pig.getStats().setTagColor(1);
					pig.disableDrops();
					cm.warp(pig_map, 0);
					cm.getPlayer().getMap().resetAll();
					cm.getPlayer().getMap().spawnMonsterOnGroundBelow(pig, 9, 90);
					cm.dispose();
				} else {
					cm.sendOk("Someone is already taking on the hog man!");
					cm.dispose();
				}
				break;
		}
	}
}

function listItems(items) {
	var text = "#b";
	for (var item in items)
		if (item != 999)
			text += items[item] + " #z" + item + "#\r\n";
		else
			text += items[item] + " mesos\r\n";
	return text + "#k";
}