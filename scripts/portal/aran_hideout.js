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
	if (pi.getPlayer().getJob().getId() < 2000) {
		pi.getPlayer().dropMessage("A guard near the entrance stops you from entering. It seems you must be a part of their organization to enter.");
		return false;
	} else if (pi.getPlayer().getClient().getChannelServer().getMapFactory().getMap(920030001).getCharacters().size() > 0) {
		pi.getPlayer().dropMessage("A guard shakes his head and tells you someone is inside. Perhaps you should come back later or change channels.");
		return false;
	} else {
		pi.warp(920030001);
		return true;
	}
}