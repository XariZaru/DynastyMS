var status = -1;

function start() {
	if (cm.getPlayer().getDynastyQuest("Unlocking a Hidden Power") == 5) {
		cm.sendOk("What's this? #bKing Pepe#k has found someone that will help us in our endeavor? Jolly! Here, take this and bring it back to him with speedy agility.");
		cm.gainItem(4031099, 1);
		cm.getPlayer().completeDynastyQuest("Unlocking a Hidden Power");
		cm.dispose();
	} else {
		cm.sendOk("There's a ton of untold mysteries down inside #bSleepywood#k. I shudder when I think of the people trapped down there.");
		cm.dispose();
	}
}