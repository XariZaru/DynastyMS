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
//Gachaphon

/*Mushroom Shrine Gachapon*/

var ids = [2000004,2020012,2000005,2030007,2022027,2040001,2041002, 2040805, 2040702, 2043802, 2040402, 2043702, 1302022, 1322021, 1322026, 1302026, 1442017, 1082147, 1102043, 1442016, 1402012, 1302027, 1322027, 1322025, 1312012, 1062000, 1332020, 1302028, 1372002, 1002033, 1092022, 1302021, 1102041, 1102042, 1322024, 1082148, 1002012, 1322012, 1322022, 1002020, 1302013, 1082146, 1442014, 1002096, 1302017, 1442012, 1322010, 1442011, 1442018, 1092011, 1092014, 1302003, 1432001, 1312011, 1002088, 1041020, 1322015, 1442004, 1422008, 1302056, 1432000, 1382001, 1041053, 1060014, 1050053, 1051032, 1050073, 1061036, 1002253, 1002034, 1051025, 1050067, 1051052, 1002072, 1002144, 1051054, 1050069, 1372007, 1050056, 1050074, 1002254, 1002274, 1002218, 1051055, 1382010, 1002246, 1050039, 1382007, 1372000, 1002013, 1050072, 1002036, 1002243, 1372008, 1382008, 1382011, 1092021, 1051034, 1050047, 1040019, 1041031, 1051033, 1002153, 1002252, 1051024, 1002153, 1050068, 1382003, 1382006, 1050055, 1051031, 1050025, 1002155, 1002245, 1452004, 1452023, 1060057, 1040071, 1002137, 1462009, 1452017, 1040025, 1041027, 1452005, 1452007, 1061057, 1472006, 1472019, 1060084, 1472028, 1002179, 1082074, 1332015, 1432001, 1060071, 1472007, 1472002, 1051009, 1061037, 1332016, 1332034, 1472020, 1102084, 1102086, 1102042, 1032026, 1082149];
var newIds = [1002130, 1060033, 1082147,  1082149, 1072321, 2049100, 1332032, 2049003, 3010099, 1472017, 1051030, 2040604, 2040605, 2040611, 2040609, 2040608, 2044505, 2041038, 2041039, 2041030, 2041041, 2044704, 2044704, 2044705, 2043304, 2040305, 2040811, 2040814, 2044903, 2044904, 2040011, 2044804, 2043105, 2043005, 2043006, 2040510, 2040511, 2040532, 2040533, 2044405, 2040906, 2040907, 2040922, 2040932, 2040916, 2040917, 2040714, 2040716, 2044304, 2044305, 2040411, 2040407, 2044113, 2044105, 2044204, 1041076, 1332030, 1072263, 1402013, 1332053, 1332020, 1412004, 1102041, 1102042, 1002395, 1002586, 1082148, 1052122, 2040200, 2040201, 2040030, 2043019, 3010119, 1060046, 1402037, 2340000, 1102040, 1082145, 1402007];


//function start() {
//    cm.sendOk("This is not open to public (it is being renovated).\r\n\r\nGM Purposes:\r\nids: "+ids.length+"\r\nnewIds: "+newIds.length+"");
//    cm.dispose();
//}

function start() {
   if (cm.haveItem(5451000,1)) {
        if (cm.haveItem(5220000,3)) {
            cm.gainItem(5451000, -1);
            cm.processGachapon(newIds, true);
            cm.dispose();
        } else {
            cm.sendOk("You need 3 gachapon tickets to play.");
            cm.dispose();
        }
    } else if (cm.haveItem(5220000,3)) {
        cm.sendYesNo("You may use Gachapon. Would you like to use your Gachapon ticket? #eRemember to have room in your inventory, otherwise\n\
 you lose your gachapon ticket.#n");
    } else {
        cm.sendSimple("Welcome to the " + cm.getPlayer().getMap().getMapName() + " Gachapon. How may I help you?\r\n\r\n#L0#What is Gachapon?#l\r\n#L1#Where can you buy Gachapon tickets?#l");
    }
}

function action(mode, type, selection){
    if (mode == 1) {
        if (cm.haveItem(5220000,3)) {
//            rand = Math.floor(Math.random() * newIds.length);
//            cm.sendOk("You have gained "+newIds[rand]+".");
//            cm.gainItem(newIds[rand],1);
            cm.processGachapon(newIds, false);
            cm.dispose();
        }
    } else {
            if (selection == 0) {
                cm.sendNext("Play Gachapon to earn rare scrolls, equipment, chairs, mastery books, and other cool items! All you need is a #bGachapon Ticket#k to be the winner of a random mix of items.");
            } else if (selection == 1) {
                cm.sendNext("Gachapon Tickets are available in the #rCash Shop#k and can be purchased using NX or Maple Points. Click on the red SHOP at the lower right hand corner of the screen to visit the #rCash Shop #kwhere you can purchase tickets.");
            } else if (selection == 2) {
                cm.sendNext("You'll find a variety of items from the " + cm.getPlayer().getMap().getMapName() + " Gachapon, but you'll most likely find several related items and scrolls since " + cm.getPlayer().getMap().getMapName() + " is known as the town.");
            }
    }
//    cm.dispose();
}
       