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
       By : JustKyo/Ragon
       Mr. Thunder
	Victoria Road: Perion (102000000)
	
	Refining NPC: 
	* Minerals
	* Jewels
	* Shields
	* Helmets
*/
var status = -1;
var selected = -1;
var amount = -1;
var req = 10;
var refined = [4011000,4011001,4011002,4011003,4011004,4011005,4011006,4021000,4021001,4021002,4021003,4021004,4021005,4021006,4021007,4021008];
var ores = [4010000,4010001,4010002,4010003,4010004,4010005,4010006,4020000,4020001,4020002,4020003,4020004,4020005,4020006,4020007,4020008];
var cost = [300,300,300,500,500,500,800,500,500,500,500,500,500,500,1000,3000];
    
function start() {
    action (1, 0, 0);
}

function action (mode, type, selection) {
    if (mode != 1) {
                cm.dispose();
                return;
        }
        status++;
        if (status == 0) {
            cm.sendSimple("Hm? Who might you be? Oh, you've heard about my forging skills? In that case, I'd be glad to process some of your ores... for a fee.#b \r\n #L1000# Refine a mineral ore #l \r\n #L1001# Refine a jewel ore #l");
        } else if (status == 1) {
            if (selection == 1000) {
                cm.sendSimple("So, what kind of mineral ore would you like to refine?#b \r\n #L0# Bronze #l \r\n #L1# Steel #l \r\n #L2# Mithril #l \r\n #L3# Adamantium #l \r\n #L4# Silver #l \r\n #L5# Orihalcon #l \r\n #L6# Gold #l");
            } else if (selection == 1001) {
                cm.sendSimple("So, what kind of jewel ore would like to refine?#b \r\n #L7# Garnet #l \r\n #L8# Amethyst #l \r\n #L9# Aquamarine #l \r\n #L10# Emerald #l \r\n #L11# Opal #l \r\n #L12# Sapphire #l \r\n #L13# Topaz #l \r\n #L14# Diamond #l \r\n #L15# Black Crystal #l");
            }
        } else if (status == 2) {
            selected = selection;
            cm.sendGetNumber("So, you want me to make some #t" + refined[selection] + "#s? In that case, how many do you want me to make?", 1, 1, 6000);
        } else if (status == 3) {
            amount = selection;
            cm.sendYesNo("You want me to make " + selection + " #t" + refined[selected] + "#? In that case, I'm going to need specific items from you in order to make it. Make sure you have room in your inventory, though! \r\n #b#i"+ ores[selected] +"# "+ 10*selection +" #t"+ ores[selected] +"# \r\n #i4031138# "+ cost[selected]*[selection] +" meso")
        } else if (status == 4 && mode == 1) {
            if (cm.haveItem(ores[selected], 10*amount) && cm.getMeso() > cost[selected]*amount) {
                cm.gainItem(refined[selected], amount);
                cm.gainItem(ores[selected], -10*amount);
                cm.gainMeso(-cost[selected]*amount);
            } else {
                cm.sendOk("I can't refine anything for you without the proper items.");
            }
        }
}