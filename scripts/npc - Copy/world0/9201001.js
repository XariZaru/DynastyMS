///*
//	This file is part of the OdinMS Maple Story Server
//    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
//		       Matthias Butz <matze@odinms.de>
//		       Jan Christian Meyer <vimes@odinms.de>
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU Affero General Public License as
//    published by the Free Software Foundation version 3 as published by
//    the Free Software Foundation. You may not use, modify or distribute
//    this program under any other version of the GNU Affero General Public
//    License.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU Affero General Public License for more details.
//
//    You should have received a copy of the GNU Affero General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
///*
// *  Chair Gachapon NPC, Nana(H) 9201001
// */
// 
//var gachatix = 5220000;
//var chairs = [3010000, 3010001, 3010002, 3010003, 3010004, 3010005, 3010006, 3010007, 3010008, 3010009, 3010010, 3010011, 3010012, 3010013, 3010014, 3010015, 3010016, 3010017, 3010018, 3010019, 3010025, 3011000, 3010040, 3010041, 3010045, 3012005, 3010046, 3010047, 3010072, 3010057, 3010058, 3010060, 3010061, 3010062, 3010063, 3010064, 3010065, 3010066, 3010067, 3010043, 3010071, 3010085, 3010098, 3010116, 3010101, 3010073, 3010099, 3010106, 3010111, 3010080, 3010081, 3010082, 3010083, 3010084, 3010092, 3012010, 3012011, 3010069]; // all chairs
//var commonc = [3010000, 3010001, 3010002, 3010003, 3010004, 3010005, 3010006, 3010011, 3010012, 3010013, 3010015, 3010018, 3011000, 3010060, 3010061, 3010062, 3010067];
//var rarec = [3010007, 3010008, 3010009, 3010010, 3010012, 30100016, 3010017, 3010019, 3010025, 3012005, 3010072, 3010064, 3010065, 3010066, 3010080, 3010081, 3010082, 3010083, 3010084];
//var srarec = [3010014, 3010040, 3010041, 3010045, 3010046, 3010047, 3010057, 3010058, 3010063, 3010101, 3010073, 3010099, 3010106, 3010111, 3010092, 3012010, 3012011, 3010069];
//var random = Math.floor(Math.random() * 20);
//var rand1 = Math.floor(Math.random() * commonc.length);
//var rand2 = Math.floor(Math.random() * rarec.length);
//var rand3 = Math.floor(Math.random() * srarec.length);
// 
//function start () {
//    if (cm.haveItem(gachatix, 1))
//        cm.sendNext("Do you want to exchange your 30 #i"+gachatix+"# for a random chair?");
//    else {
//        cm.sendOk("Hello, I'm the Chair Gachapon NPC. If you have 30 #i"+gachatix+"#, I can exchange it for a random chair.");
//        cm.dispose();
//    }
//}
// 
//function action (mode, type, selection) {
//    if (mode == 1) {
//        if (random >= 0 && random < 14) {
//            cm.gainItem(commonc[rand1], 1);
//        } else if (random >= 14 && random < 19) {
//            cm.gainItem(rarec[rand2], 1);
//        } else {
//            cm.gainItem(srarec[rand3], 1);
//        }
//        cm.gainItem(gachatix, -30), cm.sendOk("You have randomized a #i"+(random >= 0 && random < 14 ? ""+commonc[rand1]+"" :
//            random >= 14 && random < 19 ? ""+rarec[rand2]+"" : ""+srarec[rand3]+"")+"#!"), cm.dispose();
//    } else {
//        cm.dispose();
//        return;
//    }
//}

var status = -1;

function start() {
    if (cm.getParty() == null) {
    	if (cm.getPlayer().getItemQuest()) {
    		cm.getPlayer().setItemQuest(null);
    	}
    	cm.sendOk("You must be in a party #d#enigger#n#k.");
    	cm.dispose();
    } else if (cm.getPlayer().getQuestItem() == null) {
    	cm.sendNext("Creating the party quest!");
    	cm.startItemQuest([100100, 100101], [4000313], [5]);
    } else {
    	cm.sendNext("Hi, I'm #e#p"+cm.getNpc()+"##n! I manage all of DynastyMS's PQs and keep the" +
    			" community up and running with fun games.");
    }
}

function action(m, t, s) {
	if (m == -1 || m == 0) {
		cm.dispose();
		return;
	} else {
		status ++;
	}
	if (status == 0) {
		cm.sendSimple("What options would you like to review?", "Task at hand ...", "Party Members' Status", "I have the items!", "Never mind, I don't need anything");
	} else if (status == 1) {
		cm.sendOk("Wut.");
		cm.dispose();
	}
}