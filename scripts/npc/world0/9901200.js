/*
	This file is part of the OdinMS inventoryle Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Author: Xterminator
	NPC Name: 		Robin
	inventory(s): 		inventoryle Road : Snail Hunting Ground I (40000)
	Description: 		Beginner Helper
*/
var status = -1;
var sel;
var inventory;

importPackage(Packages.org.w3c.dom);
importPackage(Packages.client.inventory);
importPackage(Packages.server);
importPackage(Packages.net.server);
importPackage(Packages.provider);
importPackage(Packages.java.io);
importPackage(Packages.java.sql);
importPackage(Packages.java.lang);
importPackage(Packages.tools);
importPackage(Packages.server.life);

var target = null;
var itemid = null;
var mobid = null;
var chance = -1;

var DROP = 0;
var MONSTER = 1;
var type = 0;

var item_to_change;
var item_to_insert;
var change_type = -1;

function Item (mobid, itemid) {
	this.mobid = mobid;
	this.itemid = itemid;
	this.newitem;
	this.percent;
	
	this.getMob = function() {
        return this.mobid;
    };
	
	this.getItem = function() {
        return this.itemid;
    };
	
	this.setItem = function(itemid) {
		this.itemid = itemid;
	}
	
	this.setPercent = function(percent) {
		this.percent = percent;
	}
	
	this.getPercent = function() {
		return this.percent;
	}
	
	this.setNewItem = function(newitem) {
		this.newitem = newitem;
	}
	
	this.getNewItem = function() {
		return this.newitem;
	}
}

function searchItem(item) {
	var text = "";
	var items = MapleItemInformationProvider.getInstance().getAllItems().toArray();
	for (var x = 0; x < items.length; x++) {
		if (items[x].getRight().toLowerCase().contains(item.toLowerCase()))
			text += "#L"+items[x].getLeft()+"##b" + items[x].getLeft() + "#k - #r#z" + items[x].getLeft() + "#\r\n";
	}
	return text;
}

function searchMob(mob) {
	var text = "";
	var data = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz")).getData("Mob.img");
	if (data != null) {
		var data = data.getChildren().toArray();
		for (var x = 0; x < data.length; x++) {
			var name = MapleDataTool.getString(data[x].getChildByPath("name"), "NO-NAME");
			if (name.toLowerCase().contains(mob.toLowerCase()) && MapleLifeFactory.getMonster(data[x].getName()) != null) {
				text += "#L" + data[x].getName() + "##b"+ data[x].getName() +"#k - #r" + name + ""+(MapleLifeFactory.getMonster(data[x].getName()).isBoss() ?" (boss) " : "")+"#k\r\n";
			}
		}
	}
	return text + "#L999#Exit";
}

function start() {
	if (cm.getPlayer().isGM())
		cm.sendSimple("What do you wish to do today?", "Add a drop to the database", "Look at a monster's drops");
}

