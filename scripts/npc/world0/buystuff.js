var npcs = [9201082, 9010000,9000021,9000039,1092017, 9300007];

function start() {
	cm.sendSimple("What of the following wares would you like to view?#b\r\n\r\n#L100#Go Back",
			"General Shop (Mesos)",
			"Speak with Spindle (Vote Points)",
			"Speak with Maple Administrator (NX Cash)",
			"Speak with Gaga (Maple Leaves)",
			"Speak with Agent W (Cygnus 3rd Skills)",
			"Speak with Anonymous Merchant (Boss Points)",
			"Speak with Tian Bing (Magic Powder & Crystals)");
}

function action(m,t,s,status) {
	if (m != 1) {
		cm.dispose();
		return;
	}
	
	if (status == 0) {
		switch(s) {
			// Go back
			case 100:
				cm.openNpc(9300003);
				break;
			// General Shop
			case 0:
				cm.openShop(2093002);
				break;
			// Other NPCs
			default:
				cm.openNpc(npcs[s - 1]);
				break;
		}
	}
}