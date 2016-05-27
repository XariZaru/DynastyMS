function start() {
	cm.sendGetNumber("What would you like to set your exp rate to? This change must be done every time you log in until the team" +
			" programs a more permanent solution.", 5, 1,5);
}

function action(m,t,s,status) {
	if (status == 0) {
		cm.sendOk("You have set your exp rate to " + s + "x.");
		cm.getPlayer().setExpRate(s);
		cm.dispose();
	}
}