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
/* Magician Job Instructor
	Magician's Tree Dungeon (108000200-108000202)
	Used to turn in dark marbles for the magician second job advancement.
    @author Twdtwd
 */

var status;
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (cm.getJobId() == 200 && cm.getLevel() >= 30) {
            if(cm.hasItem(4031013, 30)) {
                if(status == 0) {
                    cm.sendNext("Amazing, you've collected 30 #t4031013#s! It must have been difficult.Very well, you have passed the test. As a reward I am giving you a #b#t4031012##k. Take it with you and go back to #m101000000#.");
                } else if(status == 1) {
                    cm.removeAll(4031013);
                    cm.removeAll(4031009);
                    cm.gainItem(4031012, 1);
                    cm.warp(101020000);
                    cm.dispose();
                } else {
                    cm.dispose();
                }
            } else {
                if(status  == -1) {
                    cm.sendOk("That's right! Stop complaining and finish the test. Come talk to me when you have collected the 30 #t4031013#s.");
                    cm.dispose();
                } else if(status == 0) {
                    cm.sendYesNo("What's wrong? I don't think you've found 30 #t4031013#s yet. If you are having problems completing the test you can leave and return again later. Do you want to give up and try again later?");
                } else if(status == 1) {
                    cm.sendNext("Are you sure? Okay, I will let you out. But don't give up. You can always come back later to try again. Until you do, goodbye.");
                } else if(status == 2) {
                    cm.warp(101020000);
                    cm.dispose();
                } else {
                    cm.dispose();
                }
            }
		} else {
            if(status == 0) {
                cm.sendOk("What? How did you get here? How strange.. well, I'll let you out. This is a very dangerous place. Go away or risk getting hurt.");
            } else if(status == 1) {
                cm.warp(101020000);
                cm.dispose();
            } else {
                cm.dispose();
            } 
        }
    }
}