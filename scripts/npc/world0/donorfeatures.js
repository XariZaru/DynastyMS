var status = -1;
var player;

importPackage(Packages.java.lang);
importPackage(Packages.net.server);
importPackage(Packages.java.sql);
importPackage(Packages.tools);

function start() {
	if (cm.getPlayer().isGM())
		cm.sendGetText("Who do you wish to give this donor feature to?");
	else {
		cm.sendOk("Must be a GM to use this option.");
		cm.dispose();
	}
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		player = Server.getInstance().getWorld(0).getPlayerStorage().getCharacterByName(cm.getText());
		if (player == null) {
			cm.sendOk("There is no player named #e"+cm.getText()+"#n online at the moment.");
			cm.dispose();
		} else {
			cm.sendGetNumber("How many #emonths#n of donor subscription would you like to give to this player?\r\n", 1, 1, 24);
		}
	} else if (status == 1) {
		
		ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO donor_subscriptions VALUES (DEFAULT, '"+player.getAccountID()+"', DATE_ADD(now(), INTERVAL '"+s+"' MONTH)) ON DUPLICATE KEY UPDATE subscription = DATE_ADD(subscription, INTERVAL '"+s+"' MONTH)");
		ps.executeUpdate();
		ps.close();
		player.dropMessage(5, "You have received " + s + " months of donor feature subscription.");
		cm.sendOk("You've added #e" + s + "#n months to "+player.getName()+"'s subscription.");
		cm.dispose();
	}
}