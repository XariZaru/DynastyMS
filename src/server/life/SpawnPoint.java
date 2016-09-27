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
package server.life;

import java.awt.Point;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import client.listeners.MobDeadEvent;
import client.listeners.MobDeadListener;
import server.TimerManager;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import tools.Pair;

public class SpawnPoint {

    private int monster, mobTime, team, fh, f;
    private Point pos;
    private long nextPossibleSpawn;
    private int mobInterval = 5000;
    private AtomicInteger spawnedMonsters = new AtomicInteger(0);
    private boolean immobile;

    public SpawnPoint(final MapleMonster monster, Point pos, boolean immobile, int mobTime, int mobInterval, int team) {
        this.monster = monster.getId();
        this.pos = new Point(pos);
        this.mobTime = mobTime;
        this.team = team;
        this.fh = monster.getFh();
        this.f = monster.getF();
        this.immobile = immobile;
        this.mobInterval = mobInterval;
        this.nextPossibleSpawn = System.currentTimeMillis();
    }

    public boolean shouldSpawn() {
    	if (mobTime < 0 || ((mobTime != 0 || immobile) && spawnedMonsters.get() > 0) || spawnedMonsters.get() > 2) {//lol
            return false;
        }
       
        return nextPossibleSpawn <= System.currentTimeMillis();
    }

    public boolean shouldForceSpawn() {
    	if (mobTime < 0 || ((mobTime != 0 || immobile) && spawnedMonsters.get() > 0) || spawnedMonsters.get() > 2) {//lol
            return false;
        }
       
        return true;
    }
    
    public void setMonster(int mobid) {
    	this.monster = mobid;
    }
    
    public MapleMonster getMonster() {
        MapleMonster mob = new MapleMonster(MapleLifeFactory.getMonster(monster));
        mob.setPosition(new Point(pos));
        mob.setTeam(team);
        mob.setFh(fh);
        mob.setF(f);
        spawnedMonsters.incrementAndGet();
        mob.addMobDeadListener(new MobDeadListener() {
			@Override
			public void mobKilled(MobDeadEvent event) {
				nextPossibleSpawn = System.currentTimeMillis();
                if (mobTime > 0) {
                    nextPossibleSpawn += mobTime * 1000;
                } else {
                    nextPossibleSpawn += event.getMonster().getAnimationTime("die1");
                }
                spawnedMonsters.decrementAndGet();
			}
        });
        
        final List<Integer> toSpawn = mob.getRevives();
        
        if (toSpawn != null) 
	        mob.addMobDeadListener(new MobDeadListener() {
	
				@Override
				public void mobKilled(MobDeadEvent event) {
					MapleMonster mob = event.getMonster();
					if (toSpawn != null) {
			            final MapleMap reviveMap = event.getMonster().getMap();
			            if (toSpawn.contains(9300216) && reviveMap.getId() > 925000000 && reviveMap.getId() < 926000000) {
			                reviveMap.broadcastMessage(MaplePacketCreator.playSound("Dojang/clear"));
			                reviveMap.broadcastMessage(MaplePacketCreator.showEffect("dojang/end/clear"));
			            }
			            Pair<Integer, String> timeMob = reviveMap.getTimeMob();
			            if (timeMob != null) {
			                if (toSpawn.contains(timeMob.getLeft())) {
			                    reviveMap.broadcastMessage(MaplePacketCreator.serverNotice(6, timeMob.getRight()));
			                }
	
			                if (timeMob.getLeft() == 9300338 && (reviveMap.getId() >= 922240100 && reviveMap.getId() <= 922240119)) {
			                    if (!reviveMap.containsNPC(9001108)) {
			                        MapleNPC npc = MapleLifeFactory.getNPC(9001108);
			                        npc.setPosition(new Point(172, 9));
			                        npc.setCy(9);
			                        npc.setRx0(172 + 50);
			                        npc.setRx1(172 - 50);
			                        npc.setFh(27);
			                        reviveMap.addMapObject(npc);
			                        reviveMap.broadcastMessage(MaplePacketCreator.spawnNPC(npc));
			                    } else {
			                        reviveMap.toggleHiddenNPC(9001108);
			                    }
			                }
			            }
			            TimerManager.getInstance().schedule(new Runnable() {
			                @Override
			                public void run() {
			                    for (Integer mid : toSpawn) {
			                        final MapleMonster mob = MapleLifeFactory.getMonster(mid);
			                        mob.setPosition(getPosition());
			                        if (mob.dropsDisabled()) {
			                            mob.disableDrops();
			                        }
			                        mob.setMobDeadListeners(mob.getMobDeadListeners());
			                        mob.setPartyListeners(mob.getPartyListeners());
			                        reviveMap.spawnMonster(mob);
			                    }
			                }
			            }, mob.getAnimationTime("die1"));
			        }
				}
	        	
	        });
        if (mobTime == 0) {
            nextPossibleSpawn = System.currentTimeMillis() + mobInterval;
        }
        return mob;
    }

    public Point getPosition() {
        return pos;
    }

    public final int getF() {
        return f;
    }

    public final int getFh() {
        return fh;
    }
}
