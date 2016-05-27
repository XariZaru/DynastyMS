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
	Hotel Receptionist - Sleepywood Hotel(105040400)
-- By ---------------------------------------------------------------------------------------------
	Unknown
-- Version Info -----------------------------------------------------------------------------------
        1.3 - More Cleanup by Moogra (12/17/09)
        1.2 - Cleanup and Statement fix by Moogra
	1.1 - Statement fix [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var regcost = 499;
var vipcost = 999;
var iwantreg = 0;
var iwantvip = 0;

function start() {
    if (cm.getQ()==33) {
        cm.sendNext("Hello, I'd like to use the #bsauna#k. Is it available?",2);
    } else {
    cm.sendNext("Welcome. We're the Sleepywood Hotel. Our hotel works hard to serve you the best at all times. If you are tired and worn out from hunting, how about a relaxing stay at our hotel?");
    }
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 1))
        cm.dispose();
    else {
        if (mode == 0 && status == 2) {
            cm.sendNext("We offer other kinds of services, too, so please think carefully and then make your decision.");
            cm.dispose();
            return;
        }
        status++;
        if (status == 1) {
            if (cm.getQ()==33) {
                cm.sendYesNo("Oh ... oh! Oh, yes. Yes, we have the sauna available. It'll cost #b1499#k mesos. Is that all right?");
            } else {
            cm.sendSimple("We offer two kinds of rooms for our service. Please choose the one of your liking.\r\n#b#L0#Regular sauna (" + regcost + " mesos per use)#l\r\n#L1#VIP sauna (" + vipcost + " mesos per use)#l");
            iwantreg = 1;
    }
        } else if (status == 2) {
            if (cm.getQ()==33) {
                if (!cm.getMeso()>1499) {
                    cm.sendOk("Oh! But it doesn't seem as if you have #b1499#k mesos.");
                } else {
                    cm.sendOk("Thank you! Enjoy you time at our #bsauna#k.");
                    cm.gainMeso(-1499);
                }
            }
            if (selection == 0)
                cm.sendYesNo("You have chosen the regular sauna. Your HP and MP will recover fast and you can even purchase some items there. Are you sure you want to go in?");
            else if (selection == 1) {
                cm.sendYesNo("You've chosen the VIP sauna. Your HP and MP will recover even faster than that of the regular sauna and you can even find a special item in there. Are you sure you want to go in?");
                iwantvip = 1;
            }
        } else if (status == 3) {
            if (cm.getQ()==33) {
                cm.warp(105040401);
                cm.sendOk("Oh, don't do anything stupid by the way.");
                cm.completeQ();
                cm.dispose();
        } else  if (iwantreg == 1) {
                if (cm.getMeso() >= regcost) {
                    cm.warp(105040401);
                    cm.gainMeso(-regcost);
                } else
                    cm.sendNext("I'm sorry. It looks like you don't have enough mesos. It will cost you at least " + regcost + "mesos to stay at our hotel.");
            } else if (iwantvip == 1) {
                if (cm.getMeso() >= vipcost) {
                    cm.warp(105040402);
                    cm.gainMeso(-vipcost);
                } else
                    cm.sendNext("I'm sorry. It looks like you don't have enough mesos. It will cost you at least " + vipcost + "mesos to stay at our hotel.");
            }
            cm.dispose();
        }
    }
}