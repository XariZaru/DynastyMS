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
package client.inventory;

import java.awt.Point;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.ScheduledFuture;

import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.TimerManager;
import server.movement.AbsoluteLifeMovement;
import server.movement.LifeMovement;
import server.movement.LifeMovementFragment;
import tools.DatabaseConnection;
import tools.MaplePacketCreator;
import tools.Randomizer;
import client.MapleCharacter;
import client.pets.DonorPetFeature;
import client.pets.DonorPetFeatureType;
import constants.ExpTable;
import net.server.Server;
import net.server.world.World;

import com.mysql.jdbc.Statement;

/**
 *
 * @author Matze
 */
public class MaplePet extends Item {
    private String name;
    private int uniqueid;
    private int closeness = 0;
    private byte level = 1;
    private int fullness = 100; 
    private int Fh;
    private Point pos;
    private int stance;
    private boolean summoned;
    private ScheduledFuture<?> fullnessSchedule;
    private DonorPetFeature petfeature;
	public DonorPetFeatureType donortype = DonorPetFeatureType.DROP;

    private MaplePet(int id, short position, int uniqueid) {
        super(id, position, (short) 1);
        this.uniqueid = uniqueid;
    }

    public static MaplePet loadFromDb(int itemid, short position, int petid) {
        try {
            MaplePet ret = new MaplePet(itemid, position, petid);
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT name, level, closeness, fullness, summoned, type FROM pets WHERE petid = ?"); // Get pet details..
            ps.setInt(1, petid);
            ResultSet rs = ps.executeQuery();
            rs.next();
            ret.setName(rs.getString("name")); 
            ret.setCloseness(Math.min(rs.getInt("closeness"), 30000));
            ret.setLevel((byte) Math.min(rs.getByte("level"), 30));
            ret.setFullness(Math.min(rs.getInt("fullness"), 100));
            ret.setSummoned(rs.getInt("summoned") == 1);
            ret.setDonorType(DonorPetFeatureType.getByType((byte) rs.getInt("type")));
            rs.close();
            ps.close();
            return ret;
        } catch (SQLException e) {
            return null;
        }
    }

    public void saveToDb() {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE pets SET name = ?, level = ?, closeness = ?, fullness = ?, summoned = ?, type = ? WHERE petid = ?");
            ps.setString(1, getName());
            ps.setInt(2, getLevel());
            ps.setInt(3, getCloseness());
            ps.setInt(4, getFullness());
            ps.setInt(5, isSummoned() ? 1 : 0);
            ps.setInt(6, getDonorType().getType());
            ps.setInt(7, getUniqueId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
        }
    }

    public static int createPet(int itemid) {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO pets (name, level, closeness, fullness, summoned) VALUES (?, 1, 0, 100, 0)", Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, MapleItemInformationProvider.getInstance().getName(itemid));
            ps.executeUpdate();        
            ResultSet rs = ps.getGeneratedKeys();
            int ret = -1;
            if (rs.next()) {
                ret = rs.getInt(1);
            }
            rs.close();
            ps.close();
            return ret;
        } catch (SQLException e) {
            return -1;
        }
    }
    
    public void setDonorType(DonorPetFeatureType type) {
    	this.donortype = type;
    }
    
    public DonorPetFeatureType getDonorType() {
    	return donortype;
    }

    public static int createPet(int itemid, byte level, int closeness, int fullness) {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO pets (name, level, closeness, fullness, summoned) VALUES (?, ?, ?, ?, 0)", Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, MapleItemInformationProvider.getInstance().getName(itemid));
            ps.setByte(2, level);
            ps.setInt(3, closeness);
            ps.setInt(4, fullness);
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            int ret = -1;
            if (rs.next()) {
                ret = rs.getInt(1);
                rs.close();
                ps.close();
            }
            return ret;
        } catch (SQLException e) {
            return -1;
        }
    }
    
    public void setDonorFeature(DonorPetFeature feature) {
    	this.petfeature = feature;
    }
    
    public DonorPetFeature getDonorFeature() {
    	return this.petfeature;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getUniqueId() {
        return uniqueid;
    }

    public void setUniqueId(int id) {
        this.uniqueid = id;
    }

    public int getCloseness() {
        return closeness;
    }

    public void setCloseness(int closeness) {
        this.closeness = closeness;
    }

    public void gainCloseness(int x, MapleCharacter owner) {
    	byte index = owner.getPetIndex(this);
        if (closeness < 30000) {
        	closeness += x;
            if (closeness >= ExpTable.getClosenessNeededForLevel(getLevel())) {
                level++;
                owner.getClient().announce(MaplePacketCreator.showOwnPetLevelUp(index));
                owner.getMap().broadcastMessage(MaplePacketCreator.showPetLevelUp(owner, index));
            }
        }
        
    }

    public byte getLevel() {
        return level;
    }

    public void setLevel(byte level) {
        this.level = level;
    }

    public int getFullness() {
        return fullness;
    }

    public void setFullness(int fullness) {
        this.fullness = fullness;
    }

    public int getFh() {
        return Fh;
    }

    public void setFh(int Fh) {
        this.Fh = Fh;
    }

    public Point getPos() {
        return pos;
    }

    public void setPos(Point pos) {
        this.pos = pos;
    }

    public int getStance() {
        return stance;
    }

    public void setStance(int stance) {
        this.stance = stance;
    }

    public boolean isSummoned() {
        return summoned;
    }

    public void setSummoned(boolean yes) {
        this.summoned = yes;
    }
    
    public void fedPet() {
    	
    }
    
    public void cancelFullnessSchedule() {
    	if (fullnessSchedule != null)
    		fullnessSchedule.cancel(true);
    }
    
    public void startFullnessSchedule(MapleCharacter owner) {
    	
        if (fullnessSchedule != null)
        	fullnessSchedule.cancel(true);
        
        fullnessSchedule = TimerManager.getInstance().register(() -> {
			byte index = owner.getPetIndex(this);
	        int newFullness = fullness - PetDataFactory.getHunger(getItemId());
	        
	        
	        // Auto feed for donors
	    	if (owner.hasDonorFeatures() && owner.haveItem(2120000) && newFullness <= 70) {
	            newFullness += 30;
	            if (Randomizer.nextInt(101) > 50) {
	            	gainCloseness(1, owner);
	            }
	            
	            MapleInventoryManipulator.removeById(owner.getClient(), MapleInventoryType.USE, 2120000, 1, false, true);
	            owner.getMap().broadcastMessage(MaplePacketCreator.commandResponse(owner.getId(), index, 0, true));
	    	}
	    	
	    	// If starved
	        if (newFullness <= 5) {
	            setFullness(15);
	            owner.unequipPet(this, true);
	            return;
	        }
	        
	        // Update pet otherwise
	        setFullness(newFullness);
	        Item ipet = owner.getInventory(MapleInventoryType.CASH).getItem(getPosition());
	        if (ipet != null)
	        	owner.forceUpdateItem(ipet);
	        
        }, 180000, 180000); 
    }

    public boolean canConsume(int itemId) {
        for (int petId : MapleItemInformationProvider.getInstance().petsCanConsume(itemId)) {
            if (petId == this.getItemId()) {
                return true;
            }
        }
        return false;
    }

    public void updatePosition(List<LifeMovementFragment> movement) {
        for (LifeMovementFragment move : movement) {
            if (move instanceof LifeMovement) {
                if (move instanceof AbsoluteLifeMovement) {
                    this.setPos(((LifeMovement) move).getPosition());
                }
                this.setStance(((LifeMovement) move).getNewstate());
            }
        }
    }
}