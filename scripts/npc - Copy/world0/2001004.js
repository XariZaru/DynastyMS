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
function start() { 
    if (cm.getQ() >= 1) {
        cm.sendYesNo(""+(cm.getMapId()==209000001 ? "Would you like to return to the town?" : "We have a beautiful Christmas tree. Would you like to see it?")+"");
    } else {
        cm.sendOk("Isn't this a magnificent Christmas tree?");
        cm.dispose();
    }
}
function action(m, t, s) {
    if (m > 0) {
        cm.warp(cm.getMapId()==209000001 ? 209000000 : 209000001);
    if (cm.getQ()==1) {
        cm.talkGuide("We have to go find Santa and help him!");
    }
    }
        cm.dispose();
        return;
} 