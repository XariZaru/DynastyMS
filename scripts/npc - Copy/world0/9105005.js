/* 
--Happyville Teleporter--
	-- Happyville Maps --
209000000
209080000
209080100
209000100
*/

var status;
var maps = [209080000, 209000100, 209080100];
var home;

function start() {
	status = -1;
	(cm.getMapId()==209000000 ? home = true : home = false);
	text = "I'm #bHappyville's#k town cabbie. Where would you like to go?#b";
	for (var i = 0; i < maps.length; i++)
	text += "\r\n#L"+i+"##m"+maps[i]+"#";
	(home == true ? cm.sendSimple(text) : cm.sendYesNo("Would you like to return to #bHappyville#k?"));
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
	(home == true ? cm.warp(maps[selection]) : cm.warp(209000000));
	cm.dispose();
	}
}
