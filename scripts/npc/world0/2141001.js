var status;

// These are the maps available for JQ.
var maps = [100000000,101000000,102000000,103000000];

// This array gets pushed with a chosen map's name
var mapNames = [];
var chosenMaps = [];

// Return map id
var returnMap = 910000000;
var choosing = null;
var playList = false;


function start() {
	status = -1;
	if (cm.getPlayer().getJQ() == null) {
		cm.sendSimple("Hey, #e#h ##n! I'm the JQ manager. What do you want to do?\r\n" +
					"\t\t\t\t\t#L100##bPlaylist\t\t#L101#Random#k\r\n\r\n\r\n\t\t\t\t#lForget the special modes! I want vanilla!\r\n" + sendMaps());
	} else {
		cm.getPlayer().getJQ().advanceStage();
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
		// Playlist
		if (s == 102) {
			cm.dispose();
		} else if (s == 100 || playList) {
			playList = true;
			text = "These are your currently selected maps:\r\n\t\t#b" + mapNames.join(", ") + "\r\n\r\n";
			text += "#kWhat maps do you wish to add to your playlist?" + sendMaps();
			text += "#e\r\n#L501#Clear current selections\r\n"
			text += "#L500#Start the JQ!";
			cm.sendSimple(text);
		} else {
			chosenMaps.push(maps[s == 101 ? Math.random()*maps.length : s]);
			text = s == 101 ? "You have been given a #d#erandom map#n#k to play on." : "You have selected " +
			"#e#d#m" + maps[s] + "##k#n as your current map."; 
			cm.sendSimple(text + "\r\n\r\n\t\t#L500#Enter JQ\t\t#L502#View Rankings");
		}
	} else if (status == 1) {
		if (s == 500) {
			cm.startJumpQuest(chosenMaps, returnMap);
			cm.dispose();
		} else if (s == 502) {
			cm.sendOk(cm.getRankings(chosenMaps[0]));
			cm.dispose();
		} else if (s == 501) {
			cm.sendNext("Your current playlist has been cleared.");
			chosenMaps = [];
			mapNames = [];
			status = -1;
		} else if (playList) {
			cm.sendNext("You've chosen #b#m " + maps[s] + "##k as a JQ map.");
			chosenMaps.push(maps[s]);
			mapNames.push("#m"+maps[s]+"#");
			status = -1;
		}
	}
}

function sendMaps() {
	text = "";
	for (var x = 0; x < maps.length; x++) {
		if (chosenMaps.indexOf(maps[x]) < 0) {
			text += "#L" + x + "##m" + maps[x] + "#\r\n";
		}
	}
	return text;
}
