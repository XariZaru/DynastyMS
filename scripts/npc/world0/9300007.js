var status = -1;
var merchandise = [
			{4260000: 50000, 4260001: 50000, 4260002: 50000}, // basic monster
			{4260003: 200000, 4260004: 200000, 4260005: 200000},  // intermediate
			{4260006: 1000000, 4260007: 3000000, 4260008: 1500000}, // advanced
			{4007000: 100000, 4007001: 100000, 4007002: 100000, 4007003: 100000, 4007004: 100000, 4007005: 100000, 4007006: 100000, 4007007: 100000} // magic powder
			];
var items;
var chosen_item;
var chosen_amount;

function start() {
	var text = "Hey there! What purchase would you like to make?\r\n";
	cm.sendSimple(text, "Basic Monster Crystals", "Intermediate Monster Crystals", "Advanced Monster Crystals", "Magic Powders");
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		items = merchandise[s];
		var text = "What would you like to purchase?\r\n\r\n";
		for (var item in items)
			text += "#L"+item+"##i" + item + "# #z"+item+"# - " + items[item] + " mesos\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		chosen_item = s;
		cm.sendGetNumber("How many of this would you like to buy? Each #b#z"+s+"##k is " + items[chosen_item] + " mesos", 1, 1, 999);
	} else if (status == 2) {
		chosen_amount = s;
		cm.sendYesNo("Are you sure you would like to buy " + s + " #b#z"+chosen_item+"##k for a total of "+chosen_amount * items[chosen_item]+" mesos?");
	} else if (status == 3) {
		bill = items[chosen_item] * chosen_amount;
		if (cm.getMeso() < bill) {
			cm.sendOk("You lack the funds to purchase this transaction.");
			cm.dispose();
		} else if (!cm.canHold(chosen_item)) {
			cm.sendOk("You need more inventory space in order to purchase this item. Check your inventory first.");
			cm.dispose();
		} else {
			cm.sendOk("You've completed your purchase. Thank you and please come again!");
			cm.gainItem(chosen_item, chosen_amount);
			cm.gainMeso(-bill);
			cm.dispose();
		}
	}
}