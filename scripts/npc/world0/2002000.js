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
/* Rupi by Moogra
Happyville Warp NPC
*/

function start() {
    if (!cm.getJobId()==0) {
    cm.sendYesNo("Do you want to "+ (cm.getPlayer().getMap().getId() == 101000000 ? "go to " : "get out of ") + "Happyville?");
    } else {
        cm.sendOk("Heya, I'm #bRupi#k!");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else
        cm.warp(cm.getPlayer().getMap().getId() == 101000000 ? 209000000 : 101000000, 0);
    cm.dispose();
}