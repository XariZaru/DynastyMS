
importPackage(Packages.client);
importPackage(Packages.client.inventory);
importPackage(Packages.net.server);
importPackage(Packages.server.life);
importPackage(Packages.scripting.quest);
importPackage(Packages.provider);
importPackage(Packages.java.io);
importPackage(Packages.tools);
importPackage(Packages.java.sql);
importPackage(Packages.java.lang);
importPackage(Packages.server.maps);
importPackage(Packages.server);

var status = -1;
var slot = null;
var txt = "";
var replace = null;

function canVoteGTOP() {
	var ps = DatabaseConnection.getConnection().prepareStatement("SELECT * from votingrecords WHERE ip = ? AND account = ? AND siteid = 1");
	ps.setString(1, cm.getClient().getIP());
	ps.setString(2, cm.getClient().getAccountName());
	
	var rs = ps.executeQuery();
	var can_vote = true;
	
	if (rs.next()) 
		can_vote = ((System.currentTimeMillis() - (rs.getInt("date") * 1000)) >= 86400000);
	
	ps.close();
	rs.close();
	return can_vote;
}

/*
function searchItem(item) {
	var text = "These are items that come up under your search description\r\n";
	var items = MapleItemInformationProvider.getInstance().getAllItems().toArray();
	for (var x = 0, counter = 0; x < items.length; x++) {
		if (counter > 999) {
			text += "#L999##eTOO MANY ITEMS TO BE LISTED#n#l";
			break;
		}
		if (items[x].getRight().toLowerCase().contains(item.toLowerCase()) && String.fromCharCode(items[x].getLeft().toString().charAt(6)) == "1") {
			text += "#L"+items[x].getLeft()+"##b" + items[x].getLeft() + "#k - #r#z" + items[x].getLeft() + "##l\r\n";
			counter++;
		}
	}
	return text + "\r\n#L999##bExit#k" + "\r\n#L1000##bBack#k";
}
*/

function start() {
	// For serverNotice numbers, don't use 4
	// 3 is smega, 6 is blue, 5 is reddish, 2 is blue smega thing, 1 is pop up
	var skills = [1121000,1221000,1321000,2121000,2221000,2321000,3121000,3221000,4121000,4221000,5121000,5221000,2321003,2321008,2321006,3211003,2221003,2221005,2121007,2121003,2121005,5121003,5121004,5121005,5121010,5221006,5221008,5221009,1120005,1220006,1121006,1221007,1321003,1121002,1221002,1321002,1121010,1320006,1320008,1320009,1221003,1221004,1221011,3121003,3221003,3121008,3121004,3221005,3221001,3221007,4121004,4121008,4221004,4121003,4221003,4221001,4221006];
	//cm.sendSimple(searchItem("scroll"));
	cm.sendSimple(cm.getEquips());
	//cm.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getScrollEffect(cm.getPlayer().getId(), Equip.ScrollResult.FAIL, false));  
	//cm.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, "Hi"));
	//cm.sendOk(canVoteGTOP());
	/*
	if (cm.getPlayer().getName()=="Xari") {
		var pet = cm.getPlayer().getPetIndex(43);
		cm.getPlayer().getMap().broadcastMessage(cm.getPlayer(), MaplePacketCreator.petChat(cm.getPlayer().getId(), pet, 0, "BossArm1 58%\r\nBossArm2 45%\r\nWinsane1 45%"), true);
		cm.dispose();
	}*/
	
	//var playerid = Server.getInstance().getChannelsFromWorld(0).get(2).getPlayerStorage().removePlayer("Pirate");
	//cm.getPlayer().dropMessage("DCED");
	//var player = cm.getClient().getChannelServer().getPlayerStorage().removePlayer(playerid);
	//cm.getPlayer().dropMessage("Kessie");
	//cm.getClient().disconnect(false, false);
	//cm.dispose();
	// ZAKUM TOTAL HP: 66000000 + 88000000 + 110000000 + 33000000 + 33000000 + 22000000 + 22000000 + 27500000 + 30000000 + 25300000 + 25300000;
	/*
	var maxhp = 218100000;
	var rand = Math.random() * .3 + .9;
	var bosspoints = (Math.random() * .3 + .9) * .0000625 * maxhp;
	cm.getPlayer().gainBossPoints(bosspoints);
	cm.getPlayer().dropMessage(5, "You gained " + Math.floor(bosspoints) + " bosspoints.");
	cm.warp(109040000);
	cm.dispose();
	*/
	/*
	target.dropMessage(target.canVoteGTOP());
	target.dropMessage(target.canVoteUltimate());
	var ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM votingrecords WHERE ip = ? AND siteid = 2");
	ps.setString(1, cm.getClient().getIP());
	rs = ps.executeQuery();
	if (rs.next()) {
		cm.sendOk((System.currentTimeMillis() - (rs.getInt("date") * 1000)) >= 32400000);
		return;
	} 
	cm.sendOk("true!");
	cm.dispose();
	return;
	*/
	//target.addBossAttempt("Zakum");
	//cm.sendOk(target.getBossAttempt("Zakum"));
	
}

function action(m,t,s) {
	if (m != 1 || s == 999) {
		cm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
		var equip = cm.getEquip(s);
		cm.sendOk(equip.getCreateDate());
		/*
		slot = s;
		equip = cm.getEquip(s).loadOriginal();
		if (equip == null) {
			cm.sendOk("There is no saved item for this.");
			cm.dispose();
			return;
		}
		cm.sendSimple("Loading item ("+ equip.getOriginalId() +") v. ("+cm.getEquip(s).getOriginalId()+") #i"+equip.getItemId()+"#\r\n\r\n" + cm.getEquipInfo(equip));
		//cm.sendSimple(s + " Loading these stats ("+equip.getInvId()+")\r\n\r\n" + cm.getEquipInfo(equip.loadOriginal()));
		*/
	} else if (status == 1) {
		
	}
}
		/*
		txt = 
			s == 0 ? "strength" :
			s == 1 ? "dexterity" :
			s == 2 ? "luck" :
			s == 3 ? "intelligence" :
			s == 4 ? "weapon attack" :
			s == 5 ? "magic attack" :
			s == 6 ? "upgrade slots" :
					 "vicious' hammer";
			
		cm.sendAcceptDecline("Are you sure you want to improve this item's #b" + txt + "#k?");
	} else if (status == 2) {
		var equip = cm.getEquip(slot);
		var strength = equip.getStr(), dex = equip.getDex(), intt = equip.getInt(), luk = equip.getLuk();
		var att = equip.getWatk(), matt = equip.getMatk();
		var slots = equip.getUpgradeSlots(), vicious = equip.getVicious();
		switch (txt) {
			case "strength":
				strength += 5;
				break;
			case "dexterity":
				dex += 5;
				break;
			case "intelligence":
				intt += 5;
				break;
			case "luck":
				luk += 5;
				break;
			case "weapon attack":
				att += 3;
				break;
			case "magic attack":
				matt += 3;
				break;
			case "upgrade slots":
				slots += 1;
				break;
			case "vicious' hammer":
				vicious += 1;
				break;
		}
		equip = cm.gainEpicItem(slot, strength, dex, intt, luk, att, matt, slots);
		cm.sendSimple("These are your #z" + equip.getItemId() + "#'s stats after modifying it.\r\n\r\n#b" + cm.getEquipInfo(equip));
		cm.dispose();
	}
}*/