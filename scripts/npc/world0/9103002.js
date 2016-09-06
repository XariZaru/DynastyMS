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
/*
 *@Author RMZero213
 * Ludibrium Maze Party Quest
 * Do not release anywhere other than RaGEZONE. Give credit if used.
 */

var status = 0;
var common_rewards = [2002024, 2000006, 2002022, 2002021, 2022001, 2001000, 2060004, 2061004, 2060003, 2061003, 2000004, 2000005, 2020014, 2020015, 2020007, 2020009, 2022000, 2020008, 2020010, 2030010, 2030009, 2030008];
var rare_rewards = [2040504, 2040505, 2040507, 2040508, 2040401, 2040402, 2040404, 2040405, 2040601, 2040602, 2040604, 2040605, 2040901, 2040902, 2040904, 2040905, 2041004, 2041005, 2041028, 2041029, 2041026, 2041027, 2041001, 2041002, 2041017, 2041020];

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection){
    if (mode == -1) {
        cm.dispose();
    }
    if (mode == 0) {
        cm.dispose();
        return;
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var eim = cm.getPlayer().getEventInstance();
            if (eim != null) {
                eim.unregisterPlayer(cm.getPlayer());
            }
            cm.warp(109040000, 0);
			if (Math.floor(Math.random() * 10) == 0)
				cm.gainItem(rare_rewards[Math.floor(Math.random() * rare_rewards.length)], 1, true, true);
			else
				cm.gainItem(common_rewards[Math.floor(Math.random() * common_rewards.length)], Math.random() * 101, true, true);
            cm.dispose();
        }
    }
}