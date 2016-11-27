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
	Hot Time Event Script
-- Author --------------------------------------------------------------------------------------
	Twdtwd
**/

var timer1;
var timer2;
var timer3;
var timer4;
var hwidsFirst = [];
var hwidsSecond = [];

var items = [[2044713, 1], [2044613, 1], [2044513, 1], [2044420, 1], [2044320, 1],
             [2044220, 1], [2044120, 1], [2044028, 1], [2044813, 1], [2043713, 1],
             [2043313, 1], [2043220, 1], [2043120, 1], [2043022, 1], [2041068, 1],
             [2041069, 1], [2040943, 1], [2040833, 1], [2040834, 1], [2040755, 1],
             [2040756, 1], [2040757, 1], [2040629, 1], [2040542, 1], [2040333, 1],
             [2044817, 1], [2044910, 1],
             [2049100, 2], [2022179, 2], [2022282, 2], [4310000, 2],
             [5050000, 5]];

function init() {
	/*
	if(em.getChannelServer().getId() == 1) { // Only run on channel 1.
		////CEST
		timer1 = em.scheduleAtTimestamp("startOne", 1443884400000);
		timer2 = em.scheduleAtTimestamp("startTwo", 1443970800000);
		// PDT
        timer3 = em.scheduleAtTimestamp("startOne", 1443916800000);
		timer4 = em.scheduleAtTimestamp("startTwo", 1444003200000);
	}
	*/
}

function cancelSchedule() {
}

function startOne() {
    var chars = Packages.net.server.Server.getInstance().getWorld(0).getPlayerStorage().getAllCharacters();
    for each (player in chars) {
		player.getClient().loadHWIDIfNescessary();
        var curHwid = player.getClient().getHWID();
        if(hwidsFirst.indexOf(curHwid) == -1) {
            hwidsFirst.push(curHwid);
            
            player.getCashShop().gainCash(1, 10000);
            
            var item = items[Math.floor(Math.random()*items.length)];
            Packages.server.MapleInventoryManipulator.addById(player.getClient(), item[0], item[1]);
            player.getClient().announce(Packages.tools.MaplePacketCreator.getShowItemGain(item[0], item[1], true));
            player.dropMessage(6, "Thanks for participating in our Fall Hot Time event, you have also gained 10,000 NX!");
        } else {
            player.dropMessage(6, "It looks like you have already participated in the Fall Hot Time event today.");
        }
    }
}

function startTwo() {
    var chars = Packages.net.server.Server.getInstance().getWorld(0).getPlayerStorage().getAllCharacters();
    for each (player in chars) {
        player.getClient().loadHWIDIfNescessary();
        var curHwid = player.getClient().getHWID();
        if(hwidsSecond.indexOf(curHwid) == -1) {
            hwidsSecond.push(curHwid);
            
            player.getCashShop().gainCash(1, 10000);
            
            var item = items[Math.floor(Math.random()*items.length)];
            Packages.server.MapleInventoryManipulator.addById(player.getClient(), item[0], item[1]);
            player.getClient().announce(Packages.tools.MaplePacketCreator.getShowItemGain(item[0], item[1], true));
            player.dropMessage(6, "Thanks for participating in our Fall Hot Time event, you have also gained 10,000 NX!");
        } else {
            player.dropMessage(6, "It looks like you have already participated in the Fall Hot Time event today.");
        }
    }
}

function clear() {
    hwidsFirst = [];
    hwidsSecond = [];
}