/**
 * @Name: Monster Carnival PQ
 * @Author: David
 */
importPackage(Packages.tools); 

var exitMap;
var waitingMap = 1;
var fieldMap = 2;
var reviveMap = 3;
var winnerMap = 4;
var loserMap = 5;

function init() {
	// We could invoke this method somewhere but meh
}

function setup(mapid) {
	var roomNum = (mapid % 10000) / 1000; // Room Number
    var eim = em.newInstance("MCPQ2_" + roomNum);
	// Setup the Maps
	exitMap = em.getChannelServer().getMapFactory().getMap(980030010); // Exit
	waitingMap = em.getChannelServer().getMapFactory().getMap(mapid); // Lobby
	fieldMap = em.getChannelServer().getMapFactory().getMap(mapid + (1 * 100)); // Battle Field
	fieldMap.clearAndReset(true);
	reviveMap = em.getChannelServer().getMapFactory().getMap(mapid + (2 * 100)); // Resurrection
	winnerMap = em.getChannelServer().getMapFactory().getMap(mapid + (3 * 100)); // Victorious
	loserMap = em.getChannelServer().getMapFactory().getMap(mapid + (4 * 100)); // Defeated
    eim.setProperty("red", "-1"); // Red Team = 0
    eim.setProperty("blue", "-1"); // Blue Team = 1
    eim.setProperty("forfeit", "false");
	eim.setProperty("started", "false"); // We have not started yet
	// Set-up the Revive Map Portal
	var portal = eim.getMapInstance(reviveMap.getId()).getPortal("pt00");
	portal.setScriptName("MCrevive" + roomNum);
	return eim;
}

function playerEntry(eim, player) {
	player.changeMap(eim.getMapInstance(waitingMap.getId()), eim.getMapInstance(waitingMap.getId()).getPortal(0));
	eim.openUI(waitingMap.getId(), 18);
}

function registerCarnivalParty(eim, carnivalParty) {
	if (eim.getProperty("red").equals("-1")) {
		eim.setProperty("red", carnivalParty.getLeader().getId() + "");
		eim.broadcastPlayerMsg(6, "You will receive invitations from other parties for the next 3 minutes.");
		carnivalParty.sendClock(180);
		eim.schedule("requestTimeOut", 3 * 60 * 1000); // 3 minute time-out
		//eim.startEventTimer(3 * 60 * 1000);
	} else {
		eim.setProperty("blue", carnivalParty.getLeader().getId() + "");
		eim.broadcastPlayerMsg(6, "The Monster Carnival will begin in 10 seconds!");
		carnivalParty.sendClock(10);
		eim.schedule("start", 10000); // 10 seconds
	}
	if (carnivalParty.getTotalCP() > 0 || carnivalParty.getAvailableCP() > 0) {
		carnivalParty.resetCP(); // No head starts!
	}
}

// We needed some way to easily get the character's party in the script
function getCarnivalParty(eim, property) {
	var chr = em.getChannelServer().getPlayerStorage().getCharacterById(parseInt(eim.getProperty(property)));
	if (chr == null) {
		eim.broadcastPlayerMsg(5, "The leader of the party " + property + " was not found.");
		eim.dispose();
		return null;
	} else {
		return chr.getCarnivalParty();
	}
}

function requestTimeOut(eim) {
	if (!eim.getProperty("started").equals("true")) {
		eim.dispose();
	}
}

function start(eim) {
	eim.setProperty("started", "true");
	eim.startEventTimer(10 * 60 * 1000); // 10 minutes
	getCarnivalParty(eim, "blue").warp(eim.getMapInstance(fieldMap.getId()), "blue00");
	getCarnivalParty(eim, "red").warp(eim.getMapInstance(fieldMap.getId()), "red00");
	var leader = eim.getPlayers().get(0);
	leader.getEventInstance().getMapInstance(leader.getMapId()).setDefaultCPQMonstersTeam(leader, leader.getMapId());
	eim.broadcastPlayerMsg(5, "The Monster Carnival is now underway!!");
	eim.schedule("timeOut", 10 * 60 * 1000);
}

