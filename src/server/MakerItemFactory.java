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
package server; 

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import tools.Pair;
/** 
 * @author Jay Estrella 
 * @author Niv - Perpetual/xPerpetual/Maplerulez 
 * It now loads everything from the XML, recipe improved. 
 */ 
public class MakerItemFactory { 
    private static Map<Integer, MakerItemCreateEntry> recipes = new HashMap<Integer, MakerItemCreateEntry>(); 
    private static MapleDataProvider datasource = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Etc.wz")); 
    private static MapleData makerData; 

    public static MakerItemCreateEntry getItemCreateEntry(int toCreate) { 
        if (recipes.get(toCreate) != null) { 
            return recipes.get(toCreate); 
        } 
        System.out.println("Loading maker recipes~"); 
        makerData = datasource.getData("ItemMake.img"); 
        for (MapleData dt : makerData.getChildren()) //loop through every category 
            for (MapleData itemdata : dt.getChildren()) { // loop through all the items in each category 
                int itemId = Integer.parseInt(itemdata.getName()); 
                int reqLevel = MapleDataTool.getInt("reqLevel", itemdata, 0); 
                int reqSkillLevel = MapleDataTool.getInt("reqSkillLevel", itemdata, 0); 
                int cost = MapleDataTool.getInt("meso", itemdata, 0); 
                int amount = MapleDataTool.getInt("itemNum", itemdata, 0); 
                MakerItemCreateEntry mice = new MakerItemCreateEntry(cost, reqLevel, reqSkillLevel, amount); 
                if (itemdata.getChildByPath("recipe") != null) // O_o 
                    for (MapleData recipedata : itemdata.getChildByPath("recipe").getChildren()) { //loop through all the needed items 
                        int itemid = MapleDataTool.getInt("item", recipedata, -1);// apperantly some of them are null O: 
                        if (itemid != -1) 
                            mice.addReqItem(itemid, MapleDataTool.getInt("count", recipedata, 0)); 
                    } 
                if (itemdata.getChildByPath("catalyst") != null) 
                    mice.setcatalyst(MapleDataTool.getInt("catalyst", itemdata));
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