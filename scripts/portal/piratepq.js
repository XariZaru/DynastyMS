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
	var eim = pi.getPlayer().getEventInstance();
	var portal = pi.getPlayer().getMap().getPortal("next00");
	if (portal.getPortalState()) {
		pi.getPlayer().changeMap(pi.getPlayer().getEventInstance().getMapInstance((pi.getPlayer().getMap().getId() + 100)));
		if (pi.getPlayer().getMap().getId() === 925100500 && eim.getEm().getProperty("piratelord").equals("0")) {
			var counter = 0;
			if (eim.getEm().getProperty("stage2a").equals("1"))
				counter++;
			if (eim.getEm().getProperty("stage3a").equals("1"))
				counter++;
			var mobid;
			switch (counter) {
				case 0:
					mobid = 9300107;
					break;
				case 1:
					mobid = 9300105;
					break;
				default:
					mobid = 9300106;
					break;
			}
			eim.getEm().setProperty("piratelord", 1);
			pi.getPlayer().getMap().spawnMonsterOnGroundBelow(mobid, 508, 238);
		}
	}
    return true;
}