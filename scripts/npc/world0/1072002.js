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
/* Bowman Job Instructor
	Map Name (Map ID)
	Used to warp to the test for bowman second job advancement.
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
        
        if(cm.getLevel() >= 30 && cm.getJobId() == 300) {
            if(cm.haveItem(4031010)) {
                if(!cm.haveItem(4031013)) { // Check to see if they have any dark marbles already.
                    if (status == 0) {
                        cm.sendNext("Hmm. That's definitely a letter from #p1012100#. So you came here to try the test for your job advancement? Okay, I will explain the test to you then. Don't worry, it's not difficult.");
                    } else if(status == 1) {
                        cm.sendNextPrev("I will send you to a secret map. There, you will see monsters that are completely new to you. They look like ordinary creatures, but have a completely different behavior. They don't give you any experience or drop any items.");
                    } else if(status == 2 && mode == 0) {
                        cm.sendOk("You don't seem very prepared for it. Talk to me only when you are ready to enter. There aren't any portals or shops inside, so make sure you are 100% prepared.");
                        cm.dispose();
                    } else if(status == 2) {
                        cm.sendNextPrev("You will get an item called #b#t4031013##k when you kill the monsters inside this map. It's a special glass orb made by evil and sinister minds. Obtain #b30#k of them and talk to my colleague who is inside the map. That is how you will pass the test.");
                    } else if(status == 3) {
                        cm.sendYesNo("Once you are inside, you won't be able to leave the map without completing the test. If you die inside, you will still lose experience. I suggest you tighten your belt and prepare. Good? Are you ready to go inside?");    
                    } else if(status == 4) {
                        cm.sendOk("Okay, I'll let you in. Defeat the monsters inside, collect 30 #b#t4031013##k and then talk to my colleague who is also inside the map. He will give you a #b#t4031012##k when you complete the test, proving you have passed it. Good luck to you.");
                    } else if(status == 5) {
                        cm.removeAll(4031013);
                        var map = Math.floor(Math.random() * 3);
                        cm.warp(108000100 + map);
                        cm.dispose();
                    } else {
                        cm.dispose();
                    }
                } else {
                    if(status == -1) {
                        cm.sendOk("You don't seem very prepared for it. Talk to me only when you are ready to enter. There aren't any portals or shops inside, so make sure you are 100% prepared.");
                        cm.dispose();
                    } else if(status == 0) {
                        cm.sendYesNo("So you've given up once already. Don't worry though, you can always retake the test. Do you want to go back and try again?");
                    } else if(status == 1) {
                        cm.sendNext("Okay, I'll let you in. I'm sorry, but I can't let you in with any #t4031013#s. I'll have to take them from you before you enter again. Remember, defeat the monsters inside, collect 30 #b#t4031013##k and then talk to my colleague who is also inside the map. He will give you a #b#t4031012##k when you complete the test, proving you have passed it. Good luck to you.");
                    } else if(status == 2) {
                        cm.removeAll(4031013);
                        var map = Math.floor(Math.random() * 3);
                        cm.warp(108000100 + map);
                        cm.dispose();
                    } else {
                        cm.dispose();
                    }
                }
            } else {
                cm.sendOk("You want to become a much stronger warrior than you already are? I'll take care of that, you seem to be more than qualified. Go talk to #b#p1012100##k in #m100000000# first, then come back to see me.");
                cm.dispose();
            }
        } else if(cm.getLevel() < 30 && cm.getJobId() == 300) {
            cm.sendOk("You want to become a even stronger archer? I'll take care of that, but you seem too weak. Keep training, become stronger and then come back to see me.");
            cm.dispose();
        } else if(cm.getJobId() > 300 && cm.getJobId() < 400) {
            cm.sendOk("Hmm... It was you who passed my test the other day! Have you become stronger? Good! Now keep training to grow even stronger.");
            cm.dispose();
        } else {
            cm.dispose();
        }
        
    }
}