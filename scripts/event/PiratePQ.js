importPackage(java.lang);
importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server.maps);
importPackage(Packages.server.life);
importPackage(Packages.scripting.npc);

var exitMap;
var instanceId;
var minPlayers = 1;

function init() {
    instanceId = 1;
}



function monsterValue(eim, mobId) {
    return 1;
}

function setup() {
    instanceId = em.getChannelServer().getInstanceId();
    exitMap = em.getChannelServer().getMapFactory().getMap(920011200); //Teh exit map :) <---------t
    var eim = em.newInstance("PiratePQ");
    var mf = eim.getMapFactory();
    var map = mf.getMap(920010000);
    eim.setProperty("killedCellions", "0");
    eim.setProperty("papaSpawned", "no");
    em.schedule("timeOut", 60 * 60000);
    em.schedule("broadcastClock", 1500);
    eim.setProperty("entryTimestamp",System.currentTimeMillis() + (60 * 60000));
	
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(920010000);
    player.dropMessage("You have registered for the PQ.");

}

function playerDead(eim, player) {
}

function playerRevive(eim, player) {
    if (eim.isLeader(player)) { //check for party leader
        //boot whole party and end
        var party = eim.getPlayers();
        for (var i = 0; i < party.size(); i++) {
            playerExit(eim, party.get(i));
        }
        eim.dispose();
    }
    else { //boot dead player
        // If only 5 players are left, uncompletable:
        var party = eim.getPlayers();
        if (party.size() <= minPlayers) {
            for (var i = 0; i < party.size(); i++) {
                playerExit(eim,party.get(i));
            }
            eim.dispose();
        }
        else
            playerExit(eim, player);
    }
}

function playerDisconnected(eim, player) {
    if (eim.isLeader(player)) { //check for party leader
        //PWN THE PARTY (KICK OUT)
        var party = eim.getPlayers();
        for (var i = 0; i < party.size(); i++) {
            if (party.get(i).equals(player)) {
                removePlayer(eim, player);
            }
            else {
                playerExit(eim, party.get(i));
            }
        }
        eim.dispose();
    }
    else { //KICK THE D/CED CUNT
        // If only 5 players are left, uncompletable:
        var party = eim.getPlayers();
        if (party.size() < minPlayers) {
            for (var i = 0; i < party.size(); i++) {
                playerExit(eim,party.get(i));
            }
            eim.dispose();
        }
        else
            playerExit(eim, player);
    }
}

function leftParty(eim, player) {			
    // If only 5 players are left, uncompletable:
    var party = eim.getPlayers();
    if (party.size() <= minPlayers) {
        for (var i = 0; i < party.size(); i++) {
            playerExit(eim,party.get(i));
        }
        eim.dispose();
    }
    else
        playerExit(eim, player);
}

function disbandParty(eim) {
    //boot whole party and end
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.cancelAllBuffs(); //We don't want people going out with wonky blessing >=(
    player.changeMap(exitMap, exitMap.getPortal(0));
}

//Those offline cuntts
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
}

function clearPQ(eim) {
    // W00t! Bonus!!
    var iter = eim.getPlayers().iterator();
    var bonusMap = eim.getMapInstance(920011100);
    while (iter.hasNext()) {
        var player = iter.next();
        player.changeMap(bonusMap, bonusMap.getPortal(0));
        eim.setProperty("entryTimestamp",System.currentTimeMillis() + (1 * 60000));
        player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock(60));
    }
    eim.schedule("finish", 60000)
}

function finish(eim) {
    var dMap = eim.getMapInstance(920011300);
    var iter = eim.getPlayers().iterator();
    while (iter.hasNext()) {
        var player = iter.next();
        eim.unregisterPlayer(player);
        player.changeMap(dMap, dMap.getPortal(0));
    }
    eim.dispose();
}

function allMonstersDead(eim) {
//Open Portal? o.O
}

function cancelSchedule() {
}

function timeOut() {
    var iter = em.getInstances().iterator();
    while (iter.hasNext()) {
        var eim = iter.next();
        if (eim.getPlayerCount() > 0) {
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext()) {
                playerExit(eim, pIter.next());
            }
        }
        eim.dispose();
    }
}

function playerClocks(eim, player) {
    if (player.getMap().hasTimer() == false){
        player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock((Long.parseLong(eim.getProperty("entryTimestamp")) - System.currentTimeMillis()) / 1000));
    //player.getMap().setTimer(true);
    }
}

function playerTimer(eim, player) {
    if (player.getMap().hasTimer() == false) {
        player.getMap().setTimer(true);
    }
}

function broadcastClock(eim, player) {
    //var party = eim.getPlayers();
    var iter = em.getInstances().iterator();
    while (iter.hasNext()) {
        var eim = iter.next();
        if (eim.getPlayerCount() > 0) {
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext()) {
                playerClocks(eim, pIter.next());
            }
        }
    //em.schedule("broadcastClock", 1600);
    }
    // for (var kkl = 0; kkl < party.size(); kkl++) {
    // party.get(kkl).getMap().setTimer(true);
    // }
    var iterr = em.getInstances().iterator();
    while (iterr.hasNext()) {
        var eim = iterr.next();
        if (eim.getPlayerCount() > 0) {
            var pIterr = eim.getPlayers().iterator();
            while (pIterr.hasNext()) {
                //playerClocks(eim, pIter.next());
                playerTimer(eim, pIterr.next());
            }
        }
    //em.schedule("broadcastClock", 1600);
    }
    em.schedule("broadcastClock", 1600);
}

function dispose() {

}