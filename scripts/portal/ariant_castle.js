/*
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
importPackage(Packages.server.maps);

function enter(pi) {
	if (pi.getPlayer().getJob().getId()==2000) {
		if (!isFree(pi) && pi.getPlayer().getMap().getId() == 260000300) {
			pi.getPlayer().dropMessage(5,"There is currently a player in the map; please try another channel.");
			pi.dispose();
			return;
		}
		if (pi.getPlayer().getQuest()==6 && pi.getPlayer().getMapId()==260000300 || pi.getPlayer().getQuest()==8 && pi.getPlayer().getMapId()==260000301) {
			pi.openNpc(2101004);
			return false;
		} else {
			warpOut(pi);
			return true;
		}
	} else {
		pi.getPlayer().dropMessage("The guards stop you from going into the castle.");
	}
}

function isFree(pi) {
	var maps = [260000301,260000302,260000303];
	for (var x = 0; x < maps.length; x++)
		if (pi.getPlayer().getClient().getChannelServer().getMapFactory().getMap(maps[x]).getCharacters().size() > 0)
			return false;
	return true;
}

function warpOut(pi) {
	switch (pi.getPlayer().getMapId()) {
		case 260000300:
			pi.warp(260000301, 1);
			break;
		case 260000301:
			pi.warp(260000300, 1);
			break;
	}
}
