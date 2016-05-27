var status = -1;
var slot;
var txt;

function start() {
	cm.sendSimple("Edit weapon stats for GM only.\r\n\r\n" + cm.getEquips() + "\r\n#L999#Exit");
}

function action(m,t,s) {
	if (m <= 0 || !cm.getPlayer().isGM()) {
		cm.sendOk("You must be a GM to use this feature.");
		cm.dispose();
		return;
	} else if (s == 999) {
		cm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
		slot = s;
		cm.sendSimple("These are the weapon stats for #b#z" + cm.getEquip(s).getItemId() + "##k.\r\n\r\n" + cm.getEquipInfo(cm.getEquip(s)));
	} else if (status == 1) {
		txt = 
			s == 0 ? "strength" :
			s == 1 ? "dexterity" :
			s == 2 ? "luck" :
			s == 3 ? "intelligence" :
			s == 4 ? "weapon attack" :
			s == 5 ? "magic attack" :
			s == 6 ? "upgrade slots" :
					 "vicious' hammer";
		cm.sendYesNo("Do you wish to edit this stat?");
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
}
