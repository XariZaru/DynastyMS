var status = -1;
var map = 211050000;

function start() {
	if (cm.getLevel() < 150) {
		cm.sendOk("Some say there is a monster that lives deep underground and terrorizes us all ...");
		cm.dispose();
	} else if (cm.getPlayer().getDynastyQuest("Unlocking a Hidden Power") > 10) {
		cm.sendOk("Finished this storyline>");
		cm.dispose();
	} else {
		switch (cm.getPlayer().getDynastyQuest("Unlocking a Hidden Power")) {
			case 0:
				if (cm.getMapId() != map) {
					cm.sendOk("Hey, you there. Yes, you. Come here. You look like the sort that's strong enough to take on the quest I need. I guarantee that you'll get a #efantastic#n reward if you participate in this epic journey. What do you say, eh? If you're interested, come meet me at #bIcy Cold Field#k in El Nath.");
					cm.dispose();
				} else {
					cm.sendNext("Glad to see that there are still the strong that care about us weaker ones. Listen here, there is quite a journey that we're about to embark. If you're still interested then stick around. The fate of this world may very well depend on it.");
				}
				break;
			case 1:
				cm.sendNext("Anyways, before I give you the details of the quest, I need you to fetch for me something precious from the #bRider's Field#k in the portal above.");
				break;
			case 2:
				cm.sendOk("Have you gotten the ice? It doesn't look like you have. Go to the #bRider's Field#k above and collect the ice for me!");
				cm.dispose();
				break;
			case 3:
				cm.sendOk("Thank you for this. We can begin our adventure as soon as you talk to me again.");
				cm.gainItem(3994138, -cm.itemQuantity(3994138));
				cm.getPlayer().completeDynastyQuest("Unlocking a Hidden Power");
				cm.dispose();
				break;
			case 4:
				cm.sendOk("The first step is getting a letter from one of my fellow colleagues in #bEl Nath#k. If you can find someone named #bMaster Sergeant Fox#k, we'll be able to move on from there. He has in his possession a letter that will allow us to get back into the cave system and rescue my friend and put an end to this demonic beast.");
				cm.getPlayer().completeDynastyQuest("Unlocking a Hidden Power");
				cm.dispose();
				break;
			case 5:
				cm.sendOk("You don't have the letter! We need the letter to be able to go into the dungeon!");
				cm.dispose();
				break;
			case 6:
				cm.sendOk("Fantastic. The instructions here say to reach an area called #bBottom of the Temple#k. There, the monster and my trapped colleague reside. Do you know of such a place?");
				cm.getPlayer().completeDynastyQuest("Unlocking a Hidden Power");
				cm.dispose();
				break;
			case 7:
				cm.sendOk("The letter says to go to #bBottom of the Temple#k. What you'll do there is uncompletely unknown to me.");
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
		switch (cm.getPlayer().getDynastyQuest("Unlocking a Hidden Power")) {
			case 0:
				cm.sendNext("Very recently, several colleagues and I stumbled across some ancient runes that predate the creation of the #eEmpire#n itself. I mean, this stuff stretches back hundreds and hundreds of years. This runes were located in some tunnel system spanning the underside of #bSleepywood#k, going deep down into the depths until all light, even those from stationed torches could not reach us. It became dark, cold, and desolate. I could see fog fan out from each breath.");
				break;
			case 1:
				cm.sendOk("The ice here is getting thin. If you can get to the end of #bRider's Field#k you should be able to obtain an item that allows me to continue freezing ice here.");
				cm.getPlayer().completeDynastyQuest("Unlocking a Hidden Power");
				cm.dispose();
				break;
		}
	} else if (status == 1) {
		switch (cm.getPlayer().getDynastyQuest("Unlocking a Hidden Power")) {
			case 0:
				cm.sendNext("And that was when we saw them: these ancient scriptures that told us of the end of the world and the rising of a great and ancient beast. My colleague got close, and then all of a sudden the tunnels started shaking. They started crumbling, rocks falling down and the caverns seeming to ominously threaten to collapse upon us. I was shoved out of the tunnel and into safety, only to see my friend trapped behind its ruins, unable to escape.");
				break;
		}
	} else if (status == 2) {
		switch (cm.getPlayer().getDynastyQuest("Unlocking a Hidden Power")) {
			case 0:
				cm.sendOk("If you're still curious, talk to me again to start this quest.");
				cm.getPlayer().completeDynastyQuest("Unlocking a Hidden Power");
				cm.dispose();
				break;
		}
	}
}