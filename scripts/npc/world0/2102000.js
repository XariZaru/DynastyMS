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
/* Author: Xterminator
	NPC Name: 		Asesson
	Map(s): 		Ariant: Ariant Station Platform (260000100)
	Description: 	Ariant Ticketing Usher
*/

//too lazy to shorten
var status = 0;
var ticket = 4031045;

function start() {
	if (cm.getJobId() < 2000) {	
		cm.sendYesNo("Would you like to leave to Orbis?");
	} else if (cm.getQ() < 10 && cm.getJobId() >= 2000) {
        cm.sendOk("You may not leave this town, #h #. You know it isn't safe out there.");
        cm.dispose();
    } else if (cm.getJobId()==2000 && cm.getQ()==10) {
        if (!cm.haveItem(ticket,1)) {
            cm.sendOk("What do you need, #h #?");
            cm.dispose();
        } else {
            cm.sendNext("Why, #h #, you're finally leaving Ariant? It's been such a long time since you've gone anywhere special. Let me see your ticket and we'll be all good to go.");
        }
       } else {
           switch(cm.getOrbisAriantBoatStatus()) {
               case 0:
                cm.sendOk("The boat to Orbis has already taken off, please be patient and wait for next one.");
                cm.dispose();
                break;
            case 1:
                cm.sendOk("The boat to Orbis is ready to take off, please be patient and wait for next one.");
                cm.dispose();
                break;
            case 2:
			   cm.sendYesNo(""+(cm.getQ()==10 ? "Ah, #h #, you are finally leaving desert place, eh? " : "")+"It looks like there's plenty of room for this ride. Please have your ticket ready so I can let you in. The ride will be long but you'll get to your destination just fine. What do you think? Do you want to get on this ride?");  
			   break;
           }
    }
}


function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendNext("You must have some business to take care of here, right?");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
             if (cm.getJobId()==2000 && cm.getQ()==10) {
                 cm.warp(200000100);
                 cm.gainItem(ticket,-1);
                 cm.talkGuide("Okay, now all we have to do is just find Sejan. He must be here somewhere!");
                 cm.dispose();
             } else {
                cm.warp(200000100);
                cm.dispose();
			 }
        }
    }
}