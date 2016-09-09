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
package net.server.channel.handlers;

import net.AbstractMaplePacketHandler;
import server.MapleInventoryManipulator;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import client.MapleClient;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;

public final class ItemSortHandler extends AbstractMaplePacketHandler {

    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
    	slea.readInt(); // timestamp
        byte mode = slea.readByte();
        boolean sorted = false;
        MapleInventoryType pInvType = MapleInventoryType.getByType(mode);
        MapleInventory pInv = c.getPlayer().getInventory(pInvType);
        if (pInv == null || pInv.isFull()) {
            return;
        }
        while (!sorted) {
            byte freeSlot = (byte) pInv.getNextFreeSlot();
            if (freeSlot != -1) {
                byte itemSlot = -1;
                for (int i = freeSlot + 1; i <= pInv.getSlotLimit(); i++) {
                    if (pInv.getItem((byte) i) != null) {
                        itemSlot = (byte) i;
                        break;
                    }
                }
                if (itemSlot <= 100 && itemSlot > 0) {
                    MapleInventoryManipulator.move(c, pInvType, itemSlot, freeSlot);
                } else {
                    sorted = true;
                }
            }
        }
        c.getSession().write(MaplePacketCreator.finishedSort(mode));
        c.getSession().write(MaplePacketCreator.enableActions());
    }
}