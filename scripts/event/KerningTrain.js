importPackage(Packages.tools);

var returnTo = new Array(103000100, 103000310);
var rideTo = new Array(103000310, 103000100);
var trainRide = new Array(103000301, 103000302);
var myRide;
var returnMap;
var map;
var docked;
var timeOnRide = 10; //Seconds
var onRide;

function init() {
}

function setup(chr) {
	var eim = em.newInstance("KerningTrain_" + chr.getName());
	return eim;
}

function playerEntry(eim, player) {
	if (player.getMapId() == returnTo[0]) {
		myRide = 0;
	} else {
		myRide = 1;
	}
	docked = eim.getEm().getChannelServer().getMapFactory().getMap(rideTo[myRide]);
    return0Map = eim.getMapFactory().getMap(returnTo[myRide]);
    onRide = eim.getMapFactory().getMap(trainRide[myRide]);
    player.changeMap(onRide, onRide.getPortal(0));
    player.getClient().getSession().write(MaplePacketCreator.getClock(timeOnRide));
    eim.schedule("timeOut", timeOnRide * 1000);
}

function timeOut(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        var player = party.get(i);
        eim.unregisterPlayer(player);
        if(player.getMapId() == trainRide[0]) {
            player.changeMap(rideTo[0]);
        } else {
            player.changeMap(rideTo[1]);
        }
    }
    eim.dispose();
}



function playerDisconnected(eim, player) {
	eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
    eim.dispose();
    return 0;
}

function cancelSchedule() {}

function dispose() {
    em.cancelSchedule();
}