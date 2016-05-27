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
//function start() {
//    cm.sendOk("<Notice> \r\n Are you part of a Guild that possesses an ample amount of courage and trust? Then take on the Guild Quest and challenge yourselves!\r\n\r\n#bTo Participate :#k\r\n1. The Guild must consist of at least 6 people!\r\n2. The leader of the Guild Quest must be a Master or a Jr. Master of the Guild!\r\n3. The Guild Quest may end early if the number of guild members participating falls below 6, or if the leader decides to end it early!");
//    cm.dispose();
//}

/*
 * Name: Jonathan Nguyen
 * Version: 1.0
 * Desc: Bulletin of all the famous legions of Henesys
 */

var status;
var legions = [["I Perionia", "II Perionia", "XI Orbani", "V Ellinae", "X Aquari", "IV Lungii", "V Lungii", "III Perionia", "V Orbani", "VII Ludibri"],["ORB Orbania", "LI Lithania", "EL Ellinaei", "PER Perionia", "AQ Aquaria", "NAUT Nautilia Desperada", "RI Rienae", "ORB Orbania Inferior", "HEN Henesia Superior", "I Orbania", "I Parthica", "I Macedonica", "V Lungii"],["I Cygnaci", "II Cygnaci", "III Cyganci", "I Iovia", "I Guang Xi", "II Orbani Flavia", "IV Perionia Constantia"]];
var types = ["Late Republican Legions", "Early Imperial Legions", "Late Imperial Legions"];

function start() {
    text = "Here are the famous Imperial legions of Empire:\r\n#e";
    for (var i = 0; i < legions.length; i++) {
        text += "\r\n\r\n#k"+types[i]+"#b";
        for (var j = 0; j < legions[i].length; j++) {
            text += "\r\n\t\t- "+(i == 0 ? "Legio" : "")+" "+legions[i][j]+"";
        }
    }
    cm.sendOk(text);
    cm.dispose();
}

function heading() {
    return "#b\r\n";
}