function action(m,t,s) {
	if (m != 1 || s == 999) {
		MapleMonsterInformationProvider.getInstance().clearDrops();
		cm.getPlayer().dropMessage(5, "Drops reloaded and updated!");
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		type = s;
		cm.sendGetText(type == DROP ? "What item do you wish to insert?" : "What monster do you wish to search?");
	} else if (status == 1) {
		if (type == DROP)
			cm.sendSimple(searchItem(cm.getText()) + "\r\n");
		else if (type == MONSTER)
			cm.sendSimple(searchMobs(cm.getText()));
	} else if (status == 2) {
		if (type == DROP) {
			if (cm.getText() != "") {
				itemid = itemid == null ? s : itemid;
				cm.sendGetText("What monster do you wish to drop this item?\r\n");
			} else {
				cm.sendNext("You have to specify an item name at least.");
				cm.dispose();
			}
		} else if (type == MONSTER) {
			if (item_to_change == null)
				item_to_change = new Item(s, null);
			cm.sendSimple(getMobInfo(s == -1 ? item_to_change.getMob() : s) + "\r\n#L998#Add drops#l");
		}
	} else if (status == 3) {
		if (type == DROP) {
			if (cm.getText() != "")
				cm.sendSimple(searchMob(cm.getText()) + "\r\n");
			else {
				cm.sendNext("Please enter a mob at least.");
				status = 0;
			}
		} else if (type == MONSTER) {
			if (s != 998) {
				if (item_to_change.getMob() < 1)
					item_to_change.setItem(s);
				cm.sendSimple("This #i"+item_to_change.itemid+"#  ("+item_to_change.itemid+") drops from #o"+item_to_change.mobid+"# ("+item_to_change.mobid+"). What do you wish to do with it?", "Change the ID of the drop", "Change its chance");
			} else {
				cm.sendGetText("What item do you wish to add?");
			}
		}
	} else if (status == 4) {
		if (type == DROP) {
			if (chance != -1) {
				cm.sendNext("Your drop has been inserted");
				var ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO drop_data VALUES (DEFAULT, '"+s+"', '"+itemid+"', 1, 1, 0, '"+chance+"')");
				ps.executeUpdate();
				ps.close();
				status = 1;
			} else if (s != 999) {
				mobid = s;
				cm.sendGetText("What percent do you want this item to drop at?");
			} else {
				cm.sendNext("Drop not found");
				status = 1;
			}
		} else if (type == MONSTER) {
			if (cm.getText() == "") {
				change_type = s;
				cm.sendGetText(change_type == 0 ? "What item do you wish to change this to?" : "What percentage would you like to change this to?"); // 0 is change id, 1 is change chance in percentage
			} else {
				cm.sendSimple(searchItem(cm.getText()));
			}
		}
	} else if (status == 5) {
		if (type == DROP) {
			chance = parseFloat(cm.getText()) * 1000000 / ServerConstants.DROP_RATE / 100;
			cm.sendNext("Your drop has been inserted");
			var ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO drop_data VALUES (DEFAULT, '"+mobid+"', '"+itemid+"', 1, 1, 0, '"+chance+"')");
			ps.executeUpdate();
			ps.close();
			status = 1;
		} else if (type == MONSTER) {
			if (s == -1) {
				if (change_type == 0) {
					cm.sendSimple(searchItem(cm.getText()));
				} else {
					item_to_change.setPercent(cm.getText());
					cm.sendYesNo("Would you like to change this item's drop rate to " + cm.getText() + "%?");
				}
			} else {
				item_to_insert = s;
				cm.sendGetText("What percentage do you want this #b#z"+s+"##k to drop at?");
			}
 		}
	} else if (status == 6) {
		if (cm.getText() == "") {
			if (change_type == 0)
				item_to_change.setNewItem(s);
			updateDrop(item_to_change.getMob(), item_to_change.getItem(), item_to_change.getNewItem(), item_to_change.getPercent());
			cm.sendNext("You've altered this monster's drop!");
			MapleMonsterInformationProvider.getInstance().clearDrops();
		} else {
			status = 1;
			cm.sendOk("Drop added.");
			var new_chance = 1000000 * parseFloat(cm.getText()) / ServerConstants.DROP_RATE / 100;
			ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO drop_data VALUES (DEFAULT, '"+item_to_change.getMob()+"', '"+item_to_insert+"', 1, 1, 0, '"+new_chance+"')");
			ps.executeUpdate();
			ps.close();
			MapleMonsterInformationProvider.getInstance().clearDrops();
		}
	} else if (status == 7) {
		status = -1;
		start();
	}
}

importPackage(Packages.constants);

function updateDrop(mobid, itemid, newitemid, percent) {
	var ps;
	if (change_type == 0) // change id
		ps = DatabaseConnection.getConnection().prepareStatement("UPDATE drop_data SET itemid = '"+newitemid+"' WHERE dropperid = '"+mobid+"' AND itemid = '"+itemid+"' LIMIT 1");
	else { // chance percent
		var chance = parseFloat(percent) * 1000000 / 100 / ServerConstants.DROP_RATE;
		ps = DatabaseConnection.getConnection().prepareStatement("UPDATE drop_data SET chance = '"+chance+"' WHERE dropperid = '"+mobid+"' AND itemid = '"+itemid+"' LIMIT 1");
	}
	ps.executeUpdate();
	ps.close();
}

