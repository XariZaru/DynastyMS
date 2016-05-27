var status = -1;

function start() { 
	cm.sendGetText("What is the name of the item you wish to search for?");
}

function action(m,t,s) {
	if (m == 0 || m == -1 || s == 999) {
		cm.dispose();
		return;
	} else
		status++;
	if (status == 0) {
		if (cm.getText() == "") {
			cm.sendOk("You must specificy #esomething#n at least!");
			cm.dispose();
		} else {
			cm.sendSimple(cm.searchItem(cm.getText()) + "\r\n#L999#Exit");
		}
	} else if (status == 1) {
		cm.sendNext("Here are a list of monsters that drop #t" + s + "# ("+ s +")\r\n\r\n" + cm.mobsThatDrop(s));
	} else if (status == 2) {
		status = -1;
		start();
	}
}