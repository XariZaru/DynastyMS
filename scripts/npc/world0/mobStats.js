importPackage(Packages.server.life);
importPackage(Packages.java.lang);
importPackage(Packages.server);
importPackage(Packages.tools);

var status = -1;
var selections = {ITEM: 0, MOB: 1, MAP: 2};
var category;

function start() {
	cm.sendSimple("What monster utility would you like to use today?", "Check what monsters drop a particular item", "Check a monster's stats and drops", "Check a monster's stats that's in the map");
}

function action(m,t,s) {
	if (m == -1 || s == 999)		{
		cm.dispose();
		return;
	} else if (m == 0 || s == 1000 || status == 3 || status == 2 && category == selections.MOB || status == 1 && category == selections.MAP) {
		start();
		status = -1;
	} else {
		status++;
	}
	if (status == 0) { 
		category = s;
		if (category == selections.ITEM) {
		 	cm.sendGetText("What item do you wish to search for?");
		} else if (category == selections.MOB) {
			cm.sendGetText("What monster would you like to look up?");
		} else if (category == selections.MAP) {
			cm.sendSimple(getMobsInMap());
		}
	} else if (status == 1) {
		if (category == selections.ITEM) {
			cm.sendSimple(searchItem(cm.getText()));
		} else if (category == selections.MOB) {
			cm.sendSimple("These are the monsters that currently fit your description\r\n" + cm.searchMobs(cm.getText()) + "\r\n#L999#Exit");
		} else if (category == selections.MAP) {
			cm.sendNext(getMobInfo(s));
		}
	} else if (status == 2) {
		if (category == selections.ITEM) {
			cm.sendSimple(mobsThatDrop(s));
		} else if (category == selections.MOB) {
			cm.sendNext(getMobInfo(s));
		}
	} else if (status == 3) {
		if (category == selections.ITEM) {
			cm.sendNext(getMobInfo(s));
		}
	} 
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

function getMobsInMap() {
	var text = "You are currently in #m "+ cm.getPlayer().getMapId() +"#. What mob would you" +
			" like to inspect?\r\n";
	var mobs = cm.getPlayer().getMap().getUniqueMonsters();
	for (var x = 0; x < mobs.size(); x++)
		text += "\r\n#b#L" + mobs.get(x) + "##o"+ mobs.get(x) +"# ("+mobs.get(x)+")";
	text += "\r\n#L999##bExit#k\r\n#L1000##bBack#k";
	return text;
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
		text += "\r\n";
		text += "#eDrops List#n";
	var drops = MapleMonsterInformationProvider.getInstance().retrieveDrop(mobid).toArray();
	for (var x = 0; x < drops.length; x++)
		text += "\r\n#i" + drops[x].itemId + "# #z"+drops[x].itemId+"# ("+drops[x].itemId+") - " + (100 * drops[x].chance/drop_rate) + "%";
	
	text += "\r\n\r\b#eGlobal Drops List#n";
	
	var global_drops = MapleMonsterInformationProvider.getInstance().getGlobalDrop().toArray();
	for (var x = 0; x < global_drops.length; x++)
		text += "\r\n#i" + global_drops[x].itemId + "# #z"+global_drops[x].itemId+"# ("+global_drops[x].itemId+") - " + (100 * global_drops[x].chance/drop_rate) + "%";
	return text;
}

function getHarmlessMobInfo(mobid) {
	var mob = MapleLifeFactory.getMonster(mobid);
	var drop_rate = 1000000 / cm.getPlayer().getDropRate();
	var text =  "Statistics for #b#o"+mobid+"##k ("+mobid+")\r\n\r\n";
		text += "Level: " + mob.getStats().getLevel() + "\r\n";
		text += "Health: " + mob.getMaxHp() + "\r\n";
		text += "Mana: " + mob.getMaxMp() + "\r\n";
		text += "Exp: " + mob.getExp() + "\r\n";
		text += "Health/Exp Ratio: " + (Math.round((mob.getMaxHp() / mob.getExp() * 10)))/10 + "\r\n";
		text += "\r\n";
		text += "#eDrops List#n";
	var drops = MapleMonsterInformationProvider.getInstance().retrieveDrop(mobid).toArray();
	for (var x = 0; x < drops.length; x++)
		text += "\r\n#t"+drops[x].itemId+"# ("+drops[x].itemId+") - " + (100 * drops[x].chance/drop_rate) + "%";
	
	var global_drops = MapleMonsterInformationProvider.getInstance().getGlobalDrop().toArray();
	for (var x = 0; x < global_drops.length; x++)
		text += "\r\n#i" + global_drops[x].itemId + "# #z"+global_drops[x].itemId+"# ("+global_drops[x].itemId+") - " + (100 * global_drops[x].chance/drop_rate) + "%";
	
	return text;
}

function mobsThatDrop(itemid) {
	var start_time = System.currentTimeMillis();
	var text = "Here are a list of monsters that drop #e#z"+itemid+"##n ("+itemid+")\r\n";
	var ps = DatabaseConnection.getConnection().prepareStatement("SELECT dropperid, chance FROM drop_data WHERE itemid = ?");
	ps.setInt(1, itemid);
	var rs = ps.executeQuery();
	
	while (rs.next()) {
		var mobid = rs.getInt("dropperid");
		var chance = rs.getInt("chance")/(1000000/cm.getPlayer().getDropRate()) * 100;
		text += "\r\n#L" + mobid + "##b#o" + mobid + "##k (" + mobid + ") - #r" + chance + "%#k";
	}
	text += "#b\r\n#L999#Exit#k#l";
	text += "#e\r\n\r\nLoaded in " + (System.currentTimeMillis() - start_time)/1000 + " seconds#n";
	rs.close();
	ps.close();
	return text;
}