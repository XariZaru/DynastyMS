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

import java.io.File;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Properties;
import javax.script.ScriptException;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import provider.MapleDataProviderFactory;
import server.TimerManager;
import server.expeditions.MapleExpedition;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import tools.DatabaseConnection;
import client.MapleCharacter;
import client.listeners.MobDeadEvent;
import client.listeners.MobDeadListener;

import java.util.Calendar;
import server.partyquest.MonsterCarnivalParty;
import tools.FilePrinter;
import tools.MaplePacketCreator;
import java.util.concurrent.ScheduledFuture;
import java.util.List;
import java.util.ArrayList;
import server.life.MapleLifeFactory;
import tools.LogHelper;
import tools.Randomizer;

/**
 *
 * @author Matze
 * @modified David, peter
 */
public class EventInstanceManager implements MobDeadListener {

    private List<MapleCharacter> chars = new ArrayList<>();
    private List<MapleMonster> mobs = new LinkedList<>();
    private Map<MapleCharacter, Integer> killCount = new HashMap<>();
    private EventManager em;
    private MapleMapFactory mapFactory;
    private String name;
    private Properties props = new Properties();
    private long timeStarted = 0;
    private long eventTime = 0;
    private MapleExpedition expedition = null;
    private boolean disposed = false;
    private ScheduledFuture<?> sf;
    private MapleParty party;

    public EventInstanceManager(EventManager em, String name) {
        this.em = em;
        this.name = name;
        mapFactory = new MapleMapFactory(
                MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Map.wz")),
                MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/String.wz")),
                (byte) 0, (byte) 1);//Fk this
        mapFactory.setChannel(em.getChannelServer().getId());
    }

    public EventManager getEm() {
        return em;
    }

    public void registerPlayer(MapleCharacter chr) {
        if (chr == null || !chr.isLoggedin()) {
            return;
        }
        try {
            chars.add(chr);
            chr.setEventInstance(this);
            em.getIv().invokeFunction("playerEntry", this, chr);
        } catch (ScriptException | NoSuchMethodException ex) {
            ex.printStackTrace();
        }
    }

    public void restartEventTimer(long time) {
        try {
            if (disposed) {
                return;
            }
            timeStarted = System.currentTimeMillis();
            eventTime = time;
            if (sf != null) {
                sf.cancel(false);
            }
            sf = null;
            final int timesend = (int) time / 1000;

            for (MapleCharacter chr : getPlayers()) {
                chr.getClient().getSession().write(MaplePacketCreator.getClock(timesend));
            }
            timeOut(time);
//            timeOut(time, this); //ori

        } catch (NumberFormatException ex) {
            System.out.println("Event name " + em.getName() + ", Instance name : " + name
                    + ", method Name : restartEventTimer:\n");
        }
    }

    public void changedMap(final MapleCharacter chr, final int mapid) {
        if (disposed) {
            return;
        }
        try {
            em.getIv().invokeFunction("changedMap", this, chr, mapid);
        } catch (NullPointerException npe) {
        } catch (NoSuchMethodException | ScriptException ex) {
            System.out.println("Event name " + em.getName() + ", Instance name : " + name
                    + ", method Name : changedMap:\n" + ex);
        }
    }

    public void movePlayer(MapleCharacter chr) {
        try {
            em.getIv().invokeFunction("moveMap", this, chr);
        } catch (ScriptException | NoSuchMethodException ex) {
            ex.printStackTrace();
        }
    }

    public void playerKilled(MapleCharacter chr) {
        try {
            em.getIv().invokeFunction("playerDead", this, chr);
        } catch (ScriptException | NoSuchMethodException ex) {
            ex.printStackTrace();
        }
    }

