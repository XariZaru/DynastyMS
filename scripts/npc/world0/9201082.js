// cm.gainItem(2010000,1, false, true, 60000);
var items = [
             [5211000,2],[5360001,2],[5211048,4],[5360042,4],[5211000,24],[5360001,24]
             ];

var costs = [5,5,10,10,30,30];
var selection;

function start() {
	text = "What would you like to purchase? You currently have #r"+cm.getPlayer().getVP()+"#k vote points\r\n#b";
	for (var x = 0; x < items.length; x++) {
		text += "\r\n\r\n#L" + x + "#"+costs[x]+" Vote Points - #i" + items[x][0] + "# #b"+ (x % 2 == 0 ? "2x exp" : "2x drop/meso")+" " +
				"(" + items[x][1] + " hours)";
	}
	cm.sendSimple(text);
}

function action(m,t,s,status) {
	if (status == 0) {
		if (cm.getPlayer().getVP() < costs[s]) {
			cm.sendOk("You don't have enough vote points for this.");
			cm.dispose();
		} else {
			selection = s;
			cm.sendAcceptDecline("Are you sure you want to purchase " + costs[s] + " vote points for a" +
					" #i" + items[s][0] + "# #b" + (s % 2 == 0 ? "2x exp" : "2x drop/meso") + " " +
							"("+ items[s][1]+" hours)");
		}
	} else if (status == 1) {
		var toMilliSeconds = items[selection][1] * 60 * 60;
		cm.gainItem(items[selection][0],1,false,true,toMilliSeconds);
		cm.getPlayer().gainVP(-costs[selection]);
		cm.dispose();
	}
}