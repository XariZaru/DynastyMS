importPackage(Packages.server.life);
importPackage(Packages.server.maps);
var status = -1;

// Maps that the bosses will spawn on and their respective names
var maps = [280030000,109060005,109060005,109060005,109060005,109060005,109060005,109060005];
var mobs = [8800000,9400575,9400549,9400121,9400300,8510000,8500001,8820001];
var mob_names = ["Zakum", "Bigfoot", "Headless Horseman", "Anego", "The Boss", "Pianus", "Papulatus Clock", "Pink Bean"];

// Default map you warp back to after you're done and the default map for bosses if not specified otherwise
// Min party limit to do a boss run
var default_boss_map = 109060005;
var lobby_map = 109040000;
var req_party_size = 1;

// Coordinates for the monster to spawn
var x = 116, y = 154;

function start() {
	// If in the boss map
	if (cm.getPlayer().getMapId() == default_boss_map || cm.getPlayer().getMapId() == 280030000) {
		cm.sendYesNo("Do you wish to be taken out of this map?");
	// If in lobby
	} else {
		var txt = "Which boss do you wish to fight today? You'll need a party of at least 2 people in order to participate!\r\n\r\n";
		for (var x = 0; x < mobs.length; x++)
			txt += "#L" + x + "#" + mob_names[x] + "\r\n";
		cm.sendSimple(txt);
	}
}

function action(m,t,s) {
	if (m < 1) {
		cm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
		// Warp out if in boss map
		if (cm.getPlayer().getMapId() == default_boss_map || cm.getPlayer().getMapId() == 280030000) {
			cm.warp(109040000);
			cm.dispose();
		// No party
		} else if (cm.getParty() == null) {
			cm.sendOk("You must be in a party to start the party quest!");
			cm.dispose();
		// Party size too small
		} else if (cm.getParty().getMembers().size() < req_party_size) {
			cm.sendOk("You must have at least 2 members in a party to participate.");
			cm.dispose();
		// Otherwise, good to go
		} else {
			// If map is empty, then green light
			if (isFree(cm, maps[s])) {
				// Checks if any players have already hit their max for the day
				cannot_boss = cannotBoss(cm.getPlayer().getParty(), mob_names[s]);
				if (cannot_boss.length > 0) {
					var txt = "You cannot enter and fight " + mob_names[s] + ". Someone in your party has fought this boss too many times this week.\r\n";
					for (var x = 0; x < cannot_boss.length; x++)
						txt += "\r\n" + cannot_boss[x];
					cm.sendOk(txt);
					cm.dispose();
					return;
				}
				
				// Level check to see if players are within 15 levels of average level of party
				level_check = levelCheck(cm.getPlayer().getParty());
				if (level_check.length > 0) {
					var txt = "You cannot enter and fight " + mob_names[s] + ". Someone in your party is 15 levels below or above the average party level. #eAverage party level: "+averagePartyLevel(party)+"#n\r\n";
					for (var x = 0; x < cannot_boss.length; x++)
						txt += "\r\n" + cannot_boss[x];
					cm.sendOk(txt);
					cm.dispose();
					return;
				}
				
				// Record stuff and warp + boss
				cm.getPlayer().addBossAttempt(mob_names[s]);
				cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(maps[s]).resetAll();
				cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(maps[s]).warpEveryone(lobby_map);
				cm.warpParty(maps[s]);
				// Eye of Zak for those who want to fight Zak
				if (s == 0) { 
					if (!cm.haveItem(4001017))
						cm.gainItem(4001017);
				// Otherwise, the other bosses
				} else {
					var mob = MapleLifeFactory.getMonster(mobs[s]);
					mob.givesBossPoints(true);
					mob.addPartyListener(cm.getParty());
					cm.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, 116, 154);
				}
			// Map is full
			} else {
				cm.sendOk("The map is currently not free at the moment.");
			}
			cm.dispose();
		}
	}
}

// If players still have boss attempts
function cannotBoss(party, boss) {
	var members = party.getMembers().toArray();
	var cannot_boss = [];
	for (var x = 0; x < members.length; x++)
		if (members[x].getPlayer().getBossAttempt(boss) >= 3)
			cannot_boss.push(members[x].getPlayer().getName());
	return cannot_boss;
}