    public boolean revivePlayer(MapleCharacter chr, boolean wheel) {
        try {
            // The method returns a boolean, but it takes a boolean?
            Object b = em.getIv().invokeFunction("playerRevive", this, chr, wheel);
            if (b instanceof Boolean) {
                return (Boolean) b;
            }
        } catch (NoSuchMethodException e) {
            try {
                Object b = em.getIv().invokeFunction("playerRevive", this, chr);
                if (b instanceof Boolean) {
                    return (Boolean) b;
                }
            } catch (ScriptException | NoSuchMethodException ex) {
                ex.printStackTrace();
            }
        } catch (ScriptException e) {
            e.printStackTrace();
        }
        return true;
    }

    public void playerDisconnected(MapleCharacter chr) {
        try {
            em.getIv().invokeFunction("playerDisconnected", this, chr);
        } catch (ScriptException | NoSuchMethodException ex) {
            ex.printStackTrace();
        }
    }

    //might wanna move player.endPQ(false) stuffs here so that pq scripts wont need to include it
    public void leftParty(MapleCharacter chr) {
        try {
            em.getIv().invokeFunction("leftParty", this, chr);
        } catch (ScriptException | NoSuchMethodException ex) {
            ex.printStackTrace();
        }
    }

    //might wanna move player.endPQ(false) stuffs here so that pq scripts wont need to include it
    public void disbandParty() {
        try {
            em.getIv().invokeFunction("disbandParty", this);
        } catch (ScriptException | NoSuchMethodException ex) {
            ex.printStackTrace();
        }
    }

    //might wanna move player.endPQ(true) stuffs here so that pq scripts wont need to include it
    public void finishPQ() {
        try {
            em.getIv().invokeFunction("clearPQ", this);
        } catch (ScriptException | NoSuchMethodException ex) {
            ex.printStackTrace();
        }
    }

    //might wanna move player.endPQ(false) stuffs here so that pq scripts wont need to include it
    public void removePlayer(MapleCharacter chr) {
        try {
            em.getIv().invokeFunction("playerExit", this, chr);
        } catch (ScriptException | NoSuchMethodException ex) {
            ex.printStackTrace();
        }
    }

    public boolean isLeader(MapleCharacter chr) {
        return (chr.getParty().getLeader().getId() == chr.getId());
    }

    //NOTE: should not use this. make sure you changed all the references before you remove it.
    //should be removed, but im just gonna leave it here lol.
    public boolean timeOut(final long delay, final EventInstanceManager eim) {
        if (disposed || eim == null || eim.getEm() == null) {
            return false;
        }

        sf = TimerManager.getInstance().schedule(() -> {
            if (disposed || eim == null || eim.getEm() == null) {
                return;
            }

            try {
                eim.getEm().getIv().invokeFunction("scheduledTimeOut", eim);
            } catch (NoSuchMethodException | ScriptException ex) {
//                System.out.println("Event name " + em.getName() + ", Instance name : " + name
//                        + ", method Name : scheduledTimeout:\n" + ex);
                //added this cuz the function is called timeOut in some scripts
                try {
                    eim.getEm().getIv().invokeFunction("timeOut", eim);
                } catch (NoSuchMethodException | ScriptException ex1) {
                    System.out.println("Event name " + eim.getEm().getName()
                            + ", Instance name : " + eim.getName()
                            + ", method Name : scheduledTimeOut and timeOut:\n" + ex1);
                }
            }
        }, delay);

        return true;
    }

    public boolean timeOut(final long delay) {
        if (disposed || em == null) {
            return false;
        }

        sf = TimerManager.getInstance().schedule(() -> {
            if (disposed || em == null) {
                return;
            }

            try {
                em.getIv().invokeFunction("scheduledTimeOut", this);
            } catch (NoSuchMethodException | ScriptException ex) { //i know, it should be just NoSuchMethodException, but idc.
//                System.out.println("Event name " + em.getName() + ", Instance name : " + name
//                        + ", method Name : scheduledTimeout:\n" + ex);
                //added this cuz the function is called timeOut in some scripts
                try {
                    em.getIv().invokeFunction("timeOut", this);
                } catch (NoSuchMethodException | ScriptException ex1) {
                    System.out.println("Event name " + em.getName() + ", Instance name : " + name
                            + ", method Name : scheduledTimeOut and timeOut:\n" + ex1);
                }
            }
        }, delay);

        return true;
    }

