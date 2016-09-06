/*
 * This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300001,4001007,5);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300000,4001008,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300002,4001008,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300003,4001008,1);
*/

importPackage(Packages.world);
importPackage(Packages.client.inventory);
importPackage(Packages.java.awt);
importPackage(Packages.server.life);
var exitMap;
var minPlayers = 3;
var stage_1 = 910500100;
var stage_2 = 910500200;
var stage_3 = 105100300;

var taurospear = 9300250;
var tauromacis = 9300249;
var kills = 0;

function init() { // Initial loading.
    exitMap = em.getChannelServer().getMapFactory().getMap(105100100);
    instanceId = 1;
}



function monsterValue(eim, mobId) { // Killed monster.
	var players = eim.getPlayers().toArray();
	var player = players[0];
	if (em.getProperty("stage") == "1") {
		kills += 1;
		var mob = MapleLifeFactory.getMonster(tauromacis);
		mob.disableDrops();
		eim.registerMonster(mob);
		mob.setHp(250000);
		eim.getMapInstance(stage_1).spawnMonsterOnGroundBelow(mob, -127, 130);
		if (kills >= 100) {
			nextStage(eim);
			for (var x = 0; x < players.length; x++) {
				players[x].changeMap(eim.getMapInstance(stage_2), eim.getMapInstance(stage_2).getPortal(0));
				players[x].titleMessage("Kill the monsters until you get a Balrog Claw!");
			}
		} else
			eim.getMapInstance(stage_1).broadcastTitleMessage(kills + "/" + 100);
	} else if (em.getProperty("stage") == "2") {
		var mob = MapleLifeFactory.getMonster(mobId);
		eim.registerMonster(mob);
		mob.setHp(500000);
		eim.getMapInstance(stage_2).spawnMonsterOnGroundBelow(mob, -15, 130);
	} else if (em.getProperty("stage") == "3") {
		kills += 1;
		if (kills >= 3) {
			for (var x = 0; x < players.length; x++) {
				players[x].completeDynastyQuest("Unlocking a Hidden Power");
				eim.removePlayer(players[x]);
				players[x].dropMessage(5, "[Mu Young] Congratulations! Come talk to me for your reward!");
			}
		}
	}
    return 1; // returns an amount to add onto kill count.
}

function nextStage(eim) {
	if (em.getProperty("stage") == "1") {
		kills = 0;
		var map = eim.getMapInstance(stage_2);
		eim.getMapInstance(stage_2).instanceMapRespawn();
		map.resetAll();
		em.setProperty("stage", "2");
		respawn(eim);
	}
}

function setup() { // Invoked from "EventManager.startInstance()"
    var eim = em.newInstance("BalrogAlone"); // adds a new instance and returns EventInstanceManager.
    var eventTime = 30 * (1000 * 60); // 30 mins.
    em.schedule("timeOut", eim, eventTime); // invokes "timeOut" in how ever many seconds.
    eim.startEventTimer(eventTime); // Sends a clock packet and tags a timer to the players.
	eim.getMapInstance(stage_1).instanceMapRespawn();
	eim.getMapInstance(stage_3).instanceMapRespawn();
	eim.getMapInstance(stage_1).resetAll();
	eim.getMapInstance(stage_2).resetAll();
	kills = 0;
	em.setProperty("stage", "1");
	respawn(eim);
    return eim; // returns the new instance.
}

function playerEntry(eim, player) { // this gets looped for every player in the party.
    var map = eim.getMapInstance(stage_1);
    player.changeMap(map, map.getPortal(0)); // We're now in KPQ :D
	player.titleMessage("Kill 100 monsters!");
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) { // player presses ok on the death pop up.
    if (eim.isLeader(player) || party.size() <= minPlayers) { // Check for party leader
        var party = eim.getPlayers();
        for (var i = 0; i < party.size(); i++)
            playerExit(eim, party.get(i));
        eim.dispose();
    } else
        playerExit(eim, player);
}


function respawn(eim) {	
	if (em.getProperty("stage") == "1") {
		for (var x = 0; x < 25; x++) {
			var mob = MapleLifeFactory.getMonster(tauromacis);
			mob.disableDrops();
			eim.registerMonster(mob);
			mob.setHp(250000);
			eim.getMapInstance(stage_1).spawnMonsterOnGroundBelow(mob, -127, 130);
		}
	} else if (em.getProperty("stage") == "2") {
		for (var x = 0; x < 25; x++) {
			var mob = MapleLifeFactory.getMonster(taurospear);
			eim.registerMonster(mob);
			mob.setHp(500000);
			eim.getMapInstance(stage_2).spawnMonsterOnGroundBelow(mob, -15, 130);
		}
	}
}



function playerDisconnected(eim, player) {
    var party = eim.getPlayers();
    if (eim.isLeader(player) || party.size() < minPlayers) {
        var party = eim.getPlayers();
        for (var i = 0; i < party.size(); i++)
            if (party.get(i).equals(player))
                removePlayer(eim, player);
            else
                playerExit(eim, party.get(i));
        eim.dispose();
    } else
        removePlayer(eim, player);
}

function leftParty(eim, player) {
    var party = eim.getPlayers();
    if (party.size() < minPlayers) {
        for (var i = 0; i < party.size(); i++)
            playerExit(eim,party.get(i));
        eim.dispose();
    } else
        playerExit(eim, player);
}

function disbandParty(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, exitMap.getPortal(0));
}

function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
}

function clearPQ(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++)
        playerExit(eim, party.get(i));
    eim.dispose();
}

function allMonstersDead(eim) {
}

function cancelSchedule() {
}

function dispose(eim) {
	em.cancelSchedule();
}

function OpenKPQ() {
}

function timeOut(eim) {
    if (eim != null) {
        if (eim.getPlayerCount() > 0) {
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext())
                playerExit(eim, pIter.next());
        }
        eim.dispose();
    }
}