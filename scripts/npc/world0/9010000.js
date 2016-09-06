var status = -1;
var selected_item = null;
var amount = null;

// Format is itemid: [cost, expiration (hours)]
// REMINDER: Don't forget to calculate hours to milliseconds below
var purchases = {5030000: [10000, 15], 5030008: [15000, 15], 5030002: [15000, 15], 5030004: [15000, 15], 5030010: [20000, 15], 5220000: [3000, -1]};

function start() {
	var text = "Which of the following purchases would you like? Gachapon tickets are purchased with #eNX prepaid#n, which is only obtainable from monsters:\r\n";
	for (var item in purchases)
		text += "#L"+item+"##b#i" + item + "# ("+(purchases[item][1] != -1 ? ""+purchases[item][1]+" days" : "permanent")+") - "+ purchases[item][0] +" NX#l\r\n";
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
		cm.sendGetNumber("How many would you like to buy?", 1, 1, 99);
	} else if (status == 1) {
		amount = s;
		cm.sendYesNo("Is this the purchase you would like to make?\r\n\r\n#b"+amount+" #i" + selected_item + "# "+(purchases[selected_item][1] != -1 ? "("+purchases[selected_item][1]+" days)" : "")+" for " + purchases[selected_item][0] * amount + " NX");
	} else if (status == 2) {
		if (selected_item == 5220000) { // Gachapon Tix
			if (cm.getPlayer().getCashShop().getCash(4) < purchases[selected_item][0] * amount) {
				cm.sendOk("You don't have enough #eNX prepaid#n for this purchase. Please check your amount again.");
			} else if (!cm.canHold(selected_item)) {
				cm.sendOk("You need more space in your inventory to hold this item.");
			} else {
				cm.sendOk("You have completed your purchase of #i" + selected_item + "#. Have a nice day!");
				cm.getPlayer().getCashShop().gainCash(4, -purchases[selected_item][0] * amount);
				cm.gainItem(selected_item, amount, true, true, purchases[selected_item][1] != -1 ? purchases[selected_item][1] * 24 * 60 * 60 * 1000: -1);
				cm.getPlayer().dropMessage(5, "You have " + cm.getPlayer().getCashShop().getCash(4) + " NX prepaid remaining.");
			}
		} else if (cm.getPlayer().getCashShop().getCash(1) < purchases[selected_item][0]) {
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