    //record the start time and time limit.
    public void startEventTimer(long time) {
        timeStarted = System.currentTimeMillis();
        eventTime = time;
    }

    //NOTE: use this instead of schedule + startEventTimer(long time) combo for PQ/ anything relevant.
    //schedule the invocation of the timeOut/ scheduledTimeOut function used to enforce the event timer.
    //and calls startEventTimer(long time) to record the start time and time limit
    public void scheduleEventTimer(long delay) {
        if (timeOut(delay)) {
            startEventTimer(delay);
        }
    }

    public boolean isTimerStarted() {
        return eventTime > 0 && timeStarted > 0;
    }

    public long getDuration() {
        return System.currentTimeMillis() - timeStarted;
    }

    public long getTimeLeft() {
        return eventTime - getDuration();
    }

    public long getTimeStarted() {
        return timeStarted;
    }

    public void stopEventTimer() {
        eventTime = 0;
        timeStarted = 0;
        if (sf != null) {
            sf.cancel(false);
        }
    }

    public void registerParty(MapleParty party, MapleMap map) {
        this.party = party;
        em.removeParty(party); //clear the cache of this party since eim has it now :D
        for (MaplePartyCharacter pc : party.getMembers()) {
            registerPlayer(map.getCharacterById(pc.getId()));
        }
    }

    public final void registerCarnivalParty(final MapleCharacter leader, final MapleMap map, final byte team) {
        //leader.clearCarnivalRequests();
        List<MapleCharacter> characters = new LinkedList<>();
        final MapleParty party = leader.getParty();

        if (party == null) {
            return;
        }
        for (MaplePartyCharacter pc : party.getMembers()) {
            final MapleCharacter c = map.getCharacterById(pc.getId());
            if (c != null) {
                characters.add(c);
                registerPlayer(c);
                if (c.getCP() > 0 || c.getObtainedCP() > 0) {
                    //c.resetCP();
                }
            }
        }
        final MonsterCarnivalParty carnivalParty = new MonsterCarnivalParty(leader, characters, team);
        try {
            em.getIv().invokeFunction("registerCarnivalParty", this, carnivalParty);
        } catch (ScriptException ex) {
            System.out.println("Event name " + em.getName() + ", Instance name : " + name
                    + ", method Name : registerCarnivalParty:\n" + ex);
        } catch (NoSuchMethodException ex) {
        }
    }

    public void registerExpedition(MapleExpedition exped) {
        expedition = exped;
        registerPlayer(exped.getLeader());
    }

    public MapleExpedition getExpedition() {
        return expedition;
    }

    public void endExpedition() {
        if (expedition != null) {
            expedition.dispose(true);
            this.getEm().getChannelServer().getExpeditions().remove(expedition);
        }
    }

    public void unregisterPlayer(MapleCharacter chr) {
        chars.remove(chr);
        chr.setEventInstance(null);

        if (chr.getPartyQuest() != null) { //shouldnt need this, but yahh, in case not all PQ might have a PQ class and other shiets
            //chr.getPartyQuest().removeParticipant(chr, getEm(), this);
        }
    }

    public MapleParty getParty() {
        return party;
    }

    public MapleCharacter getPartyLeaderChar() {
//        if (getParty() != null/* && getParty().getLeader() != null*/) { //the leader null checking is commented until needed.
//            return getParty().getLeader().getPlayer();
//        }
        return getParty() != null ? getParty().getLeader().getPlayer() : null;
    }

    public int getPlayerCount() {
        return chars.size();
    }

    public List<MapleCharacter> getPlayers() {
        return new ArrayList<>(chars);
    }

    public void registerMonster(MapleMonster mob) {
        if (!mob.getStats().isFriendly()) { //We cannot register moon bunny
            mobs.add(mob);
            mob.addMobDeadListener(this);
        }
    }

    public int getKillCount(MapleCharacter chr) {
        Integer kc = killCount.get(chr);
        return kc == null ? 0 : kc;
    }

