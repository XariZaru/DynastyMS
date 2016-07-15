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
		var maps = [925100000, 925100100, 925100200, 925100300, 925100400, 925100500];
		for (var x in maps) {
			if (cm.getPlayerCount(maps[x]) > 0) {
				cm.sendOk("There is currently another party contesting the #bLord Pirate's#k ship at the moment.");
				cm.dispose();
				return;
			}
			cm.getClient().getChannelServer().getMapFactory().getMap(maps[x]).resetAll();
		}
		cm.getParty().setPQ(new PiratePQ(cm.getParty()));
		cm.warpParty(925100000);
		cm.dispose();
	}
}
					
					
