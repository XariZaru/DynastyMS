var maps = [240070100, 240070200, 240070300, 240070400, 240070500, 240070600];

function start() {
	var text = "Where do you want to go?\r\n";
	for (var x = 0; x < maps.length; x++)
		text += "#L" + x + "##m" + maps[x] + "#\r\n";
	cm.sendSimple(text);
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	}
	cm.warp(maps[s], "left00");
	cm.dispose();
}