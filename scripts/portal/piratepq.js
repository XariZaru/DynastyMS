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
function enter(pi) {
	var map = pi.getPlayer().getMap();
	var next = "next00";
	if (map.getId() == 925100000) { // Kill monsters
		if (map.getPortal(next).getPortalState())
			pi.warp(925100100);
		else
			pi.getPlayer().dropMessage("You must eliminate all the monsters on this map!");
	} else if (map.getId() == 925100100) { // Collect passes
		if (map.getPortal(next).getPortalState())
			pi.warp(925100200);
		else
			pi.getPlayer().dropMessage("You must talk to Guon and complete his tasks before continuing!");
	} else if (map.getId() == 925100200) { // Kill monsters
		if (map.getPortal(next).getPortalState())
			pi.warp(925100300);
		else
			pi.getPlayer().dropMessage("You must kill all the monsters on this map!");
	} else if (map.getId() == 925100300) { // Kill monsters
		if (map.getPortal(next).getPortalState())
			pi.warp(925100400);
		else
			pi.getPlayer().dropMessage("You must kill all the monsters on this map!");
	} else if (map.getId() == 925100400) {
		if (map.getPortal(next).getPortalState()) {
			pi.warp(925100500);
			pi.getPlayer().getMap().spawnMonsterOnGroundBelow(9300119, 506, 238);
		} else
			pi.getPlayer().dropMessage("You have to gather keys to unlock these doors!");
	}
	return map.getPortal(next).getPortalState() ? true : false;
}
