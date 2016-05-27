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

/* Vogen
	El Nath: El Nath Market (211000100)
	By: JustKyo/Trebor
	Refining NPC: 
	* Minerals
	* Jewels
	* Moon/Star Rocks
	* Crystals (including Dark)
	* Processed Wood/Screws
	* Arrows/Bronze Arrows/Steel Arrows
*/
var status = -1;
var selected = -1;
var amount = -1;
var req = 10;
var refined = [4011000,4011001,4011002,4011003,4011004,4011005,4011006,4021000,4021001,4021002,4021003,4021004,4021005,4021006,4021007,4021008,4005000,4005001,4005002,4005003,4005004,4011007,4021009];
var ores = [4010000,4010001,4010002,4010003,4010004,4010005,4010006,4020000,4020001,4020002,4020003,4020004,4020005,4020006,4020007,4020008,4004000,4004001,4004002,4004003,4004004];
var cost = [300,300,300,500,500,500,800,500,500,500,500,500,500,500,1000,3000,5000,5000,5000,5000,1000000,10000,15000];
var srockreq = [4011000,4011001,4011002,4011003,4011004,4011005,4011006];
var mrockreq = [4021000,4021001,4021002,4021003,4021004,4021005,4021006,4021007,4021008];

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
            cm.sendSimple("Hm? Who might you be? Oh, you've heard about my forging skills? In that case, I'd be glad to process some of your ores... for a fee.#b \r\n #L1000# Refine a mineral ore #l \r\n #L1001# Refine a jewel ore #l \r\n #L1003# Refine a rare jewel #l \r\n #L1002# Refine a crystal ore #l");
        } else if (status == 1) {
            if (selection == 1000) {
                cm.sendSimple("So, what kind of mineral ore would you like to refine?#b \r\n #L0# Bronze #l \r\n #L1# Steel #l \r\n #L2# Mithril #l \r\n #L3# Adamantium #l \r\n #L4# Silver #l \r\n #L5# Orihalcon #l \r\n #L6# Gold #l");
            } else if (selection == 1001) {
                cm.sendSimple("So, what kind of jewel ore would like to refine?#b \r\n #L7# Garnet #l \r\n #L8# Amethyst #l \r\n #L9# Aquamarine #l \r\n #L10# Emerald #l \r\n #L11# Opal #l \r\n #L12# Sapphire #l \r\n #L13# Topaz #l \r\n #L14# Diamond #l \r\n #L15# Black Crystal #l");
            } else if (selection == 1002) {
                cm.sendSimple("Crystal ore? It's hard to find those around here...#b \r\n #L16# Power Crystal #l \r\n #L17# Wisdom Crystal #l \r\n #L18# DEX Crystal #l \r\n #L19# LUK Crystal #l \r\n #L20# Dark Crystal #l")
            } else if (selection == 1003) {
                cm.sendSimple("A rare jewel? Which one were you thinking of? #b \r\n #L21# Moon Rock #l \r\n #L22# Star Rock #l");
            }
        } else if (status == 2) {
            selected = selection;
            cm.sendGetNumber("So, you want me to make some #t" + refined[selection] + "#s? In that case, how many do you want me to make?", 1, 1, 6000);
        } else if (status == 3) {
            amount = selection;
            if (selected > -1 && selected < 21) {
                cm.sendYesNo("You want me to make " + selection + " #t" + refined[selected] + "#? In that case, I'm going to need specific items from you in order to make it. Make sure you have room in your inventory, though! \r\n #b#i"+ ores[selected] +"# "+ 10*selection +" #t"+ ores[selected] +"# \r\n #i4031138# "+ cost[selected]*[selection] +" meso");
            } else if (selected == 21) {
                cm.sendYesNo("You want me to make " + selection + " #t" + refined[selected] + "#? In that case, I'm going to need specific items from you in order to make it. Make sure you have room in your inventory, though!#b \r\n #i4011000# "+selection+" #t4011000# \r\n #i4011001# "+selection+" #t4011001# \r\n #i4011002# "+selection+" #t4011002# \r\n #i4011003# "+selection+" #t4011003# \r\n #i4011004# "+selection+" #t4011004# \r\n #i4011005# "+selection+" #t4011005# \r\n #i4011006# "+selection+" #t4011006# \r\n #i4031138# "+cost[selected]*selection+" meso");
            } else if (selected == 22) {
                cm.sendYesNo("You want me to make " + selection + " #t" + refined[selected] + "#? In that case, I'm going to need specific items from you in order to make it. Make sure you have room in your inventory, though!#b \r\n #i4021000# "+selection+" #t4021000# \r\n #i4021001# "+selection+" #t4021001# \r\n #i4021002# "+selection+" #t4021002# \r\n #i4021003# "+selection+" #t4021003# \r\n #i4021004# "+selection+" #t4021004# \r\n #i4021005# "+selection+" #t4021005# \r\n #i4021006# "+selection+" #t4021006# \r\n #i4021007# "+selection+" #t4021007# \r\n #i4021008# "+selection+" #t4021008# \r\n #i4031138# "+cost[selected]*selection+" meso");
            }
        } else if (status == 4 && mode == 1) {
            if (selected > -1 && selected < 21) {
                if (cm.haveItem(ores[selected], 10*amount) && cm.getMeso() >= cost[selected]*amount) {
                    cm.gainItem(refined[selected], amount);
                    cm.gainItem(ores[selected], -10*amount);
                    cm.gainMeso(-cost[selected]*amount);
                } else {
                    cm.sendOk("I can't refine anything for you without the proper items.");
                }
            } else if (selected == 21) {
                if (cm.haveItem(4011000, amount) && cm.haveItem(4011001, amount) && cm.haveItem(4011002, amount) && cm.haveItem(4011003, amount) && cm.haveItem(4011004, amount) && cm.haveItem(4011005, amount) && cm.haveItem(4011006, amount) && cm.getMeso() >= cost[selected]*amount) {
                    cm.gainItem(refined[selected], amount);
                    cm.gainItem(4011000, -amount);
                    cm.gainItem(4011001, -amount);
                    cm.gainItem(4011002, -amount);
                    cm.gainItem(4011003, -amount);
                    cm.gainItem(4011004, -amount);
                    cm.gainItem(4011005, -amount);
                    cm.gainItem(4011006, -amount);
                    cm.gainMeso(-cost[selected]*amount);
                } else {
                    cm.sendOk("I can't refine anything for you without the proper items.");
                }
            } else if (selected == 22) {
                if (cm.haveItem(4021000, amount) && cm.haveItem(4021001, amount) && cm.haveItem(4021002, amount) && cm.haveItem(4021003, amount) && cm.haveItem(4021004, amount) && cm.haveItem(4021005, amount) && cm.haveItem(4021006, amount) && cm.haveItem(4021007, amount) && cm.haveItem(4021008, amount) && cm.getMeso() >= cost[selected]*amount) {
                    cm.gainItem(refined[selected], amount);
                    cm.gainItem(4021000, -amount);
                    cm.gainItem(4021001, -amount);
                    cm.gainItem(4021002, -amount);
                    cm.gainItem(4021003, -amount);
                    cm.gainItem(4021004, -amount);
                    cm.gainItem(4021005, -amount);
                    cm.gainItem(4021006, -amount);
                    cm.gainItem(4021007, -amount);
                    cm.gainItem(4021008, -amount);
                    cm.gainMeso(-cost[selected]*amount);
                } else {
                    cm.sendOk("I can't refine anything for you without the proper items.");
                }
            }
        }
}