/**
 *	@Event: Halloween Witch Cat and Frog
 *	@Author: iPoopMagic (David)
 */
importPackage(Packages.net.server);
importPackage(Packages.server.life);
importPackage(Packages.tools);

var townMaps = new Array(100000000, 101000000, 102000000, 103000000, 104000000, 105040300, 110000000, 120000000, // Victoria Island
                130000000, 140000000, // Ereve, Rien
                200000000, 211000000, // Orbis, El Nath
				220000000, 221000000, 222000000, // Ludi, KFT, Omega
				230000000, // Aqua
				240000000, // Leafre
				250000000, 251000000, // Mu Lung, Herb Town
				260000000, 261000000 // Ariant, Magatia
				);
var mobs = new Array(9400634, 9400636);
var stopped = false;

function init() {
	/*
    scheduleNew();
	*/
}

function scheduleNew() {
    setupTask = em.scheduleAtTimestamp("start", 1445410800000); // October 21st
    setupTask1 = em.scheduleAtTimestamp("stop", 1446883200000); // November 7th
}

function cancelSchedule() {
    if (setupTask != null)
        setupTask.cancel(true);
    if (setupTask1 != null)
        setupTask1.cancel(true);
}

function stop() {
	if (em.getChannelServer().getId() == 1) {
		Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Halloween] The event has ended! The cat and frog have been retrieved by Witch Malady."));	
	}
	stopped = true;
}

function start() {
	if (!check() && !stopped) {
		var index = Math.floor(Math.random() * townMaps.length);
		var townMap = em.getChannelServer().getMapFactory().getMap(townMaps[index]);
		var mindex = Math.floor(Math.random() * mobs.length);
		var point = new Packages.java.awt.Point(randX(townMap.getVRLeft(), townMap.getVRRight()), randY(townMap.getVRTop(), townMap.getVRBottom()));
		var mob = MapleLifeFactory.getMonster(mobs[mindex]);
		townMap.spawnMonsterOnGroundBelow(mob, point);
		Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Halloween] " + mob.getName() + " has been seen in " + townMap.getMapName() + " in Channel 1!"));
		setupTask = em.schedule("start", 6 * 60 * 60 * 1000); // Spawn every 6 hours
	} else {
		setupTask = em.schedule("check", 30 * 60 * 1000); // Check every 30 minutes
	}
}

// Needs map boundaries left and right, then picks a random one in between
function randX(bleft, bright) {
	if (bleft == bright) {
		bleft = -100;
		bright = 2000;
	}
	var lBound = bleft + 100;
	var rBound = bright - 100;
	return Randomizer.rand(lBound, rBound);
}

// Needs map boundaries top and bottom, then picks a random one in between
function randY(btop, bbottom) {
/*	if (btop == bbottom) {
		btop = 0;
		bbottom = 200;
	}
	var tBound = btop + 200;
	var bBound = bbottom - 300;
	return Randomizer.rand(tBound, bBound);*/
	return 0;
}

function check() {
	var spawned = true;
	if (em.getChannelServer().getId() == 1) { // Hmm, should we only do one channel? Idk
		for (var i = 0; i < townMaps.length; i++) {
			if (em.getChannelServer().getMapFactory().getMap(townMaps[i]).getMonsterById(9400634) != null && em.getChannelServer().getMapFactory().getMap(townMaps[i]).getMonsterById(9400635) != null &&
				em.getChannelServer().getMapFactory().getMap(townMaps[i]).getMonsterById(9400636) != null && em.getChannelServer().getMapFactory().getMap(townMaps[i]).getMonsterById(9400637) != null) {
				break;
			}
			spawned = false;
		}
		if (spawned) {
			Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Halloween] One of Witch Malady's pets has been seen in " + em.getChannelServer().getMapFactory().getMap(townMaps[i]).getMapName() + " in Channel " + em.getChannelServer().getId() + "!"));
		}
	}
	return spawned;
}