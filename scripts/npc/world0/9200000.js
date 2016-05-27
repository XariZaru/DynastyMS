var office = [980000000, 100000000, 926100203];
var boss_map = 109040000;

function start() {
	if (cm.getPlayer().getMapId() != boss_map)
		cm.sendYesNo("Would you like to go to the lobby for boss maps?");
	else 
		cm.sendYesNo("Do you wish to leave this map and go back to where you came from?");
}

function action(m, t, s, status) {
	if (cm.getPlayer().getMapId() != boss_map) {
		cm.getPlayer().saveLocation("WARPER");
		cm.warp(109040000,0);
	} else
		cm.warp(cm.getPlayer().getSavedLocation("WARPER"));
	cm.dispose();
}