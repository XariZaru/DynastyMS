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

var status = -1;
var minLevel = 55;
var maxLevel = 100;
var minPlayers = 1;
var maxPlayers = 6;

importPackage(Packages.server.partyquest.dynastyPQ);

function start() {
    if (cm.getParty() == null) {
		cm.sendOk("Please form a party before taking on the #bLord Pirate#k. You wouldn't want to go in by yourself, would you?");
		cm.dispose();
	} else if (!cm.isLeader()) {
		cm.sendOk("You're going to need the #eleader#n of your party to come talk to me. No underlings allowed!");
		cm.dispose();
	} else {
		cm.sendYesNo("To take on the #bLord Pirate#k is a daunting task. Do you think you can do that for us?");
	}
}

function action(mode, type, selection) {
    if (mode != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		var em = cm.getEventManager("PiratePQ");
		if (em == null) {
			cm.sendOk("This PQ is currently unavailable.");
		} else if ((cm.getPlayerCount(925100000) && cm.getPlayerCount(925100100) && cm.getPlayerCount(925100200) && cm.getPlayerCount(925100300) && cm.getPlayerCount(925100400) && cm.getPlayerCount(925100500)) < 1) {
			// Begin the PQ.
			em.startInstance(cm.getParty(), cm.getPlayer().getMap());
			//em.setProperty("KPQOpen" , "false");
			// Remove Passes and Coupons GMS DOESNT DO THIS!!!
			//party = cm.getPlayer().getEventInstance().getPlayers();
			//cm.removeFromParty(4001008, party);
			//cm.removeFromParty(4001007, party);
		} else {
			cm.sendOk("There is already another party inside. Please wait !");
		}
		cm.dispose();
	}
}
					
					
