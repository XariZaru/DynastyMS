package client;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import client.MapleCharacter.SkillEntry;
import client.autoban.AutobanManager;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.ItemFactory;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import net.server.Server;
import net.server.guild.MapleGuildCharacter;
import net.server.world.MapleMessenger;
import net.server.world.MapleParty;
import server.CashShop;
import server.MaplePortal;
import server.MapleStorage;
import server.events.RescueGaga;
import server.maps.MapleMapFactory;
import server.maps.SavedLocation;
import server.maps.SavedLocationType;
import server.quest.MapleQuest;
import tools.DatabaseConnection;
import tools.Pair;

public class MapleCharacterFactory {
	
	public static PreparedStatement ps = null;
	public static ResultSet rs = null;

public static void loadCharacterStats(MapleCharacter ret, int charid, MapleClient client, Connection con) {      

    	try { 
			ret.setClient(client);
	        ret.setId(charid);
			ps = con.prepareStatement("SELECT * FROM characters WHERE id = ?");
	        ps.setInt(1, charid);
	        rs = ps.executeQuery();
	        if (!rs.next()) {
	            rs.close();
	            ps.close();
	            throw new RuntimeException("Loading char failed (not found)");
	        }
	        ret.setPetTaskStarted(rs.getInt("petfeatures") == 1);
	        ret.gainBossPoints(rs.getInt("bosspoints"));
	        ret.gainJQPoints(rs.getInt("jqpoints"));
	        ret.gainSteal(rs.getInt("steal"));
	        ret.gainHonor(rs.getInt("honor"));
	        ret.gainPersuasion(rs.getInt("persuasion"));
	        ret.setName(rs.getString("name"));
	        ret.setLevel(rs.getInt("level"));
	        ret.setFame(rs.getInt("fame"));
	        ret.setStr(rs.getInt("str"));
	        ret.setDex(rs.getInt("dex"));
	        ret.setInt(rs.getInt("int"));
	        ret.setLuk(rs.getInt("luk"));
	        ret.setExp(rs.getInt("exp"));
	        ret.setGachaExp(rs.getInt("gachaexp"));
	        ret.setHp(rs.getInt("hp"));
	        ret.setMaxHp(rs.getInt("maxhp"));
	        ret.setMp(rs.getInt("mp"));
	        ret.setMaxMp(rs.getInt("maxmp"));
	        ret.setHpMpApUsed(rs.getInt("hpMpUsed"));
	        ret.setHasMerchant(rs.getInt("HasMerchant") == 1);
	        String[] skillPoints = rs.getString("sp").split(",");
	        for (int i = 0; i < ret.getRemainingSps().length; i++) 
	            ret.getRemainingSps()[i] = Integer.parseInt(skillPoints[i]);
	        ret.setRemainingAp(rs.getInt("ap"));
	        ret.gainMeso(rs.getInt("meso"), false);
	        ret.setMerchantMeso(rs.getInt("MerchantMesos"));
	        ret.setGM(rs.getInt("gm"));
	        ret.setSkinColor(MapleSkinColor.getById(rs.getInt("skincolor")));
	        ret.setGender(rs.getInt("gender"));
	        ret.setJob(MapleJob.getById(rs.getInt("job")));
	        ret.setFinishedDojoTutorial(rs.getInt("finishedDojoTutorial") == 1);
	        ret.setVanquisherKills(rs.getInt("vanquisherKills"));
	        ret.setOmokWins(rs.getInt("omokwins"));
	        ret.setOmokLosses(rs.getInt("omoklosses"));
	        ret.setOmokTies(rs.getInt("omokties"));
	        ret.setMatchCardWins(rs.getInt("matchcardwins"));
	        ret.setMatchCardLosses(rs.getInt("matchcardlosses"));
	        ret.setMatchCardTies(rs.getInt("matchcardties"));
	        ret.setHair(rs.getInt("hair"));
	        ret.setFace(rs.getInt("face"));
	        ret.setAccountId(rs.getInt("accountid"));
	        ret.setMap(rs.getInt("map"));
	        ret.setSpawnPoint(rs.getInt("spawnpoint"));
	        ret.setWorld(rs.getByte("world"));
	        ret.setRank(rs.getInt("rank"));
	        ret.setRankMove(rs.getInt("rankMove"));
	        ret.setJobRank(rs.getInt("jobRank"));
	        ret.setJobRankMove(rs.getInt("jobRankMove"));
	        ret.setGuildId(rs.getInt("guildid"));
	        ret.setGuildRank(rs.getInt("guildrank"));
	        ret.setAllianceRank(rs.getInt("allianceRank"));
	        ret.setFamilyId(rs.getInt("familyId"));
	        ret.setMonsterBookCover(rs.getInt("monsterbookcover"));
	        ret.setMonsterBook(new MonsterBook());
	        ret.getMonsterBook().loadCards(charid);
	        ret.setVanquisherStage(rs.getInt("vanquisherStage"));
	        ret.setDojoPoints(rs.getInt("dojoPoints"));
	        ret.setDojoStage(rs.getInt("lastDojoStage"));
	        ret.setDataString(rs.getString("dataString"));
	        ret.setQuest(rs.getInt("quest"));
	        ret.spawnGuide(rs.getInt("guide") == 0 ? false : true);
	        if (ret.getGuildId() > 0)
	            ret.setMapleGuildCharacter(new MapleGuildCharacter(ret));
	        int buddyCapacity = rs.getInt("buddyCapacity");
	        ret.setBuddyList(new BuddyList(buddyCapacity));
	        ret.getInventory(MapleInventoryType.EQUIP).setSlotLimit((byte) 96);
	        ret.getInventory(MapleInventoryType.USE).setSlotLimit((byte) 96);
	        ret.getInventory(MapleInventoryType.SETUP).setSlotLimit((byte) 96);
	        ret.getInventory(MapleInventoryType.ETC).setSlotLimit((byte) 96);
	        
		} catch (Exception e) {
			e.printStackTrace();
		} 
    }
    
