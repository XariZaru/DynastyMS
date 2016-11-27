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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import net.AbstractMaplePacketHandler;
import net.server.channel.handlers.MakerSkillHandler.MakerItemFactory.MakerItemCreateEntry;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.SeekableLittleEndianAccessor;
import client.MapleClient;
import client.inventory.Equip;
import client.inventory.MapleInventoryType;
import client.inventory.MapleWeaponType;

/** 
 * 
 * @author Jay Estrella 
 * fixed by: Niv - Perpetual/xPerpetual/Maplerulez 
 */ 
public final class MakerSkillHandler extends AbstractMaplePacketHandler { 
    private MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance(); 

    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) { 
        int type = slea.readInt();// type: 1 = make something, 4 = dissassemble, 3 = make monster crystals 
        int toCreate = slea.readInt(); 
        if (type == 1) { 
            MakerItemCreateEntry recipe = MakerItemFactory.getItemCreateEntry(toCreate); 
            if (!canCreate(c, recipe) || c.getPlayer().getInventory(ii.getInventoryType(toCreate)).isFull()) { 
                c.getPlayer().dropMessage("You do not have all the items or your inventory is full."); 
                return; 
            } 
            System.out.println("Create " + toCreate);
            c.getPlayer().gainMeso(-recipe.getCost(), false); 
            for (Pair<Integer, Integer> p : recipe.getReqItems()) { 
                int toRemove = p.getLeft(); 
                MapleInventoryManipulator.removeById(c, ii.getInventoryType(toRemove), toRemove, p.getRight(), false, false); 
            } 
            if (ii.getInventoryType(toCreate) == MapleInventoryType.EQUIP) { 
                boolean prodStim = slea.readByte() == 1; // 1 = production manual used, 0 = not 
                int gemz = slea.readShort(); // amount of gems used 
                slea.readShort(); // O_o 
                Equip item = (Equip) ii.getEquipById(toCreate); 
                if (prodStim) { 
                    int prodId = recipe.getcatalyst(); 
                    if (prodId == -1) { 
                        c.getPlayer().dropMessage(1, "Something went wrong. please notify a GM about this issue."); 
                        return; 
                    } 
                    if (!c.getPlayer().haveItem(prodId)) // meaning he tried to packet edit, feel free to autoban here 
                        return; 
                    if (new Random().nextInt(10) < 1)// 10% fail rate when u use a stimulator 
                        item = null; 
                    else 
                        item = ii.randomizeStats(item); 
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, prodId, 1, false, false); 
                } 
                for (int i = 0; i < gemz; i++) { 
                    int gem = slea.readInt(); 
                    if (c.getPlayer().haveItem(gem)) { 
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, gem, 1, false, false); 
                        ii.addCrystalEffect(item, gem); 
                    } 
                    else // feel free to autoban here, he/she tried to packet edit 
                        return; 
                } 
                if (item != null) { 
                    MapleInventoryManipulator.addFromDrop(c, item, true); 
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getScrollEffect(c.getPlayer().getId(), Equip.ScrollResult.SUCCESS, false)); 
                    // DCs
                    //c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showSpecialEffect(16)); 
                    c.getPlayer().dropMessage(1, "Congratulations! You've succeeded in the making of the item!"); 
                } 
                else { 
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getScrollEffect(c.getPlayer().getId(), Equip.ScrollResult.FAIL, false)); 
                    // DCs people replace with diff effect
                    //c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showSpecialEffect(16)); 
                    c.getPlayer().dropMessage(1, "Aww... You've failed in making the item D:"); 
                } 
            } 
            else { //strengthening crystals O: 
                Pair<Integer, Short> reward = recipe.getRandomReward(); 
                MapleInventoryManipulator.addById(c, reward.getLeft(), reward.getRight()); 
                c.announce(MaplePacketCreator.getShowItemGain(reward.getLeft(), reward.getRight(), true)); 
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getScrollEffect(c.getPlayer().getId(), reward.getLeft() >= toCreate ? Equip.ScrollResult.SUCCESS : Equip.ScrollResult.FAIL, false)); 
                // DCs people for some reason ... gotta check it out
                //c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showSpecialEffect(16)); 
                c.getPlayer().dropMessage(1, reward.getLeft() >= toCreate ? "Congratulations! You've succeeded in the making of the item! You've made " : "Aww... You've failed in making the item D:"); 
            } 
        } 
        else if (type == 3) {// monster crystal making 
            if (c.getPlayer().getItemQuantity(toCreate, false) >= 100) { 
                int lvl = ii.getETCMonsLvl(toCreate); 
                if (lvl != -1) { 
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, toCreate, 100, false, false); 
                    int itemToGain = Math.min(Math.max(5, (int) Math.ceil(lvl/ 10.0)) - 5 + 4260000, 4260008); 
                    MapleInventoryManipulator.addById(c, itemToGain, (short)1); 
                    c.getPlayer().dropMessage(1, "Congratulations. You've made 1 Monster Crystals!"); 
                    // DCs
                    //c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showSpecialEffect(16)); 
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getScrollEffect(c.getPlayer().getId(), Equip.ScrollResult.SUCCESS, false)); 
                } 
                else { 
                    c.getPlayer().dropMessage(1, "You cannot use these items to make a monster crystal!"); 
                } 
            } 
        } 
        else if (type == 4) { //dissassemble 
            slea.readInt(); // No idea what this is, it's always 1 so maybe the amount? O: 
            short slot = slea.readShort(); 
            if (c.getPlayer().haveItem(toCreate)) { 
                MapleInventoryManipulator.removeFromSlot(c, slot >= 0 ? MapleInventoryType.EQUIP : MapleInventoryType.EQUIPPED/*I'm not sure u can put one of ur equipped items but w.e not taking risks :D*/, (byte) slot, (short)1, false); 
                int itemToGain = ((ii.getReqLevel(toCreate) - 50) / 10) + 4260000; 
                int amount = ii.getWeaponType(toCreate) == MapleWeaponType.NOT_A_WEAPON ? new Random().nextInt(15) + 6 : new Random().nextInt(15) + 20; // I never checked the real amounts but that's about what i got in GMS O_o 
                MapleInventoryManipulator.addById(c, itemToGain, (short)amount); 
                c.getPlayer().dropMessage(1, "Congratulations. You've made " + amount + " Monster Crystals!"); 
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getScrollEffect(c.getPlayer().getId(), Equip.ScrollResult.SUCCESS, false)); 
                // DCs
                //c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showSpecialEffect(16)); 
                c.announce(MaplePacketCreator.getShowItemGain(itemToGain, (short)amount, true)); 
            } 
        } 
    } 

    private boolean canCreate(MapleClient c, MakerItemCreateEntry recipe) {
    	int job = c.getPlayer().getJob().getId();
    	int skill = job < 1000 ? 1007 : job >= 1000 && job < 2000 ? 10001007 : 20001007;
        return hasItems(c, recipe) && c.getPlayer().getMeso() >= recipe.getCost() && c.getPlayer().getLevel() >= recipe.getReqLevel() && c.getPlayer().getSkillLevel(skill) >= recipe.getReqSkillLevel(); 
    } 

    private boolean hasItems(MapleClient c, MakerItemCreateEntry recipe) { 
        for (Pair<Integer, Integer> p : recipe.getReqItems()) { 
            int itemId = p.getLeft(); 
            //System.out.println("itemid -" + itemId); 
            if (c.getPlayer().getInventory(ii.getInventoryType(itemId)).countById(itemId) < p.getRight()) { 
                return false; 
            } 
        } 
        return true; 
    }  
    
    public static class MakerItemFactory { 
        private static final Map<Integer, MakerItemCreateEntry> recipes = new HashMap<Integer, MakerItemCreateEntry>(); 
        private static MapleDataProvider datasource = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Etc.wz")); 
        private static MapleData makerData; 

        public static MakerItemCreateEntry getItemCreateEntry(int toCreate) { 
            if (recipes.get(toCreate) != null) { 
                return recipes.get(toCreate); 
            } 
            //System.out.println("Loading maker recipes~"); 
            makerData = datasource.getData("ItemMake.img"); 
            for (MapleData dt : makerData.getChildren()) //loop through every category 
                for (MapleData itemdata : dt.getChildren()) { // loop through all the items in each category 
                    int itemId = Integer.parseInt(itemdata.getName()); 
                    int reqLevel = MapleDataTool.getInt("reqLevel", itemdata, 0); 
                    int reqSkillLevel = MapleDataTool.getInt("reqSkillLevel", itemdata, 0); 
                    int cost = MapleDataTool.getInt("meso", itemdata, 0); 
                    int amount = MapleDataTool.getInt("itemNum", itemdata, 0); 
                    MakerItemCreateEntry mice = new MakerItemCreateEntry(cost, reqLevel, reqSkillLevel, amount); 
                    System.out.println("Create " + toCreate);
                    if (itemdata.getChildByPath("recipe") != null) // O_o 
                        for (MapleData recipedata : itemdata.getChildByPath("recipe").getChildren()) { //loop through all the needed items 
                            int itemid = MapleDataTool.getInt("item", recipedata, -1);// apperantly some of them are null O: 
                            if (itemid != -1) 
                                mice.addReqItem(itemid, MapleDataTool.getInt("count", recipedata, 0)); 
                        } 
                    if (itemdata.getChildByPath("catalyst") != null)  
                        mice.setcatalyst(MapleDataTool.getInt("catalyst", itemdata));
                    System.out.println("Create " + toCreate);
                    if (itemdata.getChildByPath("randomReward") != null) { 
                        for (MapleData rewardData : itemdata.getChildByPath("randomReward").getChildren()) { 
                            Short amt = (short) (MapleDataTool.getInt("itemNum", rewardData, 0)); 
                            mice.addRandomReward(MapleDataTool.getInt("item", rewardData, 0), MapleDataTool.getInt("prob", rewardData, 0), amt); 
                        } 
                    } 
                    recipes.put(itemId, mice); 
                } 
            return recipes.get(toCreate); 
        } 

        public static class MakerItemCreateEntry { 
            private int reqLevel, reqMakerLevel; 
            private int cost; 
            private List<Pair<Integer, Integer>> reqItems = new ArrayList<Pair<Integer, Integer>>(); // itemId / amount 
            private int amount; 
            private int catalyst/*productionstimulator*/; 
            private List<Pair<Integer, Pair<Integer, Short>>> randomRewards = new ArrayList<Pair<Integer, Pair<Integer, Short>>>(); 

            public MakerItemCreateEntry(int cost, int reqLevel, int reqMakerLevel, int toGive) { 
                this.cost = cost; 
                this.reqLevel = reqLevel; 
                this.reqMakerLevel = reqMakerLevel; 
                this.amount = toGive; 
            } 

            public int getRewardAmount() { 
                return amount; 
            } 

            public void setcatalyst(int num) { 
                catalyst = num; 
            } 

            public void addRandomReward(int itemid, int prob, short amount) { 
                randomRewards.add(new Pair<Integer, Pair<Integer, Short>>(prob, new Pair<Integer, Short>(itemid,  amount))); 
            } 

            public Pair<Integer, Short> getRandomReward() { 
                int totChance = 0; 
                for (Pair<Integer, Pair<Integer, Short>> reward : randomRewards) 
                    totChance += reward.getLeft(); 
                int lastChance = 0; 
                int picked = new Random().nextInt(totChance); 
                for (Pair<Integer, Pair<Integer, Short>> reward : randomRewards) { 
                    if (picked < lastChance + reward.getLeft()) 
                        return reward.getRight(); 
                    lastChance += reward.getLeft(); 
                } 
                return randomRewards.get(randomRewards.size() - 1).getRight(); 
            } 

            public int getcatalyst() { 
                return catalyst; 
            } 

            public List<Pair<Integer, Integer>> getReqItems() { 
                return reqItems; 
            } 

            public int getReqLevel() { 
                return reqLevel; 
            } 

            public int getReqSkillLevel() { 
                return reqMakerLevel; 
            } 

            public int getCost() { 
                return cost; 
            } 

            protected void addReqItem(int itemId, int amount) { 
                reqItems.add(new Pair<Integer, Integer>(itemId, amount)); 
            } 
        } 
    } 
    
}  