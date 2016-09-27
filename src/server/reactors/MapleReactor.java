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
package server.reactors;

import client.MapleClient;
import java.util.HashMap;
import java.util.Map;

import server.maps.AbstractMapleMapObject;
import server.maps.MapleMap;
import server.maps.MapleMapObjectType;
import tools.MaplePacketCreator;

/**
 *
 * @author Lerk
 */
public class MapleReactor extends AbstractMapleMapObject {

    private int rid;
    private Integer currState;
    private int delay;
    private MapleMap map;
    private String name;
//    private boolean timerActive;
    private boolean alive;
    private Map<Integer, ReactorState> states = new HashMap<>();

    public MapleReactor(int rid) {
        this.rid = rid;
        alive = true;
    }

    public MapleReactor(MapleReactor react) {
        this.rid = react.getId();
        this.states = react.getStates();
        this.name = react.getName();

        alive = true;
    }

    public int getId() {
        return rid;
    }

    public void setDelay(int delay) {
        this.delay = delay;
    }

    public int getDelay() {
        return delay;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.REACTOR;
    }

    public void setState(Integer state) {
        currState = state;
        if (getMap() != null) {
            getMap().broadcastMessage(MaplePacketCreator.triggerReactor(this, 2));
        }
    }

    public int getCurrState() {
        return currState;
    }

    public byte getCurrStateAsByte() {
        return currState.byteValue();
    }

    public ReactorState getState() {
        return states.get(currState);
    }

    public void setMap(MapleMap map) {
        this.map = map;
    }

    public MapleMap getMap() {
        return map;
    }

    public boolean isAlive() {
        return alive;
    }

    public void setAlive(boolean alive) {
        this.alive = alive;
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.announce(makeDestroyData());
    }

    public final byte[] makeDestroyData() {
        return MaplePacketCreator.destroyReactor(this);
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        client.announce(makeSpawnData());
    }

    public final byte[] makeSpawnData() {
        return MaplePacketCreator.spawnReactor(this);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addState(Integer index, ReactorState newState) {
        states.put(index, newState);
    }

    public Map<Integer, ReactorState> getStates() {
        return states;
    }

    public void runEvents(MapleClient c) {
        states.get(currState).runEvents(c, this, ReactorHitType.DEFAULT);
    }

    public boolean checkEvents(MapleClient c) {
        return states.get(currState).checkEvents(c, this, ReactorHitType.DEFAULT);
    }

    public void hitReactor(ReactorHitType type, int skillid, MapleClient c) {
        if (this.isAlive()) {
            states.get(currState).runEvents(c, this, type);
        }
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 89 * hash + this.rid;
        hash = 89 * hash + this.getObjectId();
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        final MapleReactor other = (MapleReactor) obj;
        if (this.rid != other.rid) {
            return false;
        }
        return this.getObjectId() == other.getObjectId();
    }

}
