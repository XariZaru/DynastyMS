var status = -1;
var selected_pet;
var petid;

var BOSSHP = 2, DROP = 0, DPS = 1;

importPackage(Packages.client.inventory);
importPackage(Packages.client.pets);
importPackage(Packages.server);
importPackage(Packages.tools);
importPackage(Packages.java.sql);
importPackage(Packages.java.lang);

function isSubscribed() {
	var ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM donor_subscriptions WHERE accountid = ?");
	ps.setInt(1, cm.getPlayer().getAccountID());
	var rs = ps.executeQuery();
	if (!rs.next()) {
		ps.close();
		rs.close();
		return false;
	}
	
	var subscribed = rs.getDate("subscription").getTime() - new Date(System.currentTimeMillis()).getTime();
	ps.close();
	rs.close();
	return subscribed;
}


function start() {
	var time_left;
	if ((time_left = isSubscribed()) <= 0) {
		cm.sendOk("You're either not subscribed, or your subscription has ended for donation features.");
		cm.dispose();
	} else {
		var pets = cm.getPlayer().getPets();
		var text = "You currently have #e"+ Math.ceil(time_left/86400000) +"#n days remaining in your donor subscription:\r\n";
		
		for (var x = 0; x < pets.length; x++)
			if (pets[x] != null)
				text += "#L"+x+"##z"+pets[x].getItemId()+"# ("+ (pets[x].getDonorType().getType() == BOSSHP ? "boss hp" : pets[x].getDonorType().getType() == DROP ? (pets[x].getDonorFeature() != null && pets[x].getDonorFeature().getWatchedItem() != 0 ? "#z"+pets[x].getDonorFeature().getWatchedItem()+"#" : "a drop") : pets[x].getDonorType().getType() == DPS ? "DPS" : "idle") +")\r\n";
		cm.sendSimple(text + "#L999#Toggle pet features "+(!cm.getPlayer().getPetTasks() ? "on" : "off")+"");
	}
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == -1) {
		start();
	} else if (status == 0) {
		if (s == 999) {
			if (!cm.getPlayer().getPetTasks())
				cm.getPlayer().startPetTasks();
			else
				cm.getPlayer().stopPetTasks();
			status = -1;
			start();
			var pets = cm.getPlayer().getPets();
			
			if (cm.getPlayer().getPetTasks()) {
				for (var x = 0; x < pets.length; x++)
					if (pets[x] != null)
						pets[x].setDonorFeature(new DonorPetFeature(pets[x].getDonorType(), pets[x].getUniqueId()));
			}
		
		} else if (s != 999) {
			selected_pet = cm.getPlayer().getPet(s);
			petid = selected_pet.getUniqueId();
			cm.sendSimple("Your selected pet is #z" + selected_pet.getItemId() + "#. It's currently looking out for #e" + (selected_pet.getDonorType().getType() == BOSSHP ? "boss hp" : selected_pet.getDonorType().getType() == DPS ? (selected_pet.getDonorFeature() != null && selected_pet.getDonorFeature().getWatchedItem() != 0 ? "#z"+selected_pet.getDonorFeature().getWatchedItem()+"#" : "a drop") : selected_pet.getDonorType().getType() == DPS ? "DPS" : "nothing") + "#n. What do you wish to do?\r\n",
					"1. Make it watch for a drop", "2. Make it display your damage per second", "3. Make it watch boss health", "4. Make it do nothing");
		}
	} else if (status == 1) {
		selected_pet.setDonorFeature(new DonorPetFeature(DonorPetFeatureType.getByType(s), petid));
		selected_pet.setDonorType(DonorPetFeatureType.getByType(s));
		if (s == DROP) {
			cm.sendGetText("What item do you wish your pet to search for?");
		} else {
			cm.sendNext("Your pet is now #e" + (s == BOSSHP ? "keeping track of boss health" : s == DPS ? "displaying your damage per second" : "doing nothing") + "#n.");
			status = -2;
		}
	} else if (status == 2) {
		cm.sendSimple(searchItem(cm.getText()));
	} else if (status == 3) {
		selected_pet.getDonorFeature().setWatchedItem(s);
		cm.sendNext("Your pet is now watching for #z"+s+"#.");
		status = -2;
	}
}

function searchItem(item) {
	var begin_time = System.currentTimeMillis();
	var text = "These are items that come up under your search description:\r\n";
	var items = MapleItemInformationProvider.getInstance().getAllItems().toArray();
	for (var x = 0, counter = 0; x < items.length; x++) {
		if (counter > 999) {
			text += "#L999##eTOO MANY ITEMS TO BE LISTED#n#l";
			break;
		}
		if (items[x].getRight().toLowerCase().contains(item.toLowerCase())) {
			text += "#L"+items[x].getLeft()+"##b" + items[x].getLeft() + "#k - #r#z" + items[x].getLeft() + "##l\r\n";
			counter++;
		}
	}
	return text + "\r\n#L999##bExit#k" + "\r\n#L1000##bBack#k\r\n\r\n#eLoaded in "+ (System.currentTimeMillis() - begin_time)/1000 +" seconds#n";
}