function searchMobs(mob_name) {
	if (mob_name == "")
		return "#L999#No mobs specified";
	var sb = new StringBuilder();
	var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
	var data = dataProvider.getData("Mob.img");
	if (data != null) {
		var name;
		var data = data.getChildren().toArray();
		for (var x = 0; x < data.length; x++) {
			name = MapleDataTool.getString(data[x].getChildByPath("name"), "NO-NAME");
			if (name.toLowerCase().contains(mob_name.toLowerCase())) {
				sb.append("#L"+ data[x].getName() +"##b").append(data[x].getName()).append("#k - #r").append(name).append("\r\n");
			}
		}
	}
	if (sb.length() == 0)
		sb.append("No mobs were found with that name.");
	return sb.toString();
}

function searchItem(item) {
	var text = "These are items that come up under your search description:\r\n";
	var items = MapleItemInformationProvider.getInstance().getAllItems().toArray();
	for (var x = 0, counter = 0; x < items.length; x++) {
		if (counter > 999) {
			text += "#L999##eTOO MANY ITEMS TO BE LISTED#n#l";
			break;
		}
		if (items[x].getRight().toLowerCase().contains(item.toLowerCase())) {
			text += "#L"+items[x].getLeft()+"##b" + items[x].getLeft() + "#k - #r#z" + items[x].getLeft() + "##l\r\n";
			counter++;
		}
	}
	return text + "\r\n#L999##bExit#k" + "\r\n#L1000##bBack#k";
}

function getMobInfo(mobid) {
	var mob = MapleLifeFactory.getMonster(mobid);
	var drop_rate = 1000000 / cm.getPlayer().getDropRate();
	var text =  "Statistics for #b#o"+mobid+"##k ("+mobid+")\r\n\r\n";
		text += "Level: " + mob.getStats().getLevel() + "\r\n";
		text += "Health: " + mob.getMaxHp() + "\r\n";
		text += "Mana: " + mob.getMaxMp() + "\r\n";
		text += "Exp: " + mob.getExp() + "\r\n";
		text += "Health/Exp Ratio: " + (Math.round((mob.getMaxHp() / mob.getExp() * 10)))/10 + "\r\n";
		text += "#L998#Add drops#l";
		text += "\r\n\r\n";
		text += "#eDrops List#n";
	var drops = MapleMonsterInformationProvider.getInstance().retrieveDrop(mobid).toArray();
	for (var x = 0; x < drops.length; x++)
		text += "\r\n#L"+drops[x].itemId+"##i" + drops[x].itemId + "# #z"+drops[x].itemId+"# ("+drops[x].itemId+") - " + (100 * drops[x].chance/drop_rate) + "%#l";
	
	text += "\r\n\r\b#eGlobal Drops List#n";
	
	var global_drops = MapleMonsterInformationProvider.getInstance().getGlobalDrop().toArray();
	for (var x = 0; x < global_drops.length; x++)
		text += "\r\n#i" + global_drops[x].itemId + "# #z"+global_drops[x].itemId+"# ("+global_drops[x].itemId+") - " + (100 * global_drops[x].chance/drop_rate) + "%";
	return text;
}

/*
function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0 && type != 4)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
		var text = "";
		if (selection == 0)
			inventory = target.getInventory(MapleInventoryType.EQUIP);
		else if (selection == 1)
			inventory = target.getInventory(MapleInventoryType.USE);
		else if (selection == 2)
			inventory = target.getInventory(MapleInventoryType.SETUP);
		inventory = inventory.getItems().entrySet().toArray();
		for (var x = 0; x < inventory.length; x++)
			text += "#i" + inventory[x].getValue().getItemId() + "#";
		cm.sendOk(text);
	}
}

function resetStats() {
	var totAp = cm.getPlayer().getStr() + cm.getPlayer().getDex() + cm.getPlayer().getLuk() + cm.getPlayer().getInt() + cm.getPlayer().getRemainingAp();
	cm.getPlayer().setStr(4);
	cm.getPlayer().setDex(4);
	cm.getPlayer().setLuk(4);
	cm.getPlayer().setInt(4);
	cm.getPlayer().dropMessage(totAp - 16);
	cm.getPlayer().setRemainingAp(totAp - 16);
	cm.getPlayer().updateSingleStat(MapleStat.STR, 4);
	cm.getPlayer().updateSingleStat(MapleStat.DEX, 4);
	cm.getPlayer().updateSingleStat(MapleStat.LUK, 4);
	cm.getPlayer().updateSingleStat(MapleStat.INT, 4);
	cm.getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, totAp - 16);
}*/