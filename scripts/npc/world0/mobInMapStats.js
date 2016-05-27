importPackage(Packages.server.maps);

var status = -1;

function start() { 
	var text = "You are currently in #m "+ cm.getPlayer().getMapId() +"#. What mob would you" +
			" like to inspect?\r\n";
	var mobs = cm.getPlayer().getMap().getUniqueMonsters();
	for (var x = 0; x < mobs.size(); x++)
		text += "" +
				"\r\n#b#L" + mobs.get(x) + "##o"+ mobs.get(x) +"# ("+mobs.get(x)+")";
	cm.sendSimple(text + "\r\n#L999#Exit");
}

function action(m,t,s) {
	if (m == 0 || m == -1 || s == 999)
		return;
	else
		status++;
	if (status == 0) {
		cm.sendOk(cm.getMobInfo(s));
		cm.dispose();
	}
}