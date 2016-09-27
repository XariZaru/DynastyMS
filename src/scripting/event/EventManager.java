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
package scripting.event;

import java.util.Collection;
import java.util.Collections;
import java.util.Properties;
import java.util.concurrent.ScheduledFuture;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.script.Invocable;
import javax.script.ScriptException;

import net.server.channel.Channel;
import net.server.world.MapleParty;
import server.TimerManager;
import server.expeditions.MapleExpedition;
import server.maps.MapleMap;
import client.MapleCharacter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import tools.Pair;

/**
 *
 * @author Matze
 * @modified David, peter
 */
public class EventManager {

    private Invocable iv;
    private Channel cserv;
    private ConcurrentMap<String, EventInstanceManager> instances = new ConcurrentHashMap<>();
    private Properties props = new Properties();
    private List<Pair<Integer, Integer>> investigationResults = new ArrayList<>();
    private String name;
    private ScheduledFuture<?> schedule = null;
    //a cache to store party until eim can register it.
    private Map<String, MapleParty> pqParties = new HashMap<>();

    public EventManager(Channel cserv, Invocable iv, String name) {
        this.iv = iv;
        this.cserv = cserv;
        this.name = name;
    }

    public void cancel() {
        try {
            iv.invokeFunction("cancelSchedule", (Object) null);
        } catch (ScriptException | NoSuchMethodException ex) {
            ex.printStackTrace();
            Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception e) {
        	
        }
    }

    public void schedule(String methodName, long delay) {
        schedule(methodName, null, delay);
    }

    public void schedule(final String methodName, final EventInstanceManager eim, long delay) {

        schedule = TimerManager.getInstance().schedule(() -> {
//            LogHelper.INVOCABLE.get().info("Invoking " + methodName
//                    + " in Event Manager " + name + (eim != null ? " : " + eim.getName() : ""));
            //FilePrinter.printError(FilePrinter.EXCEPTION, "Invoking " + methodName + " in Event Script " + name);
            try {
                iv.invokeFunction(methodName, eim);
            } catch (ScriptException | NoSuchMethodException ex) {
                Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
            }
        }, delay);
    }

    public void cancelSchedule() {
        schedule.cancel(true);
    }

    public ScheduledFuture<?> scheduleAtTimestamp(final String methodName, long timestamp) {
        return TimerManager.getInstance().scheduleAtTimestamp(() -> {
            try {
                iv.invokeFunction(methodName, (Object) null);
            } catch (ScriptException | NoSuchMethodException ex) {
                Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
            }
        }, timestamp);
    }

    public Channel getChannelServer() {
        return cserv;
    }

    public EventInstanceManager getInstance(String name) {
        return instances.get(name);
    }

    public Collection<EventInstanceManager> getInstances() {
        return Collections.unmodifiableCollection(instances.values());
    }

    public EventInstanceManager newInstance(String name) {
        EventInstanceManager ret = new EventInstanceManager(this, name);
        instances.put(name, ret);
        return ret;
    }

    public void disposeInstance(String name) {
        instances.remove(name);
    }

    public Invocable getIv() {
        return iv;
    }

    public MapleParty getParty(String pq) {
        return pqParties.get(pq);
    }

    public void removeParty(MapleParty party) {
        for (Entry<String, MapleParty> ptEntry : pqParties.entrySet()) {
            if (ptEntry.getValue() == party) {
                pqParties.remove(ptEntry.getKey());
                return;
            }
        }
    }

    public void setProperty(String key, String value) {
        props.setProperty(key, value);
    }

    public String getProperty(String key) {
        return props.getProperty(key);
    }

    public void setProperty(String key, int value) {
        props.setProperty(key, value + "");
    }

    public int getIntProperty(String key) {
        return Integer.parseInt(props.getProperty(key));
    }

    public List<Pair<Integer, Integer>> getInvestigationResults() { // Testing for Investigation Result caching
        return investigationResults;
    }

    public void addInvestigationResults(int x, int y) {
        investigationResults.add(new Pair<>(x, y));
    }

    public String getName() {
        return name;
    }

    //Expedition method: starts an expedition
    public void startInstance(MapleExpedition exped) {
        startInstance(exped, 0);
    }

    public void startInstance(MapleExpedition exped, final int questID) {
        startInstance(exped, questID, 0);
    }

    public void startInstance(MapleExpedition exped, final int questID, final int times) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", (Object) null));
            eim.registerExpedition(exped);
            for (MapleCharacter chr : exped.getMembers()) {
                if (chr != null && chr.getMapId() == exped.getLeader().getMapId()) {
                    //chr.getQuestNAdd((short) (questID + 1)).setCustomData(String.valueOf(times)); // Amount of times fought
                    if (questID > 0 && times < 2) { // only get the first time for the day, so times don't get reset everytime they enter
                        //chr.getQuestNAdd((short) questID).setTimeData(String.valueOf(System.currentTimeMillis()));
                    }
                }
            }
            exped.start();
        } catch (ScriptException | NoSuchMethodException ex) {
            Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    //Regular method: player 
    public void startInstance(MapleCharacter chr) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", chr));
            eim.registerPlayer(chr);
        } catch (ScriptException | NoSuchMethodException ex) {
            Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    //recommended to use this for PQ (especially for those with ranks)
    //NOTE: use this if you are using PartyQuest or its subclass.
    public void startPQ(String pq, MapleParty party, MapleMap map) {
        pqParties.put(pq, party);
        //for HPQ cuz im lazy and dont need to change the existing codes, and why not, no harm for all PQ to get this also xD
//        props.setProperty(pq, pq + "_" + party.getLeader().getName());
        props.setProperty(pq + "Open", "false"); //cuz i can and its better. combo set, bruh.
        startInstance(party, map);
    }

    //PQ method: starts a PQ
    public void startInstance(MapleParty party, MapleMap map) {
        if (map.getId() == 261000011 || map.getId() == 261000021) {
            props.clear();
            investigationResults.clear();
        }
        this.setProperty("channel", "" + party.getLeader().getChannel());
        startInstance(party, map, null, false);
    }

    public void startInstance(MapleParty party, MapleMap currentMap, MapleMap battleMap, boolean mcpq) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup",
                    (Object) (mcpq ? battleMap.getId() : null)));
            if (mcpq) {
                eim.registerCarnivalParty(party.getLeader().getPlayer(), currentMap, (byte) 0);
            } else {
                eim.registerParty(party, currentMap);
            }
        } catch (ScriptException | NoSuchMethodException ex) {
            Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void startCPQ(MapleCharacter chr) {
        try {
            EventInstanceManager eim = (EventInstanceManager) iv.invokeFunction("setup", (Object) null);
            eim.registerCarnivalParty(chr, chr.getMap(), (byte) 0);
        } catch (NoSuchMethodException | ScriptException ex) {
            Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    //non-PQ method for starting instance
    public void startInstance(EventInstanceManager eim, String leader) {
        try {
            iv.invokeFunction("setup", eim);
            eim.setProperty("leader", leader);
        } catch (ScriptException | NoSuchMethodException ex) {
            Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
