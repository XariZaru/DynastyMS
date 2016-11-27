var status = -1;
importPackage(Packages.net.server);
importPackage(Packages.tools);
importPackage(Packages.java.sql);

function start() {
	cm.sendOk(cm.getPlayer().getPets());
	//cm.sendGetText("What player would you like to fix being stuck?");
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		var channels = Server.getInstance().getWorld(0).getChannels().toArray();
		for (var x = 0; x < channels.length; x++) {
			if (channels[x].getPlayerStorage().getCharacterByName(cm.getText()) != null) {
				var ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET loggedin = 0 WHERE id = ?");
				ps.setInt(1, channels[x].getPlayer().getCharacterByName(cm.getText()).getAccountId());
				ps.executeUpdate();
				channels[x].getPlayerStorage().removePlayer(cm.getText());
				break;
			}
		}
		cm.getPlayer().dropMessage(5, cm.getText() + " was disconnected if he was stuck.");
		cm.dispose();
	}
}