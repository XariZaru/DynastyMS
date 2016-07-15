var npc 	= [9300003,9300003,9300003,9300003, 9000037,9000037,9250052];
var scripts = ["", "mobDrops", "mobStats", "mobInMapStats", "", "changeRate", "buglog"];

function start() {
	cm.sendSimple("Which of the functionalities would you like to use?", 
			"Talk With Yue Lao (Helper)",
			"See what mob drops a particular item",
			"Check a monster's stats and drops",
			"Check a monster's stats that's in the map",
			"Check your damage [Damage per second]",
			//"Juke Box (Donor Options Too)",
			"Change your exp rate",
			//"View News Stand (Revision Logs)",
			"View/Submit Bugs");
}

function action(m,t,s,status) {
	if (status == 0) {
		cm.openNpc(npc[s], scripts[s]);
	}
}