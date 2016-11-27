/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*Adobis
 *
 *@author SharpAceX (Alan)
 */
 
 // Temporary change to CWKPQ until we can get a proper version in
 
 importPackage(Packages.tools);
 importPackage(Packages.java.lang);
 importPackage(Packages.server);
 importPackage(Packages.client.inventory);
 
 var status = -1;
 var event_ticket = 4032055;
 var lobby_map = 610030600;
 var party;
 
 function start() {
	 party = cm.getParty();
	 if (cm.getMapId() == 610030600) {
		 cm.sendYesNo("Would you like to leave this area? Not everyone can stand up to these monsters.");
	 } else if (cm.haveItem(event_ticket)) {
		 cm.sendYesNo("Would you like to go back in?");
	} else if (cm.getParty() == null) {
		 cm.sendOk("You need to be part of a small expedition in order to take on the #bCrimsonwood Keep#k! The owners of this keep are ferocious indeed and you'll need to be organized to take them on.");
		 cm.dispose();
	 } else {
		 cm.sendSimple("Hey, you ready to start the fight #bace#k?\r\n","Start the expedition", "View expedition members");
	 }
 }
 
 function action(m,t,s) {
	 if (m != 1) {
		 cm.dispose();
		 return;
	 }
	 status++;
	 if (status == 0) {
		 if (cm.getMapId() == 610030600) {
			 cm.warp(610030020);
			 cm.removeAll(event_ticket);
			 cm.dispose();
		 } else if (cm.haveItem(event_ticket)) {
			 cm.warp(610030600);
			 cm.removeAll(event_ticket);
			 cm.dispose();
		 } else if (s == 1) {
			 cm.sendOk(listMembers());
			 cm.dispose();
		 } else {
			 if (!cm.isLeader()) {
				 cm.sendOk("Get your leader to start the fight! I'm not taking a runt's word that we're all ready to go!");
				 cm.dispose();
			 } else {
				 if (isFree(cm, 610030600)) {
					 // Checks if any players have already hit their max for the day
					cannot_boss = cannotBoss(cm.getPlayer().getParty());
					if (cannot_boss.length > 0) {
						var txt = "You cannot enter and fight CWKPQ. Someone in your party has fought this boss too many times this week.\r\n";
						for (var x = 0; x < cannot_boss.length; x++)
							txt += "\r\n" + cannot_boss[x];
						cm.sendOk(txt);
						cm.dispose();
						return;
					}
					
					// Level check to see if players are within 15 levels of average level of party
					level_check = levelCheck(party);
					if (level_check.length > 0) {
						var txt = "You cannot enter and fight " + mob_names[s] + ". Someone in your party is 15 levels below or above the average party level. This rule does not apply to party members who are level 120 and above. #eAverage party level: "+averagePartyLevel(party)+"#n\r\n";
						for (var x = 0; x < cannot_boss.length; x++)
							txt += "\r\n" + cannot_boss[x];
						cm.sendOk(txt);
						cm.dispose();
						return;
					}
					
					// Record stuff and warp + boss + give tickets out
					var members = cm.getParty().getMembers().toArray();
					for (var x = 0; x < members.length; x++) {
						MapleInventoryManipulator.addFromDrop(members[x].getPlayer().getClient(), new Item(event_ticket, 0, 1), true);
						addBossAttempt(members[x].getPlayer());
					}
					
					// warp
					cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(610030600).resetAll();
					cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(610030600).warpEveryone(lobby_map);
					cm.warpParty(610030600);
					
					var MapleLifeFactory = Packages.server.life.MapleLifeFactory;
					
					var margana = MapleLifeFactory.getMonster(9400590); // Margana
					var nirg 	= MapleLifeFactory.getMonster(9400593); // Red Nirg
					var hsalf 	= MapleLifeFactory.getMonster(9400591); // Hsalf
					var rellik 	= MapleLifeFactory.getMonster(9400592); // Rellik
					
					margana.addMobDeadListener(new Packages.custom.dynasty.BossPQ(cm.getParty()));
					nirg.addMobDeadListener(new Packages.custom.dynasty.BossPQ(cm.getParty()));
					hsalf.addMobDeadListener(new Packages.custom.dynasty.BossPQ(cm.getParty()));
					rellik.addMobDeadListener(new Packages.custom.dynasty.BossPQ(cm.getParty()));
					
					cm.getPlayer().getMap().spawnMonsterOnGroundBelow(margana, -20, 1);
					cm.getPlayer().getMap().spawnMonsterOnGroundBelow(nirg, -347, 276);
					cm.getPlayer().getMap().spawnMonsterOnGroundBelow(hsalf, -1, 276);
					cm.getPlayer().getMap().spawnMonsterOnGroundBelow(rellik, 347, 276);
				 } else {
					 cm.sendOk("The map is currently not free at the moment.");
				 }
				 cm.dispose();
			 }
		 }
	 }
 }
 
 function listMembers() {
	 var text = "";
	 return cm.getParty().getReadableMembers();
 }
 
 function getBossAttempt(player) {
	var ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM boss_attempts WHERE characterid = '"+player.getId()+"' AND boss = 'bossmanager'");
	var rs = ps.executeQuery();
	var return_result = 0;
	if (rs.next()) {
		var day_conversion = 1000 * 60 * 60 * 24;
		if (Math.floor((new java.sql.Date(System.currentTimeMillis()).getTime()/day_conversion)) - Math.floor(rs.getDate("attempt_time").getTime()/day_conversion) > 0) {
			var update_time = DatabaseConnection.getConnection().prepareStatement("UPDATE boss_attempts SET attempt_time = CURRENT_TIMESTAMP, attempt = 0 WHERE characterid = '"+player.getId()+"' AND boss = 'bossmanager'");
			update_time.executeUpdate();
			update_time.close();
		} else {
			return_result = rs.getInt("attempt");
		}
	}
		
	ps.close();
	rs.close();
	return return_result;
}

