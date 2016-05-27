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

/* Regular Cab @ Henesys */

var status = 0;
var maps = [104000000, 102000000, 101000000, 103000000, 120000000, 104000000, 102000000, 101000000, 103000000, 120000000];
var cost = [120, 120, 80, 100, 120, 1200, 1200, 800, 1000, 1200];
var sel = -1;

function start() {
    cm.sendNext("Hello, I drive the Regular Cab. If you want to go from town to town safely and fast, then ride our cab. We'll glady take you to your destination with an affordable price.");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("There's a lot to see in this town, too. Come back and find us when you need to go to a different town.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (cm.getJobId() == 0) {
                cm.sendSimple("We have a special 90% discount for beginners. Choose your destination for fees will change from place to place.#b\n\
\r\n #L0# Lith Harbor (120 mesos)#l \r\n #L1# Perion (120 mesos)#l \r\n #L2# Ellinia (80 mesos)#l \r\n #L3# Kerning City (100 mesos)#l \r\n #L4# Nautilus Harbor (120 mesos)#l");                
            } else {               
                cm.sendSimple("Choose your destination, for fees will change from place to place.#b\n\
\r\n #L5# Lith Harbor (1200 mesos)#l \r\n #L6# Perion (1200 mesos)#l \r\n #L7# Ellinia (800 mesos)#l \r\n #L8# Kerning City (1000 mesos)#l \r\n #L9# Nautilus Harbor (1200 mesos)#l");
            }
        } else if (status == 2) {
            cm.sendYesNo("You don't have anything else to do here, huh? Do you really want to go to #b#m" + maps[selection] + "##k? It'll cost you #b"+ cost[selection] + " mesos#k.");
            sel = selection;
        } else if (status == 3) {
            if (cm.getMeso() < cost[sel]) {
                cm.sendNext("You don't have enough mesos. Sorry to say this, but without them, you won't be able to ride the cab.");
                cm.dispose();
                return;
            } else {
                cm.warp(maps[sel], 0);
                cm.gainMeso(-cost[sel]);
                cm.dispose();
                return;
            }
        }
    }
}