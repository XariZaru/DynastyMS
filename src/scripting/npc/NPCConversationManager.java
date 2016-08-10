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
package scripting.npc;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import net.server.Server;
import net.server.guild.MapleAlliance;
import net.server.guild.MapleGuild;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import scripting.AbstractPlayerInteraction;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MapleStatEffect;
import server.events.gm.MapleEvent;
import server.gachapon.MapleGachapon;
import server.gachapon.MapleGachapon.MapleGachaponItem;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.partyquest.ClearMap;
import server.partyquest.JumpQuest;
import server.partyquest.KillMobs;
import server.partyquest.Pyramid;
import server.partyquest.Pyramid.PyramidMode;
import server.partyquest.SpawnPQ;
import server.partyquest.dynasty.CustomCPQ;
import server.partyquest.dynasty.CustomCPQParty;
import server.partyquest.dynasty.DynastyPyramidPQ;
import server.quest.MapleQuest;
import tools.LogHelper;
import tools.DatabaseConnection;
import tools.FilePrinter;
import tools.MaplePacketCreator;
import tools.Pair;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleJob;
import client.MapleSkinColor;
import client.MapleStat;
import client.Skill;
import client.SkillFactory;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.ItemFactory;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import constants.ExpTable;
import constants.ServerConstants;
import custom.dynasty.TestDamage;

/**
 *
 * @author Matze
 */
public class NPCConversationManager extends AbstractPlayerInteraction {

	private int npc;
	private String scriptName;
	private String getText;
	private String lastMethod = null;
	private int status = -1;

	public NPCConversationManager(MapleClient c, int npc, String scriptName) {
		super(c);
		this.npc = npc;
		this.scriptName = scriptName;
	}
	
	public void fadeMessage(String msg) {
		getPlayer().fadeMessage(msg);
	}
	
	public void startDynastyPyramid(int returnMap) {
		if (getParty() == null)
			print("Player tried to start PQ without a party and this somehow got through.");
		else
			new DynastyPyramidPQ(getParty(), returnMap);
	}

	public void spawnDiff(int mapid, int mobid, int amount, int x, int y) {
		for (int times = 0; times < amount; times++) {
			getMap(mapid).spawnMonsterOnGroundBelow(mobid, x, y);
		}
	}
	
    public String getAvailableQuests() {
    	try {
    		String text = "";
 	 	   	Connection con = DatabaseConnection.getConnection();
 	        PreparedStatement ps = con.prepareStatement("SELECT * FROM available_quests ORDER BY requiredLevel");
 	        ResultSet rs = ps.executeQuery();
 	        while (rs.next()) {
 	        	if (getPlayer().getDynastyQuest(rs.getString("questName")) == 0 && getLevel() >= rs.getInt("requiredLevel"))
 	        		text += String.format("#L%2d#[Level %2d]: %s\r\n", rs.getInt("id"), rs.getInt("requiredLevel"), rs.getString("questName"));
 	        }
 	        ps.close();
 	        rs.close();
 	        return text;
     	}
     	catch (Exception e) {
     		System.out.println("Failed to load from db.");
     	}
 		return "";
     }
    
    public String getQuestDetails(int questid) {
    	try {
    		Connection con = DatabaseConnection.getConnection();
	        PreparedStatement ps = con.prepareStatement("SELECT * from available_quests WHERE id = ?");
			ps.setInt(1, questid);
	        ResultSet rs = ps.executeQuery();
	        if (rs.next()) {
		        String result = String.format("#eNPC:#n #p%2d#\r\n\r\n#eDescription:#n %s", rs.getInt("npc"), rs.getString("description"));
		        if (rs.getInt("canOpen") == 1)
		        	result += String.format("\r\n\r\n#L%2d##eTalk with #p%2d#!", rs.getInt("npc"), rs.getInt("npc"));
		        ps.close();
		        rs.close();
		        return result;
	        }
    	} catch (Exception e) {
    		
    	}
		return "No quest selection available.";
    }
    
    public String searchMobs(String mob_name) {
    	StringBuilder sb = new StringBuilder();
    	MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
    	MapleData data = dataProvider.getData("Mob.img");
    	if (data != null) {
			String name;
			for (MapleData searchData : data.getChildren()) {
				name = MapleDataTool.getString(searchData.getChildByPath("name"), "NO-NAME");
				if (name.toLowerCase().contains(mob_name.toLowerCase())) {
					sb.append("#L"+ searchData.getName() +"##b").append(Integer.parseInt(searchData.getName())).append("#k - #r").append(name).append("\r\n");
				}
			}
		}
    	if (sb.length() == 0)
    		sb.append("No mobs were found with that name.");
    	return sb.toString();
    }
    
