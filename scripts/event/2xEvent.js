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
/**
-- Odin JavaScript --------------------------------------------------------------------------------
	2x EXP Event Script
-- Author --------------------------------------------------------------------------------------
	Twdtwd, Jesus Christ, maplefreak26, Willi, Jebus, 420masterrace, Gabe Newell, David 2
**/

var timer1;
var timer2;
var timer3;
var timer4;

importPackage(Packages.client);

function init() {
	if(em.getChannelServer().getId() == 1) { // Only run on channel 1.
		////CEST
		//timer1 = em.scheduleAtTimestamp("start", 1440856800000);
		//timer2 = em.scheduleAtTimestamp("stop", 1440864000000);
		// PDT
		//timer1 = em.scheduleAtTimestamp("start", 1442584800000);
		//timer2 = em.scheduleAtTimestamp("stop", 1442685307000);
	}
}

function cancelSchedule() {
    if (timer1 != null)
        timer1.cancel(false);
	if (timer2 != null)
        timer2.cancel(false);
	if (timer3 != null)
        timer3.cancel(false);
	if (timer4 != null)
        timer4.cancel(false);
}

function start() {
   var world = Packages.net.server.Server.getInstance().getWorld(em.getChannelServer().getWorld());
   world.setExpRate(7);
   world.broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(6, "The 12 Hour EXP Event has started! Enjoy 7x EXP for the next twelve hours!"));
}

function stop() {
   var world = Packages.net.server.Server.getInstance().getWorld(em.getChannelServer().getWorld());
   world.setExpRate(5);
   world.broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(6, "The 12 Hour EXP Event has ended!"));
}