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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Lakelis - Victoria Road: Kerning City (103000000)
-- By ---------------------------------------------------------------------------------------------
	Stereo
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

var status;
var minLevel = 150;
var maxLevel = 255;
var minPlayers = 1;
var maxPlayers = 4;
var maps = [910500100, 910500200, 105100300];
var skills = {
	112: [11101005,10], 122: [11101005,10], 132: [11101005,10], 1111: [1121002,20], 2112: [11101005,10], 
	212: [12101005,20], 222:[12101005,20],  232:[12101005,20],  1211:[2121006,20],  312:[4111006,15],   322:[4111006,15], 
	412: [4221006,30],  422:[4111006,15],   512:[1121002, 20],  522:[1121002, 15],  1511:[1121002, 20], 1411:[1121002, 1], 1311: [4111006, 10]
	};

importPackage(Packages.client);

function start() {
	if (cm.getPlayer().getDynastyQuest("Unlocking a Hidden Power") < 6) {
		cm.sendOk("It's so cold down here ... and desolate.");
		cm.dispose();
		return;
	} else if (cm.getPlayer().getDynastyQuest("Unlocking a Hidden Power") == 8) {
		var skill = skills[cm.getPlayer().getJob().getId()];
		cm.sendOk("That was amazing of you! Here, I gave you a new skill that's bound to your #e~#n key. Check it out! The skill I gave you was #s"+skill[0]+"#");
		//cm.getPlayer().completeDynastyQuest("Unlocking a Hidden Power");
		cm.teachSkill(skill[0], skill[1], skill[1], -1);
		cm.getPlayer().changeKeybinding(41, new MapleKeyBinding(1, skill[0]));
		cm.getPlayer().sendKeymap();
		return;
	} else if (cm.getPlayer().getDynastyQuest("Unlocking a Hidden Power") == 7) {
		status = -1;
		action(1, 0, 0);
	} else {
		cm.sendOk("Thank you for helping me out!");
	}
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
    if (status == 0) {
		if (cm.getPlayer().getEventInstance() != null) {
			if (cm.haveItem(4031906, 1)) {
				cm.getPlayer().getEventInstance().schedule("nextStage", 5);
				cm.gainItem(4031906, -1);
			}
			cm.dispose();
			return;
		}
        if (cm.getParty() == null) { // No Party
            cm.sendOk("How about you and your party members collectively beating a quest? Here you'll find obstacles and problems where you won't be able to beat it without great teamwork.  If you want to try it, please tell the #bleader of your party#k to talk to me.");
            cm.dispose();
        } else if (!cm.isLeader()) { // Not Party Leader
            cm.sendOk("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
            cm.dispose();
        } else {
            var party = cm.getParty().getMembers();
            var inMap = cm.partyMembersInMap();
            var levelValid = 0;
            for (var i = 0; i < party.size(); i++) {
                if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel)
                    levelValid++;
            }
            if (inMap < minPlayers || inMap > maxPlayers) {
                cm.sendOk("Your party is not a party of "+minPlayers+". Please make sure all your members are present and qualified to participate in this quest. I see #b" + inMap + "#k of your party members are in Kerning. If this seems wrong, #blog out and log back in,#k or reform the party.");
                cm.dispose();
            } else if (levelValid != inMap) {
                cm.sendOk("Please make sure all your members are present and qualified to participate in this quest. This PQ requires players ranging from level "+minLevel+" to level "+maxLevel+". I see #b" + levelValid + "#k members are in the right level range. If this seems wrong, #blog out and log back in,#k or reform the party.");
                cm.dispose();
            } else {
                var em = cm.getEventManager("BalrogAlone");
                if (em == null) {
                    cm.sendOk("This PQ is currently unavailable.");
                } else if ((cm.getPlayerCount(maps[0]) && cm.getPlayerCount(maps[1]) && cm.getPlayerCount(maps[2])) < 1) {
                    // Begin the PQ.
					cm.getPlayer().setEventInstance(null);
                    em.startInstance(cm.getParty(), cm.getPlayer().getMap());
                    em.setProperty("open" , "false");
                    // Remove Passes and Coupons GMS DOESNT DO THIS!!!
                    //party = cm.getPlayer().getEventInstance().getPlayers();
                    //cm.removeFromParty(4001008, party);
                    //cm.removeFromParty(4001007, party);
                } else {
                    cm.sendNext("There is already another party inside. Please wait !");
                }
                cm.dispose();
            }
        }
    }
}


/*/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
//@Author FateJiki
//@Author Even (modifier)
/*
importPackage(Packages.server.expeditions);
importPackage(Packages.tools);
importPackage(Packages.scripting.event);


var status = 0;
var expedition;
var player;
var em;
var barlog_easy = MapleExpeditionType.BALROG_EASY;
var barlog_hard = MapleExpeditionType.BALROG_HARD;

function start(){
    status = 0;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
        cm.dispose();
    } else if (status == 0) {
        cm.sendNext("Hi there. I am #b#nMu Young#n#k, the temple Keeper.");
        status++;
    } else if (BalrogPQ.partyLeader == "undefined") {
        if (status == 1) {
        var text = "This temple is currently under siege by the Balrog troops. We currently do not know who gave the orders. " +
            "For a few weeks now, the #e#b Order of the Altair#n#k has been sending mercenaries, but they were eliminated every time." +
            " So, traveler, would you like to try your luck at defeating this unspeakable horror? \r\n\r\n " +
            "#L0#Yes. Please register me as party leader\r\n#L1#What is the #eOrder of the Altair?";
        cm.sendSimple(text);
        status++;
        } else if (selection == 0) {
            if (cm.getPlayer().getLevel() >= 70) {
                BalrogPQ.partyLeader = cm.getPlayer().getName();
                cm.sendOk("Success. Your name has been registered and you may enter the battlefield. Come speak to me when you're ready!");
                cm.getPlayer().getMap().broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(0, cm.getPlayer().getName() + " is currently fighting the balrog on CH" + cm.getPlayer().getClient().getChannel() + ". To join, do @balrogpq."))
                BalrogPQ.open(cm.getPlayer());
                cm.dispose();
            } else if (cm.getPlayer().getLevel() < 70) {
                cm.sendOk("You must be at least level 70 to even consider battling the monster.");
                cm.dispose();
            }
        } else if (selection == 1) {
            cm.sendOk("The Order of the Altair is a group of elite mercenaries that oversee the world's economy and battle operations. It was founded 40 years ago right after Black Mage was defeated in hopes of forseeing the next possible attack.");
            cm.dispose();
        } else if (status == 3) {
            cm.warp(105100300);
            cm.dispose();
        }
        } else {
            if (status == 1) {
            cm.sendYesNo(BalrogPQ.partyLeader + "'s party is currently battling the Balrog. Would you like to assist?");
            status++;
            } else if(status == 2){
                if (cm.getPlayer().getLevel() > 60 && cm.getPlayer().getClient().getChannel() == BalrogPQ.channel){
                cm.warp(105100300);
                cm.dispose();
                } else {
                    cm.sendOk("You may not battle the balrog when you are below Lv60! \r\n\r\n Or maybe you are not on the right channel.. Try CH" + BalrogPQ.channel + ".");
                    cm.dispose();
                }
            }
        }
}
*/