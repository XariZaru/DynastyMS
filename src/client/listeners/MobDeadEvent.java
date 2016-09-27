package client.listeners;

import java.util.EventObject;

import server.life.MapleMonster;
import client.MapleCharacter;

public class MobDeadEvent extends EventObject {

    /**
     *
     */
    private static final long serialVersionUID = -5187422275722511386L;

    private MapleMonster monster;

    private MapleCharacter killer;

    public MobDeadEvent(Object arg, MapleMonster monster, MapleCharacter killer) {
        super(arg);
        this.monster = monster;
        this.killer = killer;
    }

    public MapleMonster getMonster() {
        return monster;
    }

    public MapleCharacter getKiller() {
        return killer;
    }

}