    public String getMobInfo(int mobid) {
    	try {
    		MapleMonster mob = MapleLifeFactory.getMonster(mobid);
    		StringBuilder sb = new StringBuilder();
    		sb.append("Statistics for ").append("#b" + mob.getName() + "#k ("+mob.getId()+")\r\n\r\n");
    		sb.append("Level: ").append(mob.getStats().getLevel()).append("\r\n");
    		sb.append("Health: ").append(mob.getMaxHp()).append("\r\n");
    		sb.append("Mana: ").append(mob.getMaxMp()).append("\r\n");
    		sb.append("Exp: ").append(mob.getExp() * getPlayer().getExpRate()).append("\r\n\r\n");
    		sb.append("#eDrops List#n\r\n");
    		Connection con1 = DatabaseConnection.getConnection();
    		PreparedStatement ps = con1.prepareStatement("SELECT * FROM drop_data WHERE dropperid = ? ORDER BY chance, itemid");
    		ps.setInt(1, mobid);
    		ResultSet rs = ps.executeQuery();
    		
    		while (rs.next())
    			if (Integer.parseInt(rs.getString("itemid")) != 0)
	    			sb.append("#i "+ rs.getString("itemid") +"# #z"+rs.getString("itemid")+"#").append("(" + rs.getString("itemid") + ")").append(" - ").append((double)Math.round(Double.parseDouble(
	    					rs.getString("chance")) / 1000000 * 100 * getPlayer().getDropRate() * 1000d) / 1000d).append("%\r\n");
    		ps.close();
    		rs.close();
    		return sb.toString();
    	} catch (Exception e) {
    		
    	}
    	return "NPCConversationManager.getMobInfo - error retrieving monster stats";
    }
    
    public String getHarmlessMobInfo(int mobid) {
    	try {
    		MapleMonster mob = MapleLifeFactory.getMonster(mobid);
    		StringBuilder sb = new StringBuilder();
    		sb.append("Statistics for ").append("#b" + mob.getName() + "#k\r\n\r\n");
    		sb.append("Level: ").append(mob.getStats().getLevel()).append("\r\n");
    		sb.append("Health: ").append(mob.getMaxHp()).append("\r\n");
    		sb.append("Mana: ").append(mob.getMaxMp()).append("\r\n");
    		sb.append("Exp: ").append(mob.getExp() * getPlayer().getExpRate()).append("\r\n\r\n");
    		sb.append("#eDrops List#n\r\n");
    		Connection con1 = DatabaseConnection.getConnection();
    		PreparedStatement ps = con1.prepareStatement("SELECT * FROM drop_data WHERE dropperid = ? ORDER BY chance, itemid");
    		ps.setInt(1, mobid);
    		ResultSet rs = ps.executeQuery();
    		
    		while (rs.next())
    			if (Integer.parseInt(rs.getString("itemid")) != 0)
	    			sb.append(" "+ rs.getString("itemid") +" #t"+rs.getString("itemid")+"#").append("(" + rs.getString("itemid") + ")").append(" - ").append((double)Math.round(Double.parseDouble(
	    					rs.getString("chance")) / 1000000 * 100 * getPlayer().getDropRate() * 1000d) / 1000d).append("%\r\n");
    		ps.close();
    		rs.close();
    		return sb.toString();
    	} catch (Exception e) {
    		
    	}
    	return "NPCConversationManager.getMobInfo - error retrieving monster stats";
    }
    
    // What mob drops given item ID
    public String mobsThatDrop(int item_id) {
    	try {
    		StringBuilder sb = new StringBuilder();
    		Connection con = DatabaseConnection.getConnection();
    		PreparedStatement ps = con.prepareStatement("SELECT * FROM drop_data WHERE itemid = ? ORDER BY chance");
    		ps.setInt(1, item_id);
    		ResultSet rs = ps.executeQuery();
    		
    		while (rs.next())
    			sb.append("#b#o").append(rs.getString("dropperid")).append("##k ("+ rs.getString("dropperid") +") - #r").append(Double.parseDouble(rs.getString("chance")) / 1000000 * 100 * getPlayer().getDropRate()).append("%#k\r\n");
    		ps.close();
    		rs.close();
    		if (sb.length() == 0)
    			sb.append("Could not find any mobs that drop that item.");
    		return sb.toString();
    	} catch (Exception e) {
    		
    	}
    	return "NPCConversationManager.getMobList - mNo results found!";
    }
    
