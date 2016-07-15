importPackage(Packages.server.life);
importPackage(Packages.tools);

function start(ms) {   	 
	var text = "";
	var party = ms.getPlayer().getParty().getMembers().toArray();
	ms.getPlayer().announce(MaplePacketCreator.getClock(ms.getPlayer().getParty().getPQ().getTimeLeft() / 1000));
	if(ms.getMapId() == 925100000 || ms.getMapId() == 925100200 || ms.getMapId() == 925100300) { 
		text = "Eliminate all the monsters!";
		spawnMonsters(ms);
	} else if (ms.getMapId() == 925100100) {
		text = "Collect 20 of each mark of the pirate for me!";
	} else if (ms.getMapId() == 925100400) {
		text = "Help me find four of the pirate keys so we can lock them away!";
	}
	for (var x = 0; x < party.length; x++)
		party[x].getPlayer().startMapEffect(text, 5120020);
}

function spawnMonsters(ms) {
	var monsters, positions, amount;
	if (ms.getMapId() == 925100000) {
		amount = 25;
		monsters = [9300108, 9300109, 9300110];
		positions = [[73,242],[1,46], [-1005,48], [-1035,242], [1434,242]];
	} else if (ms.getMapId() == 925100200) {
		amount = 75;
		monsters = [9300112, 9300113];
		positions = [[338,238], [978,238], [1718,238], [1589,75], [430,76]];
	} else if (ms.getMapId() == 925100300) {
		amount = 75;
		monsters = [9300117,9300118];
		positions = [[338,238], [978,238], [1718,238], [1589,75], [430,76]];
	} else {
		amount = 75;
		monsters = [9300117,9300118];
		positions = [[338,238], [978,238], [1718,238], [1589,75], [430,76]];
	}
	for (var x = 0; x < amount; x++) {
		var point = Math.floor(Math.random() * positions.length);
		var mob = Math.floor(Math.random() * monsters.length);
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(monsters[mob], positions[point][0], positions[point][1]);
	}
}
