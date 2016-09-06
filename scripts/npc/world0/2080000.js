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
var status = 0;
var selectedType = -1;
var selectedItem = -1;
var stimulator = false;
var item;
var mats;
var matQty;
var cost;
var stimID;
var cost = 120000;

function start() {
    var selStr = "A dragon's power is not to be underestimated. If you like, I can add its power to one of your weapons. However, the weapon must be powerful enough to hold its potential...#b"
    var options = new Array("What's a stimulator?","Create a Warrior weapon","Create a Bowman weapon","Create a Magician weapon","Create a Thief weapon",
        "Create a Pirate weapon", "Create a Warrior weapon with a Stimulator","Create a Bowman weapon with a Stimulator","Create a Magician weapon with a Stimulator","Create a Thief weapon with a Stimulator", "Create a Pirate weapon with a Stimulator");
    for (var i = 0; i < options.length; i++)
        selStr += "\r\n#L" + i + "# " + options[i] + "#l";
    cm.sendSimple(selStr);
}

function action(mode, type, selection) {
    if (mode < 0) {
		cm.dispose();
		return;
	}
	status++;
    if (status == 1) {
		// Textual selections
		var warrior_selections = ["Dragon Carbella#k - Lv. 110 One-Handed Sword#b","Dragon Axe#k - Lv. 110 One-Handed Axe#b","Dragon Mace#k - Lv. 110 One-Handed BW#b","Dragon Claymore#k - Lv. 110 Two-Handed Sword#b","Dragon Battle Axe#k - Lv. 110 Two-Handed Axe#b","Dragon Flame#k - Lv. 110 Two-Handed BW#b",
                "Dragon Faltizan#k - Lv. 110 Spear#b","Dragon Chelbird#k - Lv. 110 Polearm#b"];
		var mage_selections = ["Dragon Wand#k - Lv. 108 Wand#b","Dragon Staff#k - Lv. 110 Staff#b"];
		var bow_selections = ["Dragon Shiner Bow#k - Lv. 110 Bow#b","Dragon Shiner Cross#k - Lv. 110 Crossbow#b"];
		var thief_selections = ["Dragon Kanzir#k - Lv. 110 STR Dagger#b","Dragon Kreda#k - Lv. 110 LUK Dagger#b","Dragon Green Sleve#k - Lv. 110 Claw#b"];
		var pirate_selections = ["Dragon Slash Claw - Lv. 110 Knuckle", "Dragon Revolver - Lv. 110 Gun"];
		// Combine all array selections into one big array for looping
		var weapons = ["", warrior_selections, bow_selections, mage_selections, thief_selections, pirate_selections];
        selectedType = selection;
        if (stimulator = selectedType > weapons.length - 1) { // If they choose to use a stimulator
            selection = selectedType -= weapons.length - 1;
		} else if (selectedType == 0) { //What's a stim?
            cm.sendNext("A stimulator is a special potion that I can add into the process of creating certain items. It gives it stats as though it had dropped from a monster. However, it is possible to have no change, and it is also possible for the item to be below average. There's also a 10% chance of not getting any item when using a stimulator, so please choose wisely.")
            cm.dispose();
			return;
		}
		var str = "Very well, which "+ (selection == 1 ? "warrior" : selection == 2 ? "bow" : selection == 3 ? "magician" : "thief") +" weapon shall receive a dragon's power" +(stimulator ? " #eand be stimulated#n" : "")+ "?#b";
		for (var x = 0; x < weapons[selection].length; x++)
			str += "\r\n#L" + x + "# " + weapons[selection][x] + "#l";
		cm.sendSimple(str);
    } else if (status == 2) {
		var itemSet, matSet, matQtySet;
        selectedItem = selection;
		
		// Material requirements for each weapon
        if (selectedType == 1){ //warrior weapon
            itemSet = new Array(1302059,1312031,1322052,1402036,1412026,1422028,1432038,1442045);
            matSet = new Array(new Array(1302056,4000244,4000245,4005000),new Array(1312030,4000244,4000245,4005000),new Array(1322045,4000244,4000245,4005000),new Array(1402035,4000244,4000245,4005000),
                new Array(1412021,4000244,4000245,4005000),new Array(1422027,4000244,4000245,4005000),new Array(1432030,4000244,4000245,4005000),new Array(1442044,4000244,4000245,4005000));
            matQtySet = new Array(new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8));
        } else if (selectedType == 2){ //bowman weapon
            itemSet = new Array(1452044,1462039);
            matSet = new Array(new Array(1452019,4000244,4000245,4005000,4005002),new Array(1462015,4000244,4000245,4005000,4005002));
            matQtySet = new Array(new Array(1,20,25,3,5),new Array(1,20,25,5,3));
        } else if (selectedType == 3){ //magician weapon
            itemSet = new Array(1372032,1382036);
            matSet = new Array(new Array(1372010,4000244,4000245,4005001,4005003),new Array(1382035,4000244,4000245,4005001,4005003));
            matQtySet = new Array(new Array(1,20,25,6,2),new Array(1,20,25,6,2));
        } else if (selectedType == 4){ //thief weapon
            itemSet = new Array(1332049,1332050,1472051);
            matSet = new Array(new Array(1332051,4000244,4000245,4005000,4005002),new Array(1332052,4000244,4000245,4005002,4005003),new Array(1472053,4000244,4000245,4005002,4005003));
            matQtySet = new Array(new Array(1,20,25,5,3),new Array(1,20,25,3,5),new Array(1,20,25,2,6));
        } else if (selectedType == 5) {
			itemSet = new Array(1482013, 1492013);
			matSet = new Array(new Array(4011003, 4004000, 4000244, 4000245), new Array(4011003, 4004000, 4000244, 4000245));
			matQtySet = new Array(new Array(5, 8, 20, 20), new Array(5, 8, 20, 20));
		}
		
		item = itemSet[selectedItem];
		mats = matSet[selectedItem];
		matQty = matQtySet[selectedItem];
		
        var prompt = "You want me to make a #b#z" + item + "##k? In that case, I'm going to need specific items from you in order to make it. Make sure you have room in your inventory, though!#b\r\n";
        
		if(stimulator) { // Using a stimulator
            stimID = mats.unshift(getStimID(item));
			matQty.unshift(1);
        }
		
        for(var i = 0; i < mats.length; i++)
			prompt += "\r\n#i"+mats[i]+"# " + matQty[i] + " #t" + mats[i] + "#";
        cm.sendYesNo(prompt + "\r\n#i4031138# " + cost + " meso");
		
    } else if (status == 3) {
        var complete = true;
        if (cm.getMeso() < cost) { // Fee check
            cm.sendOk("My fee is for the good of all of Leafre. If you cannot pay it, then begone.");
			cm.dispose();
			return;
		}
		
		for(var i = 0; complete && i < mats.length; i++) // Check if player has materials
			if (!cm.haveItem(mats[i], matQty[i]))
				complete = false;
			
        if (!complete)
            cm.sendOk("I'm afraid that without the correct items, the dragon's essence would... not make for a very reliable weapon. Please bring the correct items next time.");
		
        else {
				for (var i = 0; i < mats.length; i++) // Lose items regardless of success
					cm.gainItem(mats[i], -matQty[i]);
				cm.gainMeso(-cost);
				if (stimulator && Math.floor(Math.random() * 10) == 0) {
					cm.sendOk("Unfortunately, the dragon's essence has... conflicted with your weapon. My apologies for your loss.");
				} else {
					!stimulator ? cm.gainItem(item, 1) : cm.gainItem(item, 1, true, true);
					cm.sendOk("The process is complete. Treat your weapon well, lest you bring the wrath of the dragons upon you.");
				}
            }
        cm.dispose();
    }
}

function getStimID(equipID){
    var cat = Math.floor(equipID / 10000);
    switch (cat){
        case 130: //1h sword
            return 4130002;
        case 131: //1h axe
            return 4130003;
        case 132: //1h bw
            return 4130004;
        case 140: //2h sword
            return 4130005;
        case 141: //2h axe
            return 4130006;
        case 142: //2h bw
            return 4130007;
        case 143: //spear
            return 4130008;
        case 144: //polearm
            return 4130009;
        case 137: //wand
            return 4130010;
        case 138: //staff
            return 4130011;
        case 145: //bow
            return 4130012;
        case 146: //xbow
            return 4130013;
        case 133: //dagger
            return 4130014;
        case 147: //claw
            return 4130015;
    }
    return 4130002;
}