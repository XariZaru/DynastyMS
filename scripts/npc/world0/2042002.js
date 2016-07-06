function start() {
	cm.sendOk("Hi! I'm Spiegelmann! I handle all of the empire's unique monsters. This will probably be the only time you'll see them!");
	cm.dispose();
	return;
	if (cm.getPlayer().getCPQParty() != null) {
		if (cm.getPlayer().getCPQParty().canGetRewards()) {
			cm.sendNext("Hey, congratulations on getting to the end of the PQ! I'll give you your exp" +
				" now.");
		} else {
			cm.sendNext("Oh boy, that wasn't fun at all. The game didn't even last #e8#n minutes!");
		}
	} else {
		cm.sendNext("Oh boy, you must have gotten lost! I'll take you out now!");
	}
}

function action(m,t,s,status) {
	if (status == 0) {
		if (cm.getPlayer().getCPQParty() != null) {
			if (cm.getPlayer().getCPQParty().canGetRewards()) {
				var fevers = Math.floor(cm.getPlayer().getCPQParty().getTotalCP() / 100) + 1;
				cm.sendOk("Here is your reward!", 15000 * fevers, 20000 * fevers);
				cm.warp(980000000,0);
				cm.getPlayer().setCPQParty(null);
				cm.dispose();
			}
		}
		cm.warp(980000000,0);
		cm.dispose();
	}
}