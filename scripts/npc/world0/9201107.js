function start() {
	cm.sendSimple("Oh! Look at who's here! Come closer you little one and check out the quests you've got" +
			" #eroarin'#n for you! E'erybody needs help. E'erybody wants help. Do them a favor and be a hero!\r\n" +
			"" + cm.getAvailableQuests() + "#L500#Exit");
}

function action(m,t,s, status) {
	if (status == 0) {
		if (s==500)
			cm.dispose();
		else
			cm.sendSimple(cm.getQuestDetails(s) + "\r\n#L500#Exit");
	} else if (status == 1) {
		if (s == 500)
			cm.dispose();
		else
			cm.openNpc(s);
	}
}