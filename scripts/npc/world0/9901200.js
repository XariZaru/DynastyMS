/*
	This file is part of the OdinMS inventoryle Story Server
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
/* Author: Xterminator
	NPC Name: 		Robin
	inventory(s): 		inventoryle Road : Snail Hunting Ground I (40000)
	Description: 		Beginner Helper
*/
var status = -1;
var sel;
var inventory;

importPackage(Packages.org.w3c.dom);
importPackage(Packages.client.inventory);
var target = null;

function start() {
	target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName("Wiggy");
	cm.sendSimple("These are "+target.getName()+"'s items.\r\n#L0#Equips\r\n#L1#Use\r\n#L2#Setup\r\n#L999#Exit");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0 && type != 4)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
		var text = "";
		if (selection == 0)
			inventory = target.getInventory(MapleInventoryType.EQUIP);
		else if (selection == 1)
			inventory = target.getInventory(MapleInventoryType.USE);
		else if (selection == 2)
			inventory = target.getInventory(MapleInventoryType.SETUP);
		inventory = inventory.getItems().entrySet().toArray();
		for (var x = 0; x < inventory.length; x++)
			text += "#i" + inventory[x].getValue().getItemId() + "#";
		cm.sendOk(text);
	}
}