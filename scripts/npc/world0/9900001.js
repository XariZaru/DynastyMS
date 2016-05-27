
importPackage(Packages.client.inventory);
importPackage(Packages.server);
importPackage(Packages.provider);
importPackage(Packages.java.io);
var status = -1;
var slot = null;
var txt = "";
var replace = null;

function start() {
	var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/Sound.wz"));
	var data = dataProvider.getData("Bgm00.img");
	var txt = "";
	if (data != null) {
		var data = data.getChildren().toArray();
		for (var x = 0; x < data.length; x++) {
			txt += data[x].getName() + "\r\n";
			//name = MapleDataTool.getString(searchData.getChildByPath("name"), "NO-NAME");
			//if (name.toLowerCase().contains(search.toLowerCase())) {
			//	sb.append("#b").append(Integer.parseInt(searchData.getName())).append("#k - #r").append(name).append("\r\n");
			//}
		}
	}
	cm.sendOk(txt);
	//cm.getPlayer().addBossAttempt("Zakum");
	//cm.sendOk(cm.getPlayer().getBossAttempt("Zakum"));
	/*
	var equips = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).list().toArray();
	var map = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getItems();
	var text = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).list()+ "\r\n";
	for (var stuff in map.entrySet().toArray()) {
		text += map.entrySet().toArray()[stuff] + "\r\n";
	}
	cm.sendSimple("What item do you wish to improve today?\r\n\r\n" + cm.getEquips() + "\r\n\r\n#L999#Exit");
	*/
}

function action(m,t,s) {
	if (m != 1 || s == 999) {
		cm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
		slot = s;
		equip = cm.getEquip(s);
		cm.sendSimple("Loading these stats\r\n\r\n" + cm.getEquipInfo(equip.loadOriginal()));
		cm.dispose();
	}
}
		/*
		txt = 
			s == 0 ? "strength" :
			s == 1 ? "dexterity" :
			s == 2 ? "luck" :
			s == 3 ? "intelligence" :
			s == 4 ? "weapon attack" :
			s == 5 ? "magic attack" :
			s == 6 ? "upgrade slots" :
					 "vicious' hammer";
			
		cm.sendAcceptDecline("Are you sure you want to improve this item's #b" + txt + "#k?");
	} else if (status == 2) {
		var equip = cm.getEquip(slot);
		var strength = equip.getStr(), dex = equip.getDex(), intt = equip.getInt(), luk = equip.getLuk();
		var att = equip.getWatk(), matt = equip.getMatk();
		var slots = equip.getUpgradeSlots(), vicious = equip.getVicious();
		switch (txt) {
			case "strength":
				strength += 5;
				break;
			case "dexterity":
				dex += 5;
				break;
			case "intelligence":
				intt += 5;
				break;
			case "luck":
				luk += 5;
				break;
			case "weapon attack":
				att += 3;
				break;
			case "magic attack":
				matt += 3;
				break;
			case "upgrade slots":
				slots += 1;
				break;
			case "vicious' hammer":
				vicious += 1;
				break;
		}
		equip = cm.gainEpicItem(slot, strength, dex, intt, luk, att, matt, slots);
		cm.sendSimple("These are your #z" + equip.getItemId() + "#'s stats after modifying it.\r\n\r\n#b" + cm.getEquipInfo(equip));
		cm.dispose();
	}
}*/