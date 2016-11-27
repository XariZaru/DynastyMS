/**
 * @Author: iPoopMagic (David)
 */
importPackage(Packages.server.life);

var minPlayers = 2;
var exitMap;
var firstMap = 240050100; // Room of Maze
var secondMap; // 1st Room of Maze
var thirdMap; // 2nd Room of Maze
var fourthMap; // 3rd Room of Maze
var fifthMap; // 4th Room of Maze
var sixthMap; // 5th Room of Maze
var seventhMap; // Cave of Choice
var eighthMap; // Cave of Light
var ninethMap; // Cave of Darkness
var finishMap;

function init() {
	em.setProperty("state", "0");
}

function setup() {
    em.setProperty("state", "1");
    var eim = em.newInstance("HorntailPQ_" + em.getProperty("channel"));
  
    exitMap = em.getChannelServer().getMapFactory().getMap(240050000);
    finishMap = em.getChannelServer().getMapFactory().getMap(240050400);
  
    eim.schedule("respawn", 10000);
    eim.schedule("scheduledTimeout", 30 * 60 * 1000);
    eim.startEventTimer(30 * 60 * 1000); //30 mins
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(firstMap);
    player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {
    if (eim != null) {
        if (eim.getPlayerCount() > 0) {
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext())
                playerExit(eim, pIter.next());
        }
        eim.dispose();
    }
}

function changedMap(eim, player, mapid) {
    if (mapid < 240050100 || mapid > 240050310) {
		eim.unregisterPlayer(player);
		player.changeMap(exitMap, exitMap.getPortal(0));
	} else if (eim.getPlayerCount() < 1) {
		end(eim);
    }
}

function playerDisconnected(eim, player) {
	removePlayer(eim, player);
	if (eim.getPlayerCount() < minPlayers) {
		end(eim);
	}
}


function playerRevive(eim, player) {
	if (eim.isLeader(player)) {
		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++)
			playerExit(eim, party.get(i));
		eim.dispose();
	}
	else
		playerExit(eim, player);
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, exitMap.getPortal(0));
    if (eim.getPlayerCount() < minPlayers) {
		end(eim);
	}
}

function playerFinish(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(finishMap, finishMap.getPortal(0));
}

function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
}

function clearPQ(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerFinish(eim, party.get(i));
    }
    end(eim);
}

function leftParty(eim, player) {
	playerExit(eim, player);
}

function disbandParty(eim) {
	var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++)
        playerExit(eim, party.get(i));
    end(eim);
}

function respawn(eim) {
    var caveLight = eim.getMapInstance(240050300);
    var caveDark = eim.getMapInstance(240050310);
    if(eim.getProperty("stopRespawn") == null) {
        caveLight.respawn();
        caveDark.respawn();
        
        eim.schedule("respawn", 10000);
    }
       
}

function end(eim) {
	em.setProperty("state", "0");
	eim.dispose();
}

function monsterValue(eim, mobId) {
    return 1;
}
function allMonstersDead(eim) {}
function cancelSchedule() {}