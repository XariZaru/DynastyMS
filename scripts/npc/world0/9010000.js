var status = -1;
var selected_item = null;

// Format is itemid: [cost, expiration (hours)]
// REMINDER: Don't forget to calculate hours to milliseconds below
var purchases = {5030000: [20000, 5], 5030008: [30000, 5], 5030002: [30000, 5], 5030004: [30000, 5], 5030010: [40000, 5]};

function start() {
	var text = "Which of the following purchases would you like?\r\n";
	for (var item in purchases)
		text += "#L"+item+"##b#i" + item + "# "+(purchases[item][1] != -1 ? "("+purchases[item][1]+" days)" : "")+" - "+ purchases[item][0] +" NX#l\r\n";
	cm.sendSimple(text);
}

function action(m,t,s) {
	if (m != 1) {
		cm.sendOk("What a shame! If you ever want to purchase something, just talk to me again through the @helper!");
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		selected_item = s;
		cm.sendYesNo("Is this the purchase you would like to make?\r\n\r\n#b#i" + s + "# "+(purchases[s][1] != -1 ? "("+purchases[s][1]+" days)" : "")+" for " + purchases[s][0] + " NX");
	} else if (status == 1) {
		if (cm.getPlayer().getCashShop().getCash(1) < purchases[selected_item][0]) {
			cm.sendOk("You don't have enough NX cash for this purchase. Please check your amount again.");
		} else if (!cm.canHold(selected_item)) {
			cm.sendOk("You need more space in your inventory to hold this item.");
		} else {
			cm.sendOk("You have completed your purchase of #i" + selected_item + "#. Have a nice day!");
			cm.getPlayer().gainNX(-purchases[selected_item][0]);
			cm.gainItem(selected_item, 1, true, true, purchases[selected_item][1] != -1 ? purchases[selected_item][1] * 24 * 60 * 60 * 1000: -1);
			cm.getPlayer().dropMessage(5, "You have " + cm.getPlayer().getCashShop().getCash(1) + " NX cash remaining.");
		}
		cm.dispose();
	}
}