// Average party level
function averagePartyLevel(party) {
	var members = party.getMembers().toArray();
	var level = 0;
	for (var x = 0; x < members.length; x++)
		level += members[x].getPlayer().getLevel();
	return Math.floor(level / members.length);
}

// Level check for whole party
function levelCheck(party) {
	var members = party.getMembers().toArray();
	var outliers = [];
	
	for (var x = 0; x < members.length; x++)
		if (Math.abs(averagePartyLevel(party) - members[x].getPlayer().getLevel()) >= 15)
			outliers.push(members[x].getPlayer());
	return outliers;
}

// People be bossin' or nah
function isFree(cm, mapid) {
	return cm.getPlayerCount(mapid) == 0 || 
		cm.getPlayerCount(mapid) == 0 && cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(mapid).countMobs() < 1;
}


/*
var info = [
        "You need to gather the correct number of players for each room and then enter. When you've " +
			"entered, then another party with an equal number of players can come to challenge you by talking " +
			"to me. If you accept their request, then I'll warp you both in and start the PQ. Sound fun?",
		"You get good EXP from the monsters that you kill while inside, and for each monster you kill your" +
		" party gets points toward a fever time. When you've reached enough points for fever time, the exp" +
		" of the monsters are multiplied by 2x for 30 seconds.\r\n\r\nYou also get a second type of points" +
		" that allow you to spend on some monsters to summon on the opponent's side. It's a win-win for both" +
		" sides! At the end, based on the number of monsters you kill your party will be rewarded a specific" +
		" amount of EXP based on your performance. Sound fun?"];
var rooms = [980000100,980000300,980000500];
var challenger = false;
var selection;
var leadersInMap;

function start() {
	if (cm.getParty()==null) {
		cm.sendAcceptDecline("Welcome to the Dynasty's #bCustom CPQ#k! It's such a delight having you folk come by " +
				"and seem so interested in this new invention. Come close, come close! I'll tell you all about it " +
				"if you like.");
	} else if (!cm.isLeader()) {
		cm.sendOk("You must be the leader to choose an option.");
		cm.dispose();
	} else {
		text = "Here's a list of the currently available rooms for PQing.#b\r\n";
		for (var x = 0; x < rooms.length; x++) {	
			var leaders = cm.getPartyLeaders(rooms[x]).toArray();
			if (cm.getPlayerCount(rooms[x] + 1) < 1) {
				text += "#L" + x + "##m" + rooms[x] + "# ("+(leaders.length == 0 ? "Free" : leaders.length > 1 ?
						"Full" : ""+leaders[0]+"'s party")+")\r\n";
			}
		}
		cm.sendSimple(text);
		//cm.sendSimple(text);
	}
}

function action(m,t,s,status) {
	if (status == 0) {
		if (cm.getParty()==null) {
			cm.sendSimple("What would you like to read about o' boy?#b\r\n", "How do I play?", "What are my rewards?");
		} else {
			if (cm.getPlayerCount(rooms[s]) < 1) {
				cm.warpParty(rooms[s]);
				cm.createCPQParty();
				cm.dispose();
			} else {
				challenger = true;
				selection = s;
				if (cm.getPartyCount(rooms[s]) > 1) {
					cm.sendOk("This room is full. Please try another room or wait a little.");
					cm.dispose();
				} else {
					cm.sendAcceptDecline("The party inside is composed of these members. Would you like to request an" +
						" invitation to CPQ?:\r\n\r\n#b" + cm.getMap(rooms[selection]).getParties().toArray()[0].getReadableMembers());
				}
			}
		}
	} else if (status == 1) {
		if (!challenger) {
			cm.sendNext(info[s]);
		} else {
			leader = cm.getPartyLeaders(rooms[selection]).toArray()[0];
			leader.getCPQParty().sendRequest(cm.getParty());
			cm.openNpcForPlayer(leader.getName(), 2042000, "beginPQ");
		}
	} else if (status == 2) {
		cm.sendOk("So form a party and check out what rooms are currently available!");
		cm.dispose();
	}
}
*/