function addBossAttempt(player) {
	var ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO boss_attempts VALUES (DEFAULT, '" + player.getId() + "', 'bossmanager', 1, CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE attempt = attempt + 1");
	ps.executeUpdate();
	ps.close();
}

// If players still have boss attempts
function cannotBoss(party) {
	var members = party.getMembers().toArray();
	var cannot_boss = [];
	for (var x = 0; x < members.length; x++)
		if (getBossAttempt(members[x].getPlayer()) >= 2 && !cm.getPlayer().isGM())
			cannot_boss.push(members[x].getPlayer().getName());
	return cannot_boss;
}

// Average party level
function averagePartyLevel(party) {
	var members = party.getMembers().toArray();
	var level = 0;
	for (var x = 0; x < members.length; x++)
		level += members[x].getPlayer().getLevel();
	return Math.floor(level / members.length);
}

// Level check for whole party
function levelCheck(party) {
	var members = party.getMembers().toArray();
	var outliers = [];
	
	for (var x = 0; x < members.length; x++)
		if (Math.abs(averagePartyLevel(party) - members[x].getPlayer().getLevel()) > 15 && members[x].getPlayer().getLevel() < 80)
			outliers.push(members[x].getPlayer());
	return outliers;
}

// People be bossin' or they finished but didn't dip.
function isFree(cm, mapid) {
	return cm.getPlayerCount(mapid) == 0 || 
		cm.getPlayerCount(mapid) > 0 && cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(mapid).countMobs() < 1;
}
 
 /*
importPackage(Packages.server.expeditions);
importPackage(Packages.tools);
importPackage(Packages.scripting.event);

var status = 0;
var expedition;
var player;
var em;
var cwkpq = MapleExpeditionType.CWKPQ;
var list = "What would you like to do?#b\r\n\r\n#L1#View current Expedition members#l\r\n#L2#Start the fight!#l\r\n#L3#Stop the expedition.#l";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {

    player = cm.getPlayer();
    expedition = cm.getExpedition(cwkpq);
    em = cm.getEventManager("CWKPQ");

    if (mode < 1) {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (player.getClient().getChannel() != 1) { //Only channel 1
            cm.sendOk("Sorry, Crimsonwood Keep Party Quest may only be attempted on #bChannel 1#k.");
            cm.dispose();
        } else if (player.getLevel() < cwkpq.getMinLevel() && player.getLevel() > cwkpq.getMaxLevel()) { //Don't fit requirement
            cm.sendOk("You do not meet the criteria to take attempt Crimsonwood Keep Party Quest!");
            cm.dispose();
        } else if (expedition == null) { //Start an expedition
            cm.sendSimple("Would you like to assemble a team to attempt a #rCrimsonwood Keep Party Quest#k?\r\n#b#L1#Lets get this going!#l\r\n\#L2#No, I think I'll wait a bit...#l");
            status = 1;
        } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
            cm.sendSimple(list);
            status = 2;
        } else if (expedition.isRegistering()) { //If the expedition is registering
            if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                cm.sendOk("You have already registered for the expedition. Please wait for " + expedition.getLeader().getName() + " to begin the expedition.");
                cm.dispose();
            } else { //If you aren't in it, you're going to get added
                cm.sendOk(expedition.addMember(cm.getPlayer()));
                cm.dispose();
            }
        } else if (expedition.isInProgress()) { //Only if the expedition is in progress
            if (expedition.contains(player)) { //If you're registered, warp you in
                em.getInstance("CWKPQ_" + player.getClient().getChannel()).registerPlayer(player);
                cm.dispose();
            } else { //If you're not in by now, tough luck
                cm.sendOk("Another expedition has taken the initiative to complete the Crimsonwood Keep Party Quest, lets pray for those brave souls.");
                cm.dispose();
            }
        }
    } else if (status == 1) {
        if (selection == 1) {
            cm.createExpedition(cwkpq);
            cm.sendOk("The #rCrimsonwood Keep Party Quest Expedition#k has been created.\r\n\r\nTalk to me again to view the current team, or start the fight!");
            cm.dispose();
            return;
        } else if (selection == 2) {
            cm.sendOk("Sure, not everyone's up to attempting Crimsonwood Keep Party Quest.");
            cm.dispose();
            return;
        }
    } else if (status == 2) {
        if (selection == 1) {
            if (expedition == null) {
                cm.sendOk("The expedition could not be loaded.");
                cm.dispose();
                return;
            }
            var size = expedition.getMembers().size();
            if (size == 1) {
                cm.sendOk("You are the only member of the expedition.");
                cm.dispose();
                return;
            }
            var text = "The following members make up your expedition (Click on them to expel them):\r\n";
            text += "\r\n\t\t1." + expedition.getLeader().getName();
            for (var i = 1; i < size; i++) {
                text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedition.getMembers().get(i).getName() + "#l\n";
            }
            cm.sendSimple(text);
            status = 6;
        } else if (selection == 2) {
            cm.sendOk("The expedition will begin and you will now be escorted to the #bEntrance to cwkpq Altar#k.");
            status = 4;
        } else if (selection == 3) {
			player.getMap().broadcastMessage(MaplePacketCreator.removeClock());
			player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, expedition.getLeader().getName() + " has ended the expedition."));
			cm.endExpedition(expedition);
            cm.sendOk("The expedition has now ended. Sometimes the best strategy is to run away.");
			cm.dispose();
            return;
        }
    } else if (status == 4) {
        var min = 1; //cwkpq.getMinSize();
        var size = expedition.getMembers().size();
        if (size < min) {
            cm.sendOk("You need at least " + min + " players registered in your expedition.");
            cm.dispose();
            return;
        }
        if (em == null) {
            cm.sendOk("The event could not be found, please report this on the forum.");
            cm.dispose();
            return;
        }
        cm.sendOk("Good luck! Crimsonwood Keep Party Quest is a worthy challenge!");
		em.setProperty("leader", player.getName());
        em.setProperty("channel", player.getClient().getChannel());
        em.startInstance(expedition);
        cm.dispose();
        return;
    } else if (status == 6) {
        if (selection > 0) {
           var banned = expedition.getMembers().get(selection);
            expedition.ban(banned);
            cm.sendOk("You have banned " + banned.getName() + " from the expedition.");
            cm.dispose();
        } else {
            cm.sendSimple(list);
            status = 2;
        }
    }
}
*/