function startCarnival(eim, chr) {
	if (!eim.getProperty("started").equals("true")) {
		eim.dispose();
	} else if (chr.getCarnivalParty().getTeam() == 0) {
		var blueParty = getCarnivalParty(eim, "blue");
		chr.startMonsterCarnival(blueParty);
	} else {
		var redParty = getCarnivalParty(eim, "red");
		chr.startMonsterCarnival(redParty);
	}
}

function timeOut(eim) {
	eim.stopEventTimer(); // Kind of redundant, but just to make sure.
	if (!eim.getProperty("started").equals("true")) {
		if (eim.getProperty("blue").equals("-1")) {
			eim.dispose();
		}
	} else {
		// Display the WIN / LOSE effect
		var blueParty = getCarnivalParty(eim, "blue");
		var redParty = getCarnivalParty(eim, "red");
    	if (blueParty.getTotalCP() > redParty.getTotalCP()) {
			blueParty.setWinner(true);
    	} else if (redParty.getTotalCP() > blueParty.getTotalCP()) {
			redParty.setWinner(true);
		}
		blueParty.displayMatchResult();
		redParty.displayMatchResult();
		eim.getMapFactory().getMap(eim.getMapInstance(fieldMap.getId())).killAllMonsters();
		eim.broadcastPlayerMsg(5, "You will be warped out in 10 seconds.");
		eim.closeUI(fieldMap.getId());
		eim.schedule("warpOut", 10000); // Wait 10 seconds before leaving
	}
}

function warpOut(eim) {
	if (!eim.getProperty("started").equals("true")) {
		if (eim.getProperty("blue").equals("-1")) {
			eim.dispose();
		}
	} else {
		var blueParty = getCarnivalParty(eim, "blue");
		var redParty = getCarnivalParty(eim, "red");
		blueParty.warpOut(blueParty.isWinner() ? winnerMap.getId() : loserMap.getId());
		redParty.warpOut(redParty.isWinner() ? winnerMap.getId() : loserMap.getId());
	}
}

function playerDead(eim, player) {
	playerRevive(eim, player);
}

function playerRevive(eim, player) {
	// Player dies: costs 10 CP
	if (player.getCarnivalParty().getAvailableCP() >= 10) {
		player.getCarnivalParty().useCP(player, 10);
	}
	player.addHP(50);
	player.announce(MaplePacketCreator.updateCP(player.getCP(), player.getObtainedCP()));
	player.announce(MaplePacketCreator.updatePartyCP(player.getCarnivalParty()));
	player.changeMap(eim.getMapInstance(reviveMap.getId()), eim.getMapInstance(reviveMap.getId()).getPortal(0));
	return true;
}

function playerDisconnected(eim, player) {
	player.setMap(eim.getMapInstance(exitMap.getId()));
	eim.broadcastPlayerMsg(5, "[" + player.getName() + "] of Team [" + (player.getCarnivalParty().getTeam() == 0 ? "Maple Red" : "Maple Blue") + "] has quit the Monster Carnival.");
	eim.unregisterPlayer(player);
	player.getCarnivalParty().removeMember(player);
	// Let the other member continue fighting solo, unless they also d/c, then end event (losers)
	if (player.getCarnivalParty() == null || player.getCarnivalParty.getMembers().size() < 1) {
		eim.closeUI(fieldMap.getId());
		eim.dispose();
	}
}

function leftParty(eim, player) {
    disbandParty(eim);
}

function disbandParty(eim) {
	eim.dispose();
}

//function dispose(eim) {
//	eim.disposeCarnivalPQ(exitMap.getId());
//	eim.dispose();
//}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.getCarnivalParty().removeMember(player);
	player.changeMap(eim.getMapInstance(exitMap.getId()), eim.getMapInstance(exitMap.getId()).getPortal(0));
}

function removePlayer(eim, player) {
	playerExit(eim, player);
}

function monsterValue(eim, mobId) {
	return 1;
}

function cancelSchedule() {
}

function allMonstersDead(eim) {
	eim.getMapInstance(fieldMap.getId()).instanceMapRespawn();
}