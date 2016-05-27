//function start() {
//    cm.sendOk("Disabled until next restart.");
//    cm.dispose();
//}
//
////
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
 * Gachapon Script - Henesys, currently with Ellinia items
 * @author Moogra
 * @NPC : Gachapon - Henesys
 * @NPC ID : 9100101
 * Item IDs by Sam
 * TODO: FINISH REAL TEXT, use sendSimpleNext for text selection
*/

 var ids = [1382001,1002064,1050049,1302027,1051023,1332013,1312001,1040080,1061087,1050054,1051047, 1312030,1050008,1051027,1051055,1372003,1061083,1050055,1442017,1442009,1372010,2022113, 1302019,1051017,1002245,1002084,1050056,1422005,2000005,1002028,2002018,1050003,1002143, 1322010];
var newIds = [3012005,1462003,1302022,1432009,3010013,1051063,1002060,1002159,1061051,1002214,1102030,1412006,1002167,1002162,1040070,
               1040073,1082176,1002211,1002042,1040092,1002138,1050018,1102027,1082147,1122003,1002169,1002164,1041045,1041082,
               1082149,1452023,2040826,2049100,2049003,1050091,1002170,1002165,2044505,2040610,2041039,2044604,2040306,2040808,2040916,
               2040917,1312031,1402036,1452044,1462039,1462004,1322027,4001434,1452014,1462008,1462016,1051084,1040022,1060056,1061050,
               1002172,1002036,1040007,1040074,1051064,1302027,1372006,1462005,1322007,1002510,1452012,1040085,1422004,4001010,1002418,
               1452008,3010155,1102041,2000005,2022113,1102042,1082177,1022058,1102082,1041033,1032028,1102033,1060058,1060061,1051017,
               1040039,1050060,1452006,1002723,1462007,2044502,2044602,2040002,2040028,2040402,2040412,
               3010119,1462006,3010041,1012108,1022082,3010095,1040089,2012008,1452007,1452002,1060005,1012084,1022060,1041061,1061057,
               1002041,3010152,1402007];


//function start() {
//    cm.sendOk("This is not open to public (it is being renovated).\r\n\r\nGM Purposes:\r\nids: "+ids.length+"\r\nnewIds: "+newIds.length+"");
//    cm.dispose();
//}

function start() {
//   if (cm.haveItem(5451000,1)) {
//        if (cm.haveItem(5220000,3)) {
//            cm.gainItem(5451000, -1);
//            cm.processGachapon(newIds, true);
//            cm.dispose();
//        } else {
//            cm.sendOk("You need 3 gachapon tickets to play.");
//            cm.dispose();
//        }
//    } else if (cm.haveItem(5220000)) {
//        cm.sendYesNo("You may use Gachapon. Would you like to use your Gachapon ticket? #eRemember to have room in your inventory, otherwise\n\
// you lose your gachapon ticket.#n");
//    } else {
//        cm.sendSimple("Welcome to the " + cm.getPlayer().getMap().getMapName() + " Gachapon. How may I help you?\r\n\r\n#L0#What is Gachapon?#l\r\n#L1#Where can you buy Gachapon tickets?#l");
//    }
    text = "";
    for (var i = 0; i < newIds.length; i++) {
        text += "\r\n#t"+newIds[i]+"# - "+i+"";
    }
    cm.sendOk(text);
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
       