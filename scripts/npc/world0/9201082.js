// Messy as heck and not really nice to look at

var items = {5220000: [1, -1], 999: [2, -1], 1122017: [4, 3], 3010013: [60, -1], 3010047: [100, -1]};
var selection;
var amount;

function start() {
	text = "What would you like to purchase? You currently have #r"+cm.getPlayer().getVP()+"#k vote points\r\n#b";
	for (var item in items) {
		text += "\r\n#L" + item + "#"+items[item][0]+" Vote Points - "+(item != 999 ? "#z"+item+"#" : "2,000 NX")+" ("+(items[item][1] == -1 ? "permanent" : items[item][1] + " hours")+")";
	}
	cm.sendSimple(text);
}

function action(m,t,s,status) {
	if (status == 0) {
		selection = s;
		cm.sendGetNumber("How many do you wish to purchase?\r\n", 1, 1, 99);
	} else if (status == 1) {
		if (cm.getPlayer().getVP() < (items[selection][0] * s)) {
			cm.sendOk("You don't have enough vote points for this.");
			cm.dispose();
		} else {
			amount = s;
			cm.sendAcceptDecline("Are you sure you want to spend " + (s * items[selection][0]) + " vote points for #b"+(selection != 999 ? ""+s+" #z" + selection + "#" : (2000 * s) + " NX")+"#k ("+(items[selection][1] == -1 ? "permanent" : items[selection][1] + " hours")+")?");
		}
	} else if (status == 2) {
		if (selection == 999) {
			cm.getPlayer().gainNX(2000 * amount);
			cm.getPlayer().dropMessage(5, "You have gained "+amount * 2000+" NX");
			cm.getPlayer().addVP(-items[selection][0] * amount);
			cm.dispose();
			return;
		}
		var toMilliSeconds = items[selection][1] == - 1 ? -1 : items[selection][1] * 60 * 60 * 1000;
		cm.gainItem(selection,amount,false,true,toMilliSeconds);
		cm.getPlayer().addVP(-items[selection][0] * amount);
		cm.dispose();
	}
}
