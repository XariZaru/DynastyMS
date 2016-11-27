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

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import net.AbstractMaplePacketHandler;
import net.server.PlayerBuffValueHolder;
import net.server.Server;
import net.server.channel.Channel;
import net.server.channel.CharacterIdChannelPair;
import net.server.guild.MapleAlliance;
import net.server.guild.MapleGuild;
import net.server.world.MaplePartyCharacter;
import net.server.world.PartyOperation;
import net.server.world.World;
import scripting.npc.NPCScriptManager;
import server.life.MapleNPCFactory;
import tools.DatabaseConnection;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import client.BuddylistEntry;
import client.CharacterNameAndId;
import client.MapleCharacter;
import client.MapleCharacterFactory;
import client.MapleClient;
import client.MapleFamily;
import client.SkillFactory;
import client.inventory.MapleInventoryType;
import constants.GameConstants;

public final class PlayerLoggedinHandler extends AbstractMaplePacketHandler {

    @Override
    public final boolean validateState(MapleClient c) {
        return !c.isLoggedIn();
    }

    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        final int cid = slea.readInt();
        Server server = Server.getInstance();
        MapleCharacter player = c.getWorldServer().getPlayerStorage().getCharacterById(cid);
        boolean newcomer = false;
        if (player == null) {
            try {
                player = MapleCharacter.loadCharFromDB(cid, c, true);
                newcomer = true;
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            player.newClient(c);
        }
        if (player == null) { //If you are still getting null here then please just uninstall the game >.>, we dont need you fucking with the logs
        	c.disconnect(true, false);
        	return;
        }
        c.setPlayer(player);
        c.setAccID(player.getAccountID());
        
        int state = c.getLoginState();
        boolean allowLogin = true;
        
        if (state == MapleClient.LOGIN_SERVER_TRANSITION || state == MapleClient.LOGIN_NOTLOGGEDIN) {
            for (String charName : c.loadCharacterNames(c.getWorld())) {
                for (Channel ch : c.getWorldServer().getChannels()) {
                    if (ch.isConnected(charName)) {
                        allowLogin = false;
                    }
                }
                break;
            }
        }
        if (state != MapleClient.LOGIN_SERVER_TRANSITION || !allowLogin) {
            c.setPlayer(null);
            c.announce(MaplePacketCreator.getAfterLoginError(7));
            return;
        }
        c.updateLoginState(MapleClient.LOGIN_LOGGEDIN);
        
        List<PlayerBuffValueHolder> buffs = server.getPlayerBuffStorage().getBuffsFromStorage(player.getId());
        if (buffs != null) {
            player.silentGiveBuffs(buffs);
        }
        
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE dueypackages SET Checked = 0 where RecieverId = ? AND Checked = 1");
            ps.setInt(1, player.getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        c.announce(MaplePacketCreator.getCharInfo(player));
        if (!player.isHidden()) {
            player.toggleHide(true);
        }
        player.sendKeymap();
        player.sendMacros();
        
        if(player.getKeymap().get(91) != null)
            player.announce(MaplePacketCreator.sendAutoHpPot(player.getKeymap().get(91).getAction()));
        if(player.getKeymap().get(92) != null)
            player.announce(MaplePacketCreator.sendAutoMpPot(player.getKeymap().get(92).getAction()));
        
        Channel cserv = server.getWorld(c.getWorld()).getChannel(c.getChannel());
        c.setChannel(cserv.getId());
        cserv.getMapFactory().getMap(player.getMap().getId()).addPlayer(player);
        World world = server.getWorld(c.getWorld());
        world.getPlayerStorage().addPlayer(player);
        cserv.addPlayer(player);
        
        loadPartyStuff(player, world);
        loadBuddyStuff(player, world);
        loadFamilyStuff(player, world);
        loadGuildStuff(player);
        
        player.showNote();

        if (player.getInventory(MapleInventoryType.EQUIPPED).findById(1122017) != null)
            player.equipPendantOfSpirit();
        
        if (player.petTaskStarted())
        	player.startPetTasks();
        
        if(newcomer) {
        }
  
        c.announce(MaplePacketCreator.updateGender(player));
        player.checkMessenger();
        c.announce(MaplePacketCreator.enableReport());
        player.changeSkillLevel(SkillFactory.getSkill(10000000 * player.getJobType() + 12), (byte) (player.getLinkedLevel() / 10), 20, -1);
        player.checkBerserk();
        player.expirationTask();
        player.setRates();
        player.spawnGuide(player.getGuide() ? true : false);
        if (player.getLevel() <= 2) {
	        c.removeClickedNPC();
			NPCScriptManager.getInstance().dispose(c);
			NPCScriptManager.getInstance().start(c, (!player.isCygnus() ? 1202000 : 
					1101008), null);
        }
        
        c.announce(MaplePacketCreator.setNPCScriptable());
        for (Integer npcid : MapleNPCFactory.npcs)
        	c.announce(MaplePacketCreator.setNPCScriptable(npcid));
        
		if (GameConstants.hasSPTable(player.getJob()) && player.getJob().getId() != 2001)
			player.createDragon();
		
        if (newcomer) {
        	if (player.isGM())
            	Server.getInstance().broadcastGMMessage(MaplePacketCreator.earnTitleMessage("GM " + player.getName() + " has logged in"));
            if (player.getJob().getId() == 511 || player.getJob().getId() == 512) 
            	player.dropMessage(5, "Your WATK and MATK has been buffed by "+(player.getJob().getId() == 511 ? "20" : "40" )+" since you are a buccaneer.");
        }
    }
    
    public void loadPartyStuff(MapleCharacter player, World world) {
    	if (player.getParty() != null) {
            MaplePartyCharacter pchar = player.getMPC();
            pchar.setChannel(player.getClient().getChannel());
            pchar.setMapId(player.getMapId());
            pchar.setOnline(true);
            world.updateParty(player.getParty().getId(), PartyOperation.LOG_ONOFF, pchar);
        }
        player.updatePartyMemberHP();
    }
    
    public void loadBuddyStuff(MapleCharacter player, World world) {
    	int buddyIds[] = player.getBuddylist().getBuddyIds();
        world.loggedOn(player.getName(), player.getId(), player.getClient().getChannel(), buddyIds);
        
        for (CharacterIdChannelPair onlineBuddy : world.multiBuddyFind(player.getId(), buddyIds)) {
            BuddylistEntry ble = player.getBuddylist().get(onlineBuddy.getCharacterId());
            ble.setChannel(onlineBuddy.getChannel());
            player.getBuddylist().put(ble);
        }
        player.getClient().announce(MaplePacketCreator.updateBuddylist(player.getBuddylist().getBuddies()));
        player.getClient().announce(MaplePacketCreator.updateBuddylist(player.getBuddylist().getBuddies()));
        
        CharacterNameAndId pendingBuddyRequest = player.getBuddylist().pollPendingRequest();
        
        if (pendingBuddyRequest != null) 
            player.getClient().announce(MaplePacketCreator.requestBuddylistAdd(pendingBuddyRequest.getId(), player.getId(), pendingBuddyRequest.getName()));  
        
    }
    
    public void loadFamilyStuff(MapleCharacter player, World world) {
    	player.getClient().announce(MaplePacketCreator.loadFamily(player));
        if (player.getFamilyId() > 0) {
            MapleFamily f = world.getFamily(player.getFamilyId());
            if (f == null) {
                f = new MapleFamily(player.getId());
                world.addFamily(player.getFamilyId(), f);
            }
            player.setFamily(f);
            player.getClient().announce(MaplePacketCreator.getFamilyInfo(f.getMember(player.getId())));
        }
    }
    
    public void loadGuildStuff(MapleCharacter player) {
    	if (player.getGuildId() > 0) {
            MapleGuild playerGuild = Server.getInstance().getGuild(player.getGuildId(), player.getWorld(), player.getMGC());
            if (playerGuild == null) {
                player.deleteGuild(player.getGuildId());
                player.resetMGC();
                player.setGuildId(0);
            } else {
                Server.getInstance().setGuildMemberOnline(player.getMGC(), true, player.getClient().getChannel());
                player.getClient().announce(MaplePacketCreator.showGuildInfo(player));
                int allianceId = player.getGuild().getAllianceId();
                if (allianceId > 0) {
                    MapleAlliance newAlliance = Server.getInstance().getAlliance(allianceId);
                    if (newAlliance == null) {
                        newAlliance = MapleAlliance.loadAlliance(allianceId);
                        if (newAlliance != null) {
                            Server.getInstance().addAlliance(allianceId, newAlliance);
                        } else {
                            player.getGuild().setAllianceId(0);
                        }
                    }
                    if (newAlliance != null) {
                        player.getClient().announce(MaplePacketCreator.getAllianceInfo(newAlliance));
                        player.getClient().announce(MaplePacketCreator.getGuildAlliances(newAlliance, player.getClient()));
                        Server.getInstance().allianceMessage(allianceId, MaplePacketCreator.allianceMemberOnline(player, true), player.getId(), -1);
                    }
                }
            }
        }
    }
}
