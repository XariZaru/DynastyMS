var npc = [9201107,9201123,9300003];
var scripts = ["", "equipmentModifier", ""];

function start() {
	cm.sendSimple("Who would you like to talk to?", "Talk with Warrior Statue (Quests)", "Talk with Warrior Statue (Equipment Modification)", "Back");
}

function action(m,t,s,status) {
	if (status == 0) {
		cm.openNpc(npc[s], scripts[s]);
	}
}