    // Get items list
    public String searchItem(String item_name) {
    	try {
    		StringBuilder sb = new StringBuilder();
			for (Pair<Integer, String> itemPair : MapleItemInformationProvider.getInstance().getAllItems()) {
				if (sb.length() < 32000) {//ohlol
					// item id is left, name is right
					if (itemPair.getRight().toLowerCase().contains(item_name.toLowerCase())) {
						//#v").append(id).append("# #k- 
						sb.append("#L "+ itemPair.getLeft() +"##b").append(itemPair.getLeft()).append("#k - #r").append(itemPair.getRight()).append("#l\r\n");
					}
				} else {
					sb.append("#bCouldn't load all items, there are too many results.\r\n");
					break;
				}
			}
			if (sb.length() == 0)
				sb.append("Could not find item with that name.");
			return sb.toString();
		
    	} catch (Exception e) {
    		System.out.println("NPCConversationManager.getItemList - failed search");
    	}
    	return "NPCConversationManager.getItemList - Exited out of function.";
    }
	
	public String getScriptableNpcs() {
		try {
			String text = "";
			Connection con1 = DatabaseConnection.getConnection();
			PreparedStatement ps = con1.prepareStatement("SELECT * FROM npcs_scriptable");
			ResultSet rs = ps.executeQuery();
			while (rs.next())
				text += String.format("#p%s#: %s\r\n", rs.getString("npcid"), rs.getString("description"));
			ps.close();
			rs.close();
			return text;
		} catch (Exception e ) {
			
		}
		return "No NPCs currently set as scriptable.";
	}
	
	public void spawn(int mobid, int count, int x, int y) {
		for (int times = 0; times < count; times++) {
			getPlayer().getMap().spawnMonsterOnGroundBelow(mobid, x, y);
		}
	}
	
	public List<MapleParty> getParties(int mapid) {
		List<MapleParty> parties = new ArrayList<MapleParty>();
		for (MapleCharacter chr : getMap(mapid).getCharacters()) {
			if (!parties.contains(chr.getParty())) {
				parties.add(chr.getParty());
			}
		}
		return parties;
	}
	
	public int countMonster() {
		return getPlayer().getMap().countMobs();
	}
	
	public int getPartyCount(int mapid) {
		return getPartyLeaders(mapid).size();
	}
	
	public void startDamageTest(int mobid, int hp, int x, int y) {
		new TestDamage(mobid, hp, x, y, getPlayer());
	}
	
	public void openNpcForPlayer(String name, int npcid) {
		openNpcForPlayer(name, npcid, null);
	}
	
	public void openNpcForPlayer(String name, int npcid, String script) {
		dispose();
		c = getMapleCharacter(name).getClient();
		c.removeClickedNPC();
		NPCScriptManager.getInstance().dispose(c);
		NPCScriptManager.getInstance().start(c, npcid, script, null);
	}
	
	// CustomCPQ Functions
	
	public List<MapleCharacter> getPlayersOnMap(int mapid) {
		List<MapleCharacter> chrs = new ArrayList<MapleCharacter>();
		for (MapleCharacter chr : getMap(mapid).getCharacters()) {
			chrs.add(chr);
		}
		return chrs;
	}
	
	public String getPlayersInfo(int mapid) {
		String txt = "";
		for (MapleCharacter chr : getMap(mapid).getCharacters()) {
			txt += chr.getName() + ": Level " + chr.getLevel() + "\r\n";
		}
		return txt;
	}
	
	// Gets party based on char
	public String getOtherPartyInfo(MapleCharacter player) {
		return player.getParty().getReadableMembers();
	}
	
	public List<MapleCharacter> getPartyLeaders(int mapid) {
		List<MapleCharacter> chrs = new ArrayList<MapleCharacter>();
		for (MapleCharacter chr : getMap(mapid).getCharacters()) {
			if (chr.getParty() != null) {
				if (chr.getParty().getLeader().getPlayer() == chr) {
					chrs.add(chr);
				}
			}
		}
		return chrs;
	}
	
	// JumpQuest Stuff
	
	public String getRankings(int mapid) {
		String text = "";
		try {
			Connection con1 = DatabaseConnection.getConnection();
			PreparedStatement ps = con1.prepareStatement("SELECT * FROM jumpquests WHERE mapid = ? ORDER BY time DESC limit 10");
			ps.setInt(1, mapid);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				text += "#e" + rs.getString("name") + "#n - " + rs.getFloat("time") + " seconds"; 
			}
			
			rs.close();
			ps.close();
			
		} catch (Exception e) {
			
		} 
		
