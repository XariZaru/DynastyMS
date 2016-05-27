var victoriaIsland = [[100000000],[101000000],[102000000],[103000000],[105040300],[120000000],
                      [110000000],[104000000]];
var orbis = [[200000000],[211000000],[230000000],[]];
var ludibrium = [[220000000],[221000000],[222000000],[]];
var maps;
var selection;
var item = 4021010; 
var cost = 1;

function start() {
	mapId = cm.getPlayer().getMapId();
	if (cm.getLevel() <= 10) {
		cm.sendOk("You can't use my transportation services until you're at least level 1.");
	} else {
		text = "Where would you like to go? The availability of areas change depending on what" +
				" continent you're currently on.\r\n\r\n#eFee is " + cost + "#n #i"+item+"#\r\n" +
				"#r#eCurrent Available Areas:#n\r\n#b#L100#Talk with Yue Lao (Helper)\r\n#L0##m910000000# (Free)\r\n";
		
		// Choices according to continent and region
		
		maps = 	mapId < 200000000 ? victoriaIsland : 
				mapId >= 200000000 && mapId < 220000000 || mapId >= 230000000 && mapId < 240000000 ? orbis :
				mapId >= 220000000 && mapId < 230000000 ? ludibrium :
				victoriaIsland;
			
		addMapNames(maps);
		text += listMaps(maps);
		cm.sendSimple(text);
	}
}

function listMaps(maps) {
	text = "";
	for (var x = 0; x < maps.length; x++) {
		text += "#L" + (x+1) + "#" + maps[x][1] + "\r\n";
	}
	return text;
}

function addMapNames(maps) {
	for (var x = 0; x < maps.length; x++) {
		maps[x].push("#m" + maps[x][0] + "#");
	}
}

function action(m,t,s, status) {
	if (m != 1) {
		cm.dispose()
		return;
	}
	if (status == 0) {
		if (s == 0) {
			cm.getPlayer().saveLocation("FREE_MARKET");
			cm.warp(910000000);
		} else if (s == 100) {
			cm.openNpc(9300003);
			cm.dispose();
		} else if (!cm.haveItem(item, cost)) {
			cm.sendOk("You don't have enough #e#z"+item+"##n to purchase this ride.");
			cm.dispose();
		} else {
			cm.sendAcceptDecline("Are you sure you want to go to #b" + maps[s-1][1] + "#k? It will cost" +
					" #e"+ cost +"#n #e#z"+item+"##n.");
			selection = s;
		}
	} else if (status == 1) {
		cm.gainItem(item, -1, false, true);
		cm.warp(maps[selection-1][0]);
		cm.dispose();
	}
}