    public final boolean disposeIfPlayerBelow(final byte size, final int towarp) {
        if (disposed) {
            return true;
        }
        MapleMap map = this.getMapFactory().getMap(towarp);
        try {
            if (map != null && chars != null && chars.size() <= size) {
                final List<MapleCharacter> chrs = new LinkedList<>(chars);
                for (MapleCharacter chr : chrs) {
                    if (chr == null) {
                        continue;
                    }
                    unregisterPlayer(chr);
                    if (towarp > 0) {
                        chr.changeMap(map, map.getPortal(0));
                    }
                }
                dispose();
//                return true;
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
//        return false;
        return disposed; //cuz this is better?
    }

    public void disposeCarnivalPQ(int exitMapID) {
        for (MapleCharacter player : this.getPlayers()) {
            unregisterPlayer(player);
            if (player.getCarnivalParty() != null) {
                player.getCarnivalParty().removeMember(player);
            }
            /*
            if (!player.getMap().isMCPQVictoryOrDefeatMap() && player.getMapId() != 980000000
                    && player.getMapId() != 980000010) { //Let those people get their exp too!
                player.changeMap(this.getMapInstance(exitMapID), this.getMapInstance(exitMapID).getPortal(0));
            }
            */
            // If you are, Spiegelmann will warp you himself.
        }
    }

    public void dispose() {
        if (disposed || getEm() == null) {
            // it was already disposed of.
            return;
        }
//        try {
        String name = this.getEm().getName();
        if (name.equals("MCPQ") || name.equals("MCPQ2")) {
//                em.getIv().invokeFunction("dispose", this); // 'cuz it caused so many problems
//            } else {
            disposeCarnivalPQ(name.equals("MCPQ") ? 980000010 : 980030010);
        }
//        } catch (ScriptException ex) {
//            FilePrinter.print(FilePrinter.INVOCABLETXT, "ScriptException: Attempting to dispose(), instance " + name + " at " + Calendar.getInstance().getTime().toString());
//            System.out.println("Event name " + em.getName() + ", Instance name : " + name + ", method Name : dispose():\n" + ex);
//        } catch (NoSuchMethodException ex) {
//            FilePrinter.print(FilePrinter.INVOCABLETXT, "NoSuchMethodException: Attempting to dispose(), instance " + name + " at " + Calendar.getInstance().getTime().toString());
//            System.out.println("Event name " + em.getName() + ", Instance name : " + name + ", method Name : dispose():\n" + ex);
//        }
        if (expedition != null) {
            em.getChannelServer().getExpeditions().remove(expedition);
        }
//        stopEventTimer();
        em.disposeInstance(name);
        clearAll();
        disposed = true; //so it's finally used! yay!
    }

    public void clearAll() {
        chars.clear();
        chars = null;
        mobs.clear();
        mobs = null;
        killCount.clear();
        killCount = null;
        mapFactory = null;
        expedition = null;
        em = null;
        name = null;
        props.clear();
        props = null;
        sf = null;
        party = null;
    }

    public MapleMapFactory getMapFactory() {
        return mapFactory;
    }

    public void schedule(final String methodName, long delay) {
        if (getEm() == null) {
            return; // already disposed...
        }
        ScheduledFuture sf = TimerManager.getInstance().schedule(() -> { //lol why declaring it in the class then?
            if (disposed || em == null) {
                return;
            }

            try {
//                LogHelper.INVOCABLE.get().info("Invoking " + methodName
//                        + " in Event Instance " + em.getName() + ":" + name);
//                FilePrinter.printError(FilePrinter.EXCEPTION, "Invoking " + methodName 
//                        + " in Event Instance " + em.getName() + ":" + name);
                em.getIv().invokeFunction(methodName, EventInstanceManager.this);
            } catch (ScriptException | NoSuchMethodException ex) {
                ex.printStackTrace();
            } catch (NullPointerException e) {
                // System.out.println("PQ already disposed.)")
            }
        }, delay);
    }

    public String getName() {
        return name;
    }

    public void saveWinner(MapleCharacter chr) {
        try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement(
                "INSERT INTO eventstats (event, instance, characterid, channel) VALUES (?, ?, ?, ?)")) {
            ps.setString(1, em.getName());
            ps.setString(2, getName());
            ps.setInt(3, chr.getId());
            ps.setInt(4, chr.getClient().getChannel());
            ps.executeUpdate();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public MapleMap getMapInstance(int mapId) {
        MapleMap map = mapFactory.getMap(mapId, this);

        if (!mapFactory.isMapLoaded(mapId)) {
            if (em.getProperty("shuffleReactors") != null
                    && em.getProperty("shuffleReactors").equals("true")) {
                map.shuffleReactors();
            }
        }
        return map;
    }

    public void setProperty(String key, String value) {
        props.setProperty(key, value);
    }

    public void setProperty(String key, int value) {
        setProperty(key, value + "");
    }

    public void setProperty(int key, int value) {
        setProperty(key + "", value + "");
    }

    public Object setProperty(String key, String value, boolean prev) { //maybe only return previous entry if prev == true?
        return props.setProperty(key, value);
    }

    public String getProperty(String key) {
        return props.getProperty(key);
    }

    public String getProperty(int key) {
        return getProperty(key + "");
    }

    public Properties getProperties() {
        return props;
    }

    public void openUI(int mapid, int type) {
        this.getMapFactory().getMap(mapid).broadcastMessage(MaplePacketCreator.openUI((byte) type));
    }

    public void closeUI(int map) {
        this.getMapFactory().getMap(map).broadcastMessage(MaplePacketCreator.disableUI(false));
    }

    public final void broadcastPlayerMsg(final int type, final String msg) {
        for (MapleCharacter chr : getPlayers()) {
            chr.dropMessage(type, msg);
        }
    }

    public void startCarnival(final MapleCharacter chr) {
        try {
            em.getIv().invokeFunction("startCarnival", this, chr);
        } catch (ScriptException ex) {
            FilePrinter.print(FilePrinter.INVOCABLE, "Attempting to invoke startCarnival(), instance " + name
                    + " at " + Calendar.getInstance().getTime().toString());
            System.out.println("Event name " + em.getName()
                    + ", Instance name : " + name + ", method Name : onMapLoad:\n" + ex);
        } catch (NoSuchMethodException ex) {
        }
    }

    public void summonPepeKing(MapleCharacter player) {
        player.getClient().getChannelServer().getMapFactory().getMap(player.getMapId()).clearAndReset(true);
        int rand = Randomizer.nextInt(10);
        int mob_ToSpawn; //= 100100; //lol it's not used anyway

        if (rand >= 6) { //60% << uhh no? 6-10 = 50%, or 40% if it's 6-9?
            mob_ToSpawn = 3300007;
        } else if (rand >= 3) { //30%? 3-5
            mob_ToSpawn = 3300006;
        } else { //30%? 0-2?
            mob_ToSpawn = 3300005;
        }
        player.getMap().spawnMonsterOnGroundBelow(
                MapleLifeFactory.getMonster(mob_ToSpawn), player.getPosition());
    }

    @Override
    public void mobKilled(MobDeadEvent event) {
    	
    	MapleMonster mob = event.getMonster();
    	if (event.getKiller() != null) {
    		MapleCharacter chr = event.getKiller();
    		Integer kc = killCount.get(chr);
    		int inc = /*((Double) em.getIv().invokeFunction("monsterValue", this, mob.getId())).intValue();*/ 1;
    		kc = kc == null ? inc : kc + inc;

            killCount.put(chr, kc);
            if (expedition != null) {
                expedition.monsterKilled(chr, mob);
            }
    	}
    	
        mobs.remove(mob);
        if (mobs.isEmpty()) {
            try {
                em.getIv().invokeFunction("allMonstersDead", this);
            } catch (ScriptException | NoSuchMethodException ex) {
                ex.printStackTrace();
            }
        }

    }
}
