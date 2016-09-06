/*
Coded By: Jonathan Nguyen
Date: 5/19/2016
Description: Boss Rewards NPC that exchanges boss points for items/equipment. Only specific items can be purchased here as well. 


*/

importPackage(Packages.net.server);
importPackage(Packages.tools);

var status = -1;
var pq_map = 109040000;
var currency_id = 4031229;

// Array values are price and expiration
var etc 	  =	{5220000:[5000,-1],5510000:[1000,-1],5130000:[1000, -1]};
var usables   =	{5050000:[100,-1],5570000:[10000,-1],5450000:[1000, 86400000]};
var currency  =	{4031229:[10000,-1]};
var equipment = {1112408:[5000, -1], 1122012: [250000,-1], /*1112401: [2000000, -1]*/};
var upgradable_stuff = [1112408];

// Custom equipment stats using cm.gainEpicItem()
var equipment_stats = {1122012:[15,15,15,15,5,5,5] /*1112401:[50,50,50,50,50,50,0]*/, 1112408: [1,1,1,1,1,1,0]};
var eq = null;

var selections = null;
var to_buy = null;
var amount = null;

function start() {
	var map = cm.getPlayer().getMapId();
	// For GMs to do some testing
	if (cm.getPlayer().isGM() && cm.getPlayer().getBossPoints() < 1000000)
		cm.getPlayer().gainBossPoints(1000000);
	else
		// Categories
		cm.sendSimple("You currently have #b" + cm.getPlayer().getBossPoints() + "#k points. What do you want to buy?"+
							"\r\n\r\n#L0#Usables\r\n#L3#NX Cash\r\n#L1#Etc\r\n#L2#Equipment\r\n#L5#Upgrade Equipment");
}

function action(m,t,s) {
	if (m < 1 || s == 999) {
		cm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
		// Currency exchange 1
		if (s == 4) {
			to_buy = s;
			cm.sendGetNumber("How many would you like to exchange?", cm.itemQuantity(currency_id), 0, cm.itemQuantity(currency_id));
		} else if (s == 3) {
			to_buy = s;
			cm.sendGetNumber("How much NX cash do you want? It is a 1 to 1 currency exchange, so 1 boss point is equal to 1 NX cash.", 1, 1, 999999);
		} else if (s == 5) {
			cm.openNpc(cm.getNpc(), "upgradeEquipment");
			return;
		// Other categories and items
		} else {
			selections = (s == 0 ? usables : s == 1 ? etc : s == 2 ? equipment : s == 3 ? currency : currency);
			cm.sendSimple("What do you wish to buy?\r\n\r\n" + listItems(selections));
		}
	} else if (status == 1) {
		// NX Cash
		if (to_buy == 3) {
			if (cm.getPlayer().getBossPoints() < s) {
				cm.sendOk("You need more boss points for this purchase.");
				cm.dispose();
			} else {
				amount = s;
				cm.sendYesNo("Would you like to purchase #b" + s +  "#k NX cash for #b" + s + "#k boss points?");
			}
		// How many of chosen item player wishes to purchase (not equipment)
		} else if (selections != equipment) {
			to_buy = s;
			cm.sendGetNumber("How many of this would you wish to buy? You currently have #b" + cm.getPlayer().getBossPoints() + "#k points.\r\n",1,1,100);
		} else {
			// Purchasing equipment (show equipment info)
			to_buy = s;
			eq = equipment_stats[s] == null ? cm.getItem(s) : cm.createEpicItem(s, equipment_stats[s][0],
					equipment_stats[s][1],equipment_stats[s][2],
					equipment_stats[s][3],equipment_stats[s][4],
					equipment_stats[s][5], equipment_stats[s][6]);
			eq.setFlag(8);
			cm.sendSimple("These are the item's stats. Do you still wish to buy it?\r\n\r\n" + cm.getEquipInfo(eq));
		}
	} else if (status == 2) {
		if (to_buy == 3) {
			cm.getPlayer().gainNX(amount);
			cm.getPlayer().dropMessage(5, "You have gained " + amount + " NX cash in this transaction.");
			losePoints(cm.getPlayer(), -amount);
			cm.dispose();
		// Finalize purchase equipment
		} else if (selections == equipment) {
			if (cm.getPlayer().getBossPoints() >= selections[to_buy][0]) {
				cm.sendOk("You've completed your purchase. Thank you for shopping with us today!");
				cm.gainEquip(eq, selections[to_buy][1]);
				losePoints(cm.getPlayer(), -selections[to_buy][0]);
			} else {
				cm.sendOk("You don't have enough points to purchase this.");
			}
		// Finalize purchase item 
		} else if (cm.getPlayer().getBossPoints() >= selections[to_buy][0] * s) {
			cm.sendOk("You've purchased " + s + " #b#z" + to_buy + "##k for " + selections[to_buy][0] * s + " points.");
			losePoints(cm.getPlayer(), -selections[to_buy][0] * s);
			cm.gainItem(to_buy, s, false, true, selections[to_buy][1]);
		// Not enough points
		} else {
			cm.sendOk("You don't have enough boss points to purchase these items.");
		}
		cm.dispose();
	}
}

// Boss Point calculation and message
function losePoints(player, to_lose) {
	player.getClient().announce(MaplePacketCreator.earnTitleMessage(to_lose + " boss points"));
	player.dropMessage(5, "You have gained " + to_lose + " boss points.");
	player.gainBossPoints(to_lose);
}

// Easy item listing in string form
function listItems(items) {
	var text = "";
	for (var item in items)
		text += "#L " + item + "#" +
				"#i" + item +"# " +
				items[item][0] + " points ("+(items[item][1] == - 1 ? "permanent" : (items[item][1] / 86400000) + " days") +") "+
				""+ (upgradable_stuff.indexOf(parseInt(item)) > -1 ? "(upgradable)" : item < 2000000 ? "(non-upgradeable)" : "") +"\r\n";
	return text + "#L999#Exit";
}