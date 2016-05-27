var status = -1;
var slot = null;
var revert = null;

function start() {
	if (cm.getPlayer().isGM())
		cm.sendSimple("Which item do you wish to load back to original?\r\n\r\n" + cm.getEquips());
	else {
		cm.sendOk("Only GMs can use this feature right now. Feature in question: reverting an item back to its original scroll state.");
		cm.dispose();
	}
}

function action(m,t,s) {
	if (m < 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		slot = s;
		revert = cm.getEquip(s).loadOriginal();
		if (cm.getEquip(s).getInvId() == 0) {
			cm.sendOk("This item can't be saved just yet. Please relog to be able to save this item.");
			cm.dispose();
			return;
		}
		if (!cm.getEquip(s).isOriginal())
			cm.sendSimple("These are the item's original stats\r\n\r\n" + cm.getEquipInfo(revert) + "#l\r\n\r\nThese are the item's current stats\r\n\r\n" + cm.getEquipInfo(cm.getEquip(s)));
		else {
			cm.sendOk("This item had no state to revert back to. ");
			cm.dispose();
		}
	} else if (status == 1) {
		cm.sendYesNo("Do you wish to revert back to the original?");
	} else if (status == 2) {
		cm.removeItem(slot);
		cm.gainEquip(revert);
		cm.dispose();
	}
}