importPackage(Packages.server.life);

function start(ms) {   	       
	var maps = [925100000, 925100200, 925100300];
	if(maps.indexOf(ms.getMapId()) != -1) { 
		ms.getPlayer().startMapEffect("Kill all the monsters!", 5120020);
	} else if (ms.getMapId() == 925100100) {
		ms.getPlayer().startMapEffect("Collect 20 of each mark!", 5120020);
	} else if (ms.getMapId() == 925100400) {
		ms.getPlayer().startMapEffect("Collect 4 pirate keys and give them to me!", 5120020);
	}
}