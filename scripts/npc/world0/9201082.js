// Messy as heck and not really nice to look at

var items = {5220000: [1, -1], 999: [2, -1], 1122017: [4, 3], 3010013: [60, -1], 3010047: [100, -1]};
var selection;

function start() {
	text = "What would you like to purchase? You currently have #r"+cm.getPlayer().getVP()+"#k vote points\r\n#b";
	for (var item in items) {
		text += "\r\n#L" + item + "#"+items[item][0]+" Vote Points - "+(item != 999 ? "#z"+item+"#" : "2,000 NX")+"";
	}
	cm.sendSimple(text);
}

function action(m,t,s,status) {
	if (status == 0) {
		if (cm.getPlayer().getVP() < items[s][0]) {
			cm.sendOk("You don't have enough vote points for this.");
			cm.dispose();
		} else {
			selection = s;
			cm.sendAcceptDecline("Are you sure you want to spend " + items[s][0] + " vote points for #b"+(s != 999 ? "#z" + s + "#" : "2,000 NX")+"#k?");
		}
	} else if (status == 1) {
		if (selection == 999) {
			cm.getPlayer().gainNX(2000);
			cm.getPlayer().dropMessage(5, "You have gained 2,000 NX");
			cm.getPlayer().addVP(-items[selection][0]);
			cm.dispose();
			return;
		}
		var toMilliSeconds = items[selection][1] == - 1 ? -1 : items[selection][1] * 60 * 60 * 1000;
		cm.gainItem(selection,1,false,true,toMilliSeconds);
		cm.getPlayer().addVP(-items[selection][0]);
		cm.dispose();
	}
}