		return text == "" ? "There are currently no ranked plays for this JQ. Be the first to set a score!" : text;
	}
	
	// CPQ
	
	public CustomCPQParty createCPQParty() {
		return new CustomCPQParty(getParty());
	}
	
	// JumpQuest
	public void startJumpQuest(List<Integer> maps, int returnMapId) {
		List<MapleCharacter> chrs = new ArrayList<MapleCharacter>();
    	if (getParty()==null)
    		chrs.add(getPlayer());
    	 else 
    		chrs = getPartyMembers();
    	new JumpQuest(chrs, maps, returnMapId);
    }
	
	public String getJQList(String category, List<Integer> selections) {
		return getPlayer().getJQList(category, selections);
	}
	
//	public String getJQMap(int selection) {
//		return getPlayer().getJQMap(selection);
//	}
	
	public String getJQStuff(int selection, String value) {
		return getPlayer().getJQStuff(selection, value);
	}
	
	public int numberOfJQMaps() {
		return getPlayer().numberOfJQMaps();
	}
	
	// Status Recoding
	
	public void print(String msg) {
		System.out.println(msg);
	}
	
	public static String getMethodName() {
	    return Thread.currentThread().getStackTrace()[2].getMethodName();
	} 
	
	public void setLast(String name) {
		lastMethod = name;
	}
	
	public String getLast() {
		return lastMethod;
	}
	
	public int getStatus() {
		return status;
	}
	
	public void addStatus() {
		status++;
	}
	
	// Daily Gift
	
	public int getBossLog(String bossid) {
        return getPlayer().getBossLog(bossid);
    }
	
	public void setScriptable(int npcid) {
		c.announce(MaplePacketCreator.setNPCScriptable(npcid));
	}

    public int getGiftLog(String bossid) {
        return getPlayer().getGiftLog(bossid);
    }
    
    public void setBossLog(String bossid) {
        getPlayer().setBossLog(bossid);
    }
    
	
	// Dynasty Quest Stuff
	
	
	// Overrides sendOk by giving exp, money, and rewards
	public void sendOk(String text, int exp, int money, int... rewards) {
		text += String.format("\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n"+
				"#fUI/UIWindow.img/QuestIcon/8/0# %d exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# "
				+ "%d meso\r\n", exp, money);
		for (int x = 0; x < rewards.length; x++) {
			text += String.format("\r\n#i%2d#", rewards[x]);
			gainItem(rewards[x]);
		}
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 00", (byte) 0));
		gainExp(exp);
		gainMeso(money);
	}
	
	public int getQ() {
		return getQuest();
	}
	
	public void completeQ() {
		getPlayer().setQuest(getPlayer().getQuest() + 1);
	}
	
	public int getQuest() {
		return getPlayer().getQuest();
	}
	
	public void setQuest(int questid) {
		getPlayer().setQuest(questid);
	}
	
	public boolean isMapFree(int mapid) {
		return getMap(mapid).getCharacters().size() < 1;
	}
	
	public void complete() {
        playSound("Party1/Clear");
    }
	
	public void completeQuestSound() {
        complete();
    }
	
	public ClearMap getClearMap() {
		return getPlayer().getClearNpc();
	}
	
	public void createClearMap(String message) {
		new ClearMap(this.npc, getPlayer().getMap(), getPlayer(), getClient(), message);
	}
	
	// DynastyMS PQ Stuff

	// Starts the PQ
	
	public void startKillMobsPQ(List<Integer> positions, List<Integer> exp, List<Integer> mobs, int time, List<Integer> mapids) {
		new KillMobs(getPartyMembers(), getPlayer().getMap(), positions, exp, mobs, time, this.npc, mapids);
	}
	
	public void startSpawnPQ() {
		if (getPlayer().getParty() != null) {
			for (MapleCharacter chr : getPartyMembers()) {
				if (chr.getSpawnPQ() != null) {
					chr.setSpawnPQ(null);
				}
			}
		}
		
		new SpawnPQ(getPartyMembers(), getPlayer().getMap()); 
		
	}
	
	// End of DynastyPQ Stuff
	
	// Making JavaScripting Even Easier
	
	public String image(int itemid) {
		return "#i"+ itemid +"#";
	}

	public int getNpc() {
		return npc;
	}

	public String getScriptName() {
		return scriptName;
	}

	public void dispose() {
		NPCScriptManager.getInstance().dispose(this);
	}

	public void sendNext(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 01", (byte) 0));
	}

	public void sendPrev(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 00", (byte) 0));
	}

	public void sendNextPrev(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 01", (byte) 0));
	}

	public void sendOk(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 00", (byte) 0));
	}

	public void sendYesNo(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 1, text, "", (byte) 0));
	}

	public void sendAcceptDecline(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0x0C, text, "", (byte) 0));
	}
	
	public void sendSimple(String text, String... selections) {
        if (selections.length > 0) // Adding this even if selections length is 0 will do anything, but whatever.
               text += "#b\r\n";
        for (int i=0; i<selections.length; i++) {
               text += "#L" + i + "#" + selections[i] + "#l\r\n";
        }
        sendSimple(text);
    } 

	public void sendSimple(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 4, text, "", (byte) 0));
	}
	
	public void sendNext(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 01", speaker));
	}

	public void sendPrev(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 00", speaker));
	}

	public void sendNextPrev(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 01", speaker));
	}

	public void sendOk(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 00", speaker));
	}

	public void sendYesNo(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 1, text, "", speaker));
	}

	public void sendAcceptDecline(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0x0C, text, "", speaker));
	}

	public void sendSimple(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 4, text, "", speaker));
	}

	public void sendStyle(String text, int styles[]) {
		getClient().announce(MaplePacketCreator.getNPCTalkStyle(npc, text, styles));
	}

	public void sendGetNumber(String text, int def, int min, int max) {
		getClient().announce(MaplePacketCreator.getNPCTalkNum(npc, text, def, min, max));
	}

	public void sendGetText(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalkText(npc, text, ""));
	}

	/*
	 * 0 = ariant colliseum
	 * 1 = Dojo
	 * 2 = Carnival 1
	 * 3 = Carnival 2
	 * 4 = Ghost Ship PQ?
	 * 5 = Pyramid PQ
	 * 6 = Kerning Subway
	 */
	public void sendDimensionalMirror(String text) {
		getClient().announce(MaplePacketCreator.getDimensionalMirror(text));
	}

	public void setGetText(String text) {
		this.getText = text;
	}

	public String getText() {
		return this.getText;
	}

	public int getJobId() {
		return getPlayer().getJob().getId();
	}

	public MapleJob getJob(){
		return getPlayer().getJob();
	}

	public void startQuest(short id) {
		try {
			MapleQuest.getInstance(id).forceStart(getPlayer(), npc);
		} catch (NullPointerException ex) {
		}
	}

	public void completeQuest(short id) {
		try {
			MapleQuest.getInstance(id).forceComplete(getPlayer(), npc);
		} catch (NullPointerException ex) {
		}
	}

	public void startQuest(int id) {
		try {
			MapleQuest.getInstance(id).forceStart(getPlayer(), npc);
		} catch (NullPointerException ex) {
		}
	}

	public void completeQuest(int id) {
		try {
			MapleQuest.getInstance(id).forceComplete(getPlayer(), npc);
		} catch (NullPointerException ex) {
		}
	}

	public int getMeso() {
		return getPlayer().getMeso();
	}

	public void gainMeso(int gain) {
		if (gain > 0){
			FilePrinter.printError(FilePrinter.EXPLOITS + c.getPlayer().getName() + ".txt", c.getPlayer().getName() + " gained " + gain + " mesos from NPC " + npc + "\r\n");
		}
		getPlayer().gainMeso(gain, true, false, true);
	}

	public void gainExp(int gain) {
		getPlayer().gainExp(gain, true, true);
	}

	public int getLevel() {
		return getPlayer().getLevel();
	}

	public void showEffect(String effect) {
		getPlayer().getMap().broadcastMessage(MaplePacketCreator.environmentChange(effect, 3));
	}

	public void setHair(int hair) {
		getPlayer().setHair(hair);
		getPlayer().updateSingleStat(MapleStat.HAIR, hair);
		getPlayer().equipChanged();
	}

	public void setFace(int face) {
		getPlayer().setFace(face);
		getPlayer().updateSingleStat(MapleStat.FACE, face);
		getPlayer().equipChanged();
	}

	public void setSkin(int color) {
		getPlayer().setSkinColor(MapleSkinColor.getById(color));
		getPlayer().updateSingleStat(MapleStat.SKIN, color);
		getPlayer().equipChanged();
	}

	public int itemQuantity(int itemid) {
		return getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(itemid)).countById(itemid);
	}

	public void displayGuildRanks() {
		MapleGuild.displayGuildRanks(getClient(), npc);
	}

	@Override
	public MapleParty getParty() {
		return getPlayer().getParty();
	}

	@Override
	public void resetMap(int mapid) {
		getClient().getChannelServer().getMapFactory().getMap(mapid).resetReactors();
	}

	public void gainCloseness(int closeness) {
		for (MaplePet pet : getPlayer().getPets()) {
			if (pet.getCloseness() > 30000) {
				pet.setCloseness(30000);
				return;
			}
			pet.gainCloseness(closeness);
			while (pet.getCloseness() > ExpTable.getClosenessNeededForLevel(pet.getLevel())) {
				pet.setLevel((byte) (pet.getLevel() + 1));
				byte index = getPlayer().getPetIndex(pet);
				getClient().announce(MaplePacketCreator.showOwnPetLevelUp(index));
				getPlayer().getMap().broadcastMessage(getPlayer(), MaplePacketCreator.showPetLevelUp(getPlayer(), index));
			}
			Item petz = getPlayer().getInventory(MapleInventoryType.CASH).getItem(pet.getPosition());
			getPlayer().forceUpdateItem(petz);
		}
	}

	public String getName() {
		return getPlayer().getName();
	}

	public int getGender() {
		return getPlayer().getGender();
	}

	public void changeJobById(int a) {
		getPlayer().changeJob(MapleJob.getById(a));
	}

	public void changeJob(MapleJob job){
		getPlayer().changeJob(job);
	}

	public MapleJob getJobName(int id) {
		return MapleJob.getById(id);
	}

	public MapleStatEffect getItemEffect(int itemId) {
		return MapleItemInformationProvider.getInstance().getItemEffect(itemId);
	}

	public void resetStats() {
		getPlayer().resetStats();
	}

	public void maxMastery() {
		for (MapleData skill_ : MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/" + "String.wz")).getData("Skill.img").getChildren()) {
			try {
				Skill skill = SkillFactory.getSkill(Integer.parseInt(skill_.getName()));
				getPlayer().changeSkillLevel(skill, (byte) 0, skill.getMaxLevel(), -1);
			} catch (NumberFormatException nfe) {
				break;
			} catch (NullPointerException npe) {
				continue;
			}
		}
	}

	public void doGachapon() {
		int[] maps = {100000000, 101000000, 102000000, 103000000, 105040300, 800000000, 809000101, 809000201, 600000000, 120000000};

		MapleGachaponItem item = MapleGachapon.getInstance().process(npc);

		Item itemGained = gainItem(item.getId(), (short) (item.getId() / 10000 == 200 ? 100 : 1), true, true); // For normal potions, make it give 100.

		sendNext("You have obtained a #b#t" + item.getId() + "##k.");
		
		String map = c.getChannelServer().getMapFactory().getMap(maps[(getNpc() != 9100117 && getNpc() != 9100109) ? (getNpc() - 9100100) : getNpc() == 9100109 ? 8 : 9]).getMapName();
		
		LogHelper.logGacha(getPlayer(), item.getId(), map);
		
		if (item.getTier() > 0){ //Uncommon and Rare
			Server.getInstance().broadcastMessage(MaplePacketCreator.gachaponMessage(itemGained, map, getPlayer()));
		}
	}
	
	public Equip loadOriginalStats(Equip current) {
		try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM original_items WHERE inventoryitemid = ?")) {
			ps.setInt(1, current.getInvId());
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
                current.setAcc((short) rs.getInt("acc"));
                current.setAvoid((short) rs.getInt("avoid"));
                current.setDex((short) rs.getInt("dex"));
                current.setHands((short) rs.getInt("hands"));
                current.setHp((short) rs.getInt("hp"));
                current.setInt((short) rs.getInt("intelligence"));
                current.setJump((short) rs.getInt("jump"));
                current.setVicious((short) rs.getInt("vicious"));
                current.setLuk((short) rs.getInt("luk"));
                current.setMatk((short) rs.getInt("matt"));
                current.setMdef((short) rs.getInt("mdef"));
                current.setMp((short) rs.getInt("mp"));
                current.setSpeed((short) rs.getInt("speed"));
                current.setStr((short) rs.getInt("str"));
                current.setWatk((short) rs.getInt("watt"));
                current.setWdef((short) rs.getInt("wdef"));
                current.setUpgradeSlots((byte) rs.getInt("upgrade_slots"));
                current.setInvId(rs.getInt("inventoryitemid"));
			}
			ps.close();
			rs.close();
			return current;
		} catch (Exception e) {
			getPlayer().dropMessage("Could not load item from database");
		}
		return null;
	}
	
	public String getEquipInfo(Equip equip) {
		return "#L0#STR: +"+ equip.getStr() +"\r\n" +
				"#L1#DEX: +"+ equip.getDex() +"\r\n" +
				"#L2#LUK: +"+ equip.getLuk() +"\r\n" +
				"#L3#INT: +"+ equip.getInt() +"\r\n" +
				"#L4#WEAPON ATTACK: "+ equip.getWatk() +"\r\n" +
				"#L5#MAGIC ATTACK: "+ equip.getMatk() +"\r\n" + 
				"#L6#NUMBER OF UPGRADES AVAILABLE: "+ equip.getUpgradeSlots() +"\r\n" +
				"#L7#NUMBER OF VICIOUS' HAMMER APPLIED: "+ equip.getVicious() +"#n\r\n";
	}
	
	public Equip createEpicItem(int itemid, short str, short dex, short Int, short luk, short wa, short ma, int slots) {
		Equip nItem = getItem(itemid);
        nItem.setStr(str); // STR
        nItem.setDex(dex); // DEX
        nItem.setInt(Int); // INT
        nItem.setLuk(luk); //LUK
        nItem.setWatk(wa);
        nItem.setMatk(ma);
        nItem.setUpgradeSlots(slots); // Can Upgrade amount
        nItem.setRingId(-1);
		return nItem;
	}
	
	public Equip gainEquip(Equip eq, long expire) {
		eq.setExpiration(expire == -1 ? -1 : System.currentTimeMillis() + expire);
        MapleInventoryManipulator.addFromDrop(getClient(), eq, true);
        c.announce(MaplePacketCreator.getShowItemGain(eq.getItemId(), (short) 1, true));
        return eq;
	}
	
	public Equip gainEquip(Equip eq) {
		return gainEquip(eq, -1);
	}
	
	public void removeItem(byte slot) {
		int itemid = getEquip(slot).getItemId();
		MapleInventoryManipulator.removeFromSlot(getClient(), MapleInventoryType.EQUIP, slot, (short) 1, false);
		c.announce(MaplePacketCreator.getShowItemGain(itemid, (short) -1, true));
	}
	
	public Equip gainEpicItem (byte slot, short str, short dex, short Int, short luk, short wa, short ma, int slots) {
        MapleInventory equip = getPlayer().getInventory(MapleInventoryType.EQUIP);
        Equip eu = (Equip) equip.getItem(slot);
        Equip nItem = createEpicItem(eu.getItemId(), str, dex, Int, luk, wa, ma, slots);
        MapleInventoryManipulator.removeFromSlot(getClient(), MapleInventoryType.EQUIP, slot, (short) 1, false);
        MapleInventoryManipulator.addFromDrop(getClient(), nItem, true);
        c.announce(MaplePacketCreator.getShowItemGain(nItem.getItemId(), (short) 1, true));
        return nItem;
	}
	
	public void gainSlot(byte slot, int add) {
		Equip equip = getEquip(slot);
		int slots = equip.getUpgradeSlots();
		gainEpicItem(slot, equip.getStr(), equip.getDex(), equip.getInt(), equip.getLuk(), equip.getWatk(),
				equip.getMatk(), slots + add);
	}

	public Equip getEquip(byte slot) {
        MapleInventory equip = getPlayer().getInventory(MapleInventoryType.EQUIP);
        return (Equip) equip.getItem(slot);
    }
	
	public Equip getItem(int itemid) {
		MapleItemInformationProvider provider = MapleItemInformationProvider.getInstance();
		return (Equip) provider.getEquipById(itemid);
	}
	
	public String getEquips() {
		String text = "";
		Map<Short, Item> equip = getPlayer().getInventory(MapleInventoryType.EQUIP).getItems();
		for (Entry<Short, Item> entry : equip.entrySet())
			text += "#L" + entry.getKey() + "##i" + entry.getValue().getItemId() + "#";
		return text;
	}
	
	public void disbandAlliance(MapleClient c, int allianceId) {
		PreparedStatement ps = null;
		try {
			ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM `alliance` WHERE id = ?");
			ps.setInt(1, allianceId);
			ps.executeUpdate();
			ps.close();
			Server.getInstance().allianceMessage(c.getPlayer().getGuild().getAllianceId(), MaplePacketCreator.disbandAlliance(allianceId), -1, -1);
			Server.getInstance().disbandAlliance(allianceId);
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		} finally {
			try {
				if (ps != null && !ps.isClosed()) {
					ps.close();
				}
			} catch (SQLException ex) {
			}
		}
	}

	public boolean canBeUsedAllianceName(String name) {
		if (name.contains(" ") || name.length() > 12) {
			return false;
		}
		try {
			ResultSet rs;
			try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT name FROM alliance WHERE name = ?")) {
				ps.setString(1, name);
				rs = ps.executeQuery();
				if (rs.next()) {
					ps.close();
					rs.close();
					return false;
				}
			}
			rs.close();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	public static MapleAlliance createAlliance(MapleCharacter chr1, MapleCharacter chr2, String name) {
		int id;
		int guild1 = chr1.getGuildId();
		int guild2 = chr2.getGuildId();
		try {
			try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO `alliance` (`name`, `guild1`, `guild2`) VALUES (?, ?, ?)", PreparedStatement.RETURN_GENERATED_KEYS)) {
				ps.setString(1, name);
				ps.setInt(2, guild1);
				ps.setInt(3, guild2);
				ps.executeUpdate();
				try (ResultSet rs = ps.getGeneratedKeys()) {
					rs.next();
					id = rs.getInt(1);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		MapleAlliance alliance = new MapleAlliance(name, id, guild1, guild2);
		try {
			Server.getInstance().setGuildAllianceId(guild1, id);
			Server.getInstance().setGuildAllianceId(guild2, id);
			chr1.setAllianceRank(1);
			chr1.saveGuildStatus();
			chr2.setAllianceRank(2);
			chr2.saveGuildStatus();
			Server.getInstance().addAlliance(id, alliance);
			Server.getInstance().allianceMessage(id, MaplePacketCreator.makeNewAlliance(alliance, chr1.getClient()), -1, -1);
		} catch (Exception e) {
			return null;
		}
		return alliance;
	}

	public boolean hasMerchant() {
		return getPlayer().hasMerchant();
	}

	public boolean hasMerchantItems() {
		try {
			if (!ItemFactory.MERCHANT.loadItems(getPlayer().getId(), false).isEmpty()) {
				return true;
			}
		} catch (SQLException e) {
			return false;
		}
		if (getPlayer().getMerchantMeso() == 0) {
			return false;
		} else {
			return true;
		}
	}

	public void showFredrick() {
		c.announce(MaplePacketCreator.getFredrick(getPlayer()));
	}

	public int partyMembersInMap() {
		int inMap = 0;
		for (MapleCharacter char2 : getPlayer().getMap().getCharacters()) {
			if (char2.getParty() == getPlayer().getParty()) {
				inMap++;
			}
		}
		return inMap;
	}

	public MapleEvent getEvent() {
		return c.getChannelServer().getEvent();
	}

	public void divideTeams() {
		if (getEvent() != null) {
			getPlayer().setTeam(getEvent().getLimit() % 2); //muhaha :D
		}
	}

	public MapleCharacter getMapleCharacter(String player) {
		MapleCharacter target =  Server.getInstance().getWorld(c.getWorld()).getChannel(c.getChannel()).getPlayerStorage().getCharacterByName(player);
		return target;
	}

	public void logLeaf(String prize) {
		LogHelper.logLeaf(getPlayer(), true, prize);
	}

	public boolean createPyramid(String mode, boolean party) {//lol
		PyramidMode mod = PyramidMode.valueOf(mode);

		MapleParty partyz = getPlayer().getParty();
		MapleMapFactory mf = c.getChannelServer().getMapFactory();

		MapleMap map = null;
		int mapid = 926010100;
		if (party) {
			mapid += 10000;
		}
		mapid += (mod.getMode() * 1000);

		for (byte b = 0; b < 5; b++) {//They cannot warp to the next map before the timer ends (:
			map = mf.getMap(mapid + b);
			if (map.getCharacters().size() > 0) {
				continue;
			} else {
				break;
			}
		}

		if (map == null) {
			return false;
		}

		if (!party) {
			partyz = new MapleParty(-1, new MaplePartyCharacter(getPlayer()));
		}
		Pyramid py = new Pyramid(partyz, mod, map.getId());
		getPlayer().setPartyQuest(py);
		py.warp(mapid);
		dispose();
		return true;
	}
}