    public static void loadItems(MapleCharacter ret, boolean in_game) {
    	try {
			for (Pair<Item, MapleInventoryType> item : ItemFactory.INVENTORY.loadItems(ret.getId(), !in_game)) {
			    ret.getInventory(item.getRight()).addFromDB(item.getLeft());
			    Item itemz = item.getLeft();
			    if (itemz.getPetId() > -1) {
			        MaplePet pet = itemz.getPet();
			        if (pet != null && pet.isSummoned() && !ret.isGM()) {
			            ret.addPet(pet);
			        }
			        continue;
			    }
			    if (item.getRight().equals(MapleInventoryType.EQUIP) || item.getRight().equals(MapleInventoryType.EQUIPPED)) {
			        Equip equip = (Equip) item.getLeft();
			        if (equip.getRingId() > -1) {
			            MapleRing ring = MapleRing.loadFromDb(equip.getRingId());
			            if (item.getRight().equals(MapleInventoryType.EQUIPPED)) {
			                ring.equip();
			            }
			            if (ring.getItemId() > 1112012) {
			                ret.addFriendshipRing(ring);
			            } else {
			                ret.addCrushRing(ring);
			            }
			        }
			    }
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    
    public static void loadIntoGame(MapleCharacter ret, ResultSet rs) {
    	MapleMapFactory mapFactory = Server.getInstance().getWorld(ret.getClient().getWorld()).getChannel(ret.getClient().getChannel()).getMapFactory();
        ret.setMap(mapFactory.getMap(ret.getMapId()));
        if (ret.getMap() == null) {
            ret.setMap(mapFactory.getMap(100000000));
        }
        MaplePortal portal = ret.getMap().getPortal(ret.getInitialSpawnpoint());
        if (portal == null) {
            portal = ret.getMap().getPortal(0);
            ret.setSpawnPoint(0);
        }
        ret.setPosition(portal.getPosition());
        int partyid = 0, messengerid = 0, position = 0;
		try {
			messengerid = rs.getInt("messengerid");
	        position = rs.getInt("messengerposition");
			partyid = rs.getInt("party");
		} catch (SQLException e) {
			e.printStackTrace();
		}
        MapleParty party = Server.getInstance().getWorld(ret.getWorld()).getParty(partyid);
        if (party != null) {
            ret.setMPC(party.getMemberById(ret.getId()));
            if (ret.getMPC() != null) {
                ret.setParty(party);
            }
        }
        if (messengerid > 0 && position < 4 && position > -1) {
            MapleMessenger messenger = Server.getInstance().getWorld(ret.getWorld()).getMessenger(messengerid);
            if (messenger != null) {
                ret.setMessenger(messenger);
                ret.setMessengerPosition(position);
            }
        }
        ret.setLoggedIn(true);
    }
    
    public static void loadTrockLocations(MapleCharacter ret, PreparedStatement ps, ResultSet rs, Connection con) {
    	try {
	    	ps = con.prepareStatement("SELECT mapid,vip FROM trocklocations WHERE characterid = ? LIMIT 15");
	        ps.setInt(1, ret.getId());
	        rs = ps.executeQuery();
	        byte v = 0;
	        byte r = 0;
	        while (rs.next()) {
	            if (rs.getInt("vip") == 1) {
	                ret.getVipTrockMaps().add(rs.getInt("mapid"));
	                v++;
	            } else {
	                ret.getTrockMaps().add(rs.getInt("mapid"));
	                r++;
	            }
	        }
	        while (v < 10) {
	            ret.getVipTrockMaps().add(999999999);
	            v++;
	        }
	        while (r < 5) {
	            ret.getTrockMaps().add(999999999);
	            r++;
	        }
	        rs.close();
	        ps.close();
    	} catch (Exception e) {
    		e.printStackTrace();
    	}
    }
    
    public static void loadAccountStats(MapleCharacter ret, PreparedStatement ps, ResultSet rs, Connection con) {
    	try {
    		ps = con.prepareStatement("SELECT name, donorpoints, votepoints FROM accounts WHERE id = ?", Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, ret.getAccountID());
            rs = ps.executeQuery();
            if (rs.next()) {
                ret.getClient().setAccountName(rs.getString("name"));
                ret.addVP(rs.getInt("votepoints"));
                ret.addDP(rs.getInt("donorpoints"));
            }
            rs.close();
            ps.close();
    	} catch (Exception e) {
    		e.printStackTrace();
    	}
    }

    public static MapleCharacter loadCharFromDB(int charid, MapleClient client, boolean in_game) throws SQLException {
        try {
        	// New character
        	MapleCharacter ret = new MapleCharacter(); 
        	// Connection Stuff
        	Connection con = DatabaseConnection.getConnection();
        	
        	// Load basic character info and items
            loadCharacterStats(ret, charid, client, con);
            loadItems(ret, in_game);
            
            // Load mount stuff (should be moved out of characters table imo
            int mountexp = rs.getInt("mountexp");
	        int mountlevel = rs.getInt("mountlevel");
	        int mounttiredness = rs.getInt("mounttiredness");
	        
	        // If player is logging into the game with a character (not at channel selection or character view)
	        if (in_game)
	        	loadIntoGame(ret, rs); 
	        
            rs.close();
            ps.close();
            
            loadTrockLocations(ret, ps, rs, con);
            loadAccountStats(ret, ps, rs, con);
            
            /*
            ps = con.prepareStatement("SELECT questName, status FROM completedquests WHERE characterid = ?");
            rs = ps.executeQuery();
            while (rs.next()) {
            	ret.completedquests.put(rs.getString("questName"), rs.getInt("status"));
            }
            rs.close();
            ps.close();
            */
            ps = con.prepareStatement("SELECT `area`,`info` FROM area_info WHERE charid = ?");
            ps.setInt(1, ret.getId());
            rs = ps.executeQuery();
            while (rs.next()) {
                ret.getAreaInfos().put(rs.getShort("area"), rs.getString("info"));
            }
            rs.close();
            ps.close();
            ps = con.prepareStatement("SELECT `name`,`info` FROM eventstats WHERE characterid = ?");
            ps.setInt(1, ret.getId());
            rs = ps.executeQuery();
            while (rs.next()) {
                String name = rs.getString("name");
                if (rs.getString("name").equals("rescueGaga")) {
                    ret.getEvents().put(name, new RescueGaga(rs.getInt("info")));
                }
                //ret.events = new MapleEvents(new RescueGaga(rs.getInt("rescuegaga")), new ArtifactHunt(rs.getInt("artifacthunt")));
            }
            rs.close();
            ps.close();
            ret.setCashShop(new CashShop(ret.getAccountID(), ret.getId(), ret.getJobType()));
            ret.setAutobanManager(new AutobanManager(ret));
            ps = con.prepareStatement("SELECT name, level FROM characters WHERE accountid = ? AND id != ? ORDER BY level DESC limit 1");
            ps.setInt(1, ret.getAccountID());
            ps.setInt(2, charid);
            rs = ps.executeQuery();
            if (rs.next()) {
                ret.setLinkedName(rs.getString("name"));
                ret.setLinkedLevel(rs.getInt("level"));
            }
            rs.close();
            ps.close();
            if (in_game) {
	            ps = con.prepareStatement("SELECT * FROM queststatus LEFT JOIN questprogress ON questprogress.queststatusid = queststatus.queststatusid WHERE characterid = ?");
	            ps.setInt(1, charid);
	            rs = ps.executeQuery();
	            PreparedStatement psf = con.prepareStatement("SELECT mapid FROM medalmaps WHERE queststatusid = ?");;
	            while (rs.next()) {
	                MapleQuest q = MapleQuest.getInstance(rs.getShort("quest"));
	                MapleQuestStatus status = new MapleQuestStatus(q, MapleQuestStatus.Status.getById(rs.getInt("status")));
	                long cTime = rs.getLong("time");
	                if (cTime > -1) {
	                    status.setCompletionTime(cTime * 1000);
	                }
	                status.setForfeited(rs.getInt("forfeited"));
	                ret.getQuests().put(q.getId(), status);
	                status.setProgress(rs.getInt("progressid"), rs.getString("progress"));
	                psf.setInt(1, rs.getInt("queststatusid"));
	                try (ResultSet medalmaps = psf.executeQuery()) {
	                    while (medalmaps.next()) {
	                        status.addMedalMap(medalmaps.getInt("mapid"));
	                    }
	                } catch (Exception e) {
	                	
	                }
	            }
                rs.close();
                ps.close();
                psf.close();
                ps = con.prepareStatement("SELECT skillid,skilllevel,masterlevel,expiration FROM skills WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.getSkills().put(SkillFactory.getSkill(rs.getInt("skillid")), new SkillEntry(rs.getByte("skilllevel"), rs.getInt("masterlevel"), rs.getLong("expiration")));
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("SELECT SkillID,StartTime,length FROM cooldowns WHERE charid = ?");
                ps.setInt(1, ret.getId());
                rs = ps.executeQuery();
                while (rs.next()) {
                    final int skillid = rs.getInt("SkillID");
                    final long length = rs.getLong("length"), startTime = rs.getLong("StartTime");
                    if (skillid != 5221999 && (length + startTime < System.currentTimeMillis())) {
                        continue;
                    }
                    ret.giveCoolDowns(skillid, startTime, length);
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("DELETE FROM cooldowns WHERE charid = ?");
                ps.setInt(1, ret.getId());
                ps.executeUpdate();
                ps.close();
                ps = con.prepareStatement("SELECT * FROM skillmacros WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    int position = rs.getInt("position");
                    SkillMacro macro = new SkillMacro(rs.getInt("skill1"), rs.getInt("skill2"), rs.getInt("skill3"), rs.getString("name"), rs.getInt("shout"), position);
                    ret.getSkillMacros()[position] = macro;
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("SELECT `key`,`type`,`action` FROM keymap WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    int key = rs.getInt("key");
                    int type = rs.getInt("type");
                    int action = rs.getInt("action");
                    ret.getKeymap().put(Integer.valueOf(key), new MapleKeyBinding(type, action));
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("SELECT `locationtype`,`map`,`portal` FROM savedlocations WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.getSavedLocations()[SavedLocationType.valueOf(rs.getString("locationtype")).ordinal()] = new SavedLocation(rs.getInt("map"), rs.getInt("portal"));
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("SELECT `characterid_to`,`when` FROM famelog WHERE characterid = ? AND DATEDIFF(NOW(),`when`) < 30");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.setLastFameTime(Math.max(ret.getLastFameTime(), rs.getTimestamp("when").getTime()));
                    ret.getLastMonthFameIds().add(Integer.valueOf(rs.getInt("characterid_to")));
                }
                rs.close();
                ps.close();
                ret.getBuddylist().loadFromDb(charid);
                ret.setStorage(MapleStorage.loadOrCreateFromDB(ret.getAccountID(), ret.getWorld()));
                ret.recalcLocalStats();
                //ret.resetBattleshipHp();
                ret.silentEnforceMaxHpMp();
            }
            int mountid = ret.getJobType() * 10000000 + 1004;
            if (ret.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -18) != null) {
                ret.setMount(new MapleMount(ret, ret.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -18).getItemId(), mountid));
            } else {
                ret.setMount(new MapleMount(ret, 0, mountid));
            }
            ret.getMount().setExp(mountexp);
            ret.getMount().setLevel(mountlevel);
            ret.getMount().setTiredness(mounttiredness);
            ret.getMount().setActive(false);
            return ret;
        } catch (SQLException | RuntimeException e) {
            e.printStackTrace();
        }
        return null;
    }
	
}
