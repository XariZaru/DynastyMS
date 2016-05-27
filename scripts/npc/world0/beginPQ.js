//var leaders;
//
//function start() {
//	leaders = cm.getPartyLeaders(cm.getMapId()).toArray();
//	txt = "The following party wishes to play with you:\r\n#b";
//	for (var x = 0; x < leaders.length; x++) {
//		txt += "#L" + x + "#" + leaders[x].getName() + " ("+leaders[x].getParty().getMembers().toArray().length+" members)";
//	}
//	cm.sendAcceptDecline("Do you still wish to play with these players? " +cm.getOtherPartyInfo(leaders[s].getName()));
//}
//
//function action(m,t,s,status) {
//	if (status == 0) {
//	}
//}

function start() {
	cm.sendAcceptDecline("A party wishes to play with you. What do you want to do?\r\n\r\n#b" + cm.getPlayer().getCPQParty().getParty2().getReadableMembers());
}

function action(m,t,s,status) {
	if (m != 1) {
		cm.getPlayer().getCPQParty().sendRequest(null);
		cm.dispose();
	}
	if (status == 0) {
		cpqparty = cm.getPlayer().getCPQParty();
		cpqparty.getParty2().warpParty(cm.getMapId());
		cpqparty.createCPQParty(cpqparty.getParty2());
		cpqparty.startCPQ(cm.getMapId() + 1, cm.getMapId() + 101);
		cm.dispose();
	}
}