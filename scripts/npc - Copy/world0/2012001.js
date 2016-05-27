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
-- NPC JavaScript --------------------------------------------------------------------------------
	Cherry  - Ellinia Station(101000300)
-- By ---------------------------------------------------------------------------------------------
	BubblesDev 0.75 / ShootSource
-- Version Info -----------------------------------------------------------------------------------

---------------------------------------------------------------------------------------------------
**/


function start(){
        switch(cm.getElliniaOrbisBoatStatus()){ //NOBOAT(0), TOOLATE(1), CANBOARDBOAT(2)
            case 0:
                cm.sendOk("The boat to Orbis has already taken off, please be patient and wait for next one.");
                cm.dispose();
                break;
            case 1:
                cm.sendOk("The boat to Orbis is already ready to take off, please be patient and wait for next one.");
                cm.dispose();
                break;
            case 2:
                cm.sendYesNo("It looks like there are plenty of room for this ride. Please have your ticket ready so I can let you in. The ride will be long, but you'll get to your destination just fine. What do you think? Do you wants to get on this ride?");
                break;
        }
}

function action(mode, type, selection) {
    if(mode == 1){
        cm.warp(200000112);
    }
    cm.dispose();
}