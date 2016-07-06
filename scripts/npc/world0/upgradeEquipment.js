importPackage(Packages.client.inventory);

var status = -1;
var upgradable_equipment = [1112408];
var upgradable_ring = 1112408;
var upgrades = {1112408:[10000,25000,50000,100000,250000]};

// Item selected in inventory
var slot = null;

// Current upgrade
var current_upgrade = 0;

// Will become an item that will be purchased
var to_buy = null;

function start() {
	var equips = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getItems().entrySet().toArray();
	var txt = "These are the following items that you can choose to upgrade. Only specific equipment purchased at me can be upgraded.\r\n\r\n";
	for (var x = 0; x < equips.length; x++)
		if (upgradable_equipment.indexOf(equips[x].getValue().getItemId()) > -1)
		txt += "#L" + equips[x].getKey() + "##i"+ equips[x].getValue().getItemId() +"#\r\n";
	cm.sendSimple(txt + "#L999#Exit");
}

function action(m,t,s) {
	if (m == 1 && s != 999)
		status++;
	else
		return;
	if (status == 0) {
		slot = s;
		cm.sendSimple("These are your item's stats:\r\n\r\n" + cm.getEquipInfo(cm.getEquip(s)));
	} else if (status == 1) {
		if (cm.getEquip(slot).getItemId() == upgradable_ring) {
			var stat = cm.getEquip(slot).getStr();
			current_upgrade = stat == 1 ? 0 : stat == 2 ? 1 : stat == 5 ? 2 : stat == 8 ? 3 : stat == 15 ? 4 : stat == 25 ? 5 : 0;
			if (current_upgrade == upgrades[cm.getEquip(slot).getItemId()].length) {
				cm.sendOk("Your item has reached the maximum upgrades. You cannot upgrade it anymore. Congratulations!");
				cm.dispose();
				return;
			}
			cm.sendAcceptDecline("You can upgrade your item 5 times. The following stats are what your ring will have each time you upgrade it.\r\n\r\n"+
				"\r\n#e 0 Upgrades) #n+1 all stats, +1 att, +1 m.att" +
				"\r\n#e1st Upgrade) #n+2 all stats, +2 att, +6 m.att (10000)" +
				"\r\n#e2nd Upgrade) #n+5 all stats, +4 att, +12 m.att (25000)" +
				"\r\n#e3rd Upgrade) #n+8 all stats, +6 att, +18 m.att (50000)" + 
				"\r\n#e4th Upgrade) #n+15 all stats, +10 att, +25 m.att (100000)" +
				"\r\n#e5th Upgrade) #n+25 all stats, +15 att, +35 m.att (250000)" +
				"\r\n\r\nYour ring is currently on the #e" + current_upgrade + "#n upgrade. Your next upgrade and its benefits can be seen in the list above.");
		}
	} else if (status == 2) {
		var stats, wa, ma;
		if (cm.getEquip(slot).getItemId() == upgradable_ring) {
			stats = current_upgrade == 0 ? 2 : current_upgrade == 1 ? 5 : current_upgrade == 2 ? 8 : current_upgrade == 3 ? 15 : 25;
			
			wa = current_upgrade == 0 ? 2 : current_upgrade == 1 ? 4 : current_upgrade == 2 ? 6 : current_upgrade == 3 ? 10 :  15;
			
			ma = current_upgrade == 0 ? 6 : current_upgrade == 1 ? 12 : current_upgrade == 2 ? 18 : current_upgrade == 3 ? 25 : 35;
			
			to_buy = cm.createEpicItem(cm.getEquip(slot).getItemId(), stats, stats, stats, stats, wa, ma, 0);
			cm.sendSimple("It will cost you #e" + upgrades[cm.getEquip(slot).getItemId()][current_upgrade] + "#n boss points to upgrade this item. Are you sure you want to make this upgrade? This will be what you will have after purchasing:\r\n\r\n" + cm.getEquipInfo(to_buy));
		}
	} else if (status == 3) {
		if (cm.getPlayer().getBossPoints() >= upgrades[to_buy.getItemId()][current_upgrade]) {
			cm.sendOk("You've made your purchase and now your ring gives these stats:\r\n\r\n" + cm.getEquipInfo(to_buy));
			to_buy.setFlag(8);
			cm.removeItem(slot);
			cm.gainEquip(to_buy);
			cm.getPlayer().gainBossPoints(-upgrades[to_buy.getItemId()][current_upgrade]);
			cm.getPlayer().dropMessage(6, cm.getPlayer().getBossPoints() + " boss points remaining.");
			cm.dispose();
		} else {
			cm.sendOk("You don't have enough points for this upgrade.");
			cm.dispose();
		}
	}
}