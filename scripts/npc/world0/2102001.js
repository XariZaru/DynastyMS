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
//*/
//var status = 0;
//
//function start() {
//    cm.sendNext("I see Asesson has let you in, you must be worthy of entering! Let's go!");
//}
//
//function action(mode, type, selection) {
//    status++;
//    if ((status == 1 && type == 1 && selection == -1 && mode == 0) || mode == -1) {
//        cm.dispose();
//    } else {
//        cm.warp(670010200, 0);
//        cm.dispose();
//        cm.changeMusic("Bgm14/Ariant");
//    }
//}


function start() {
    cm.sendYesNo("Do you want to leave the boat? You will not get refunded if you do.");
}

function action(m,t,s) {
    if (m == 1) {
        cm.warp(260000100);
    }
    cm.dispose();
}