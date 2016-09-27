/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.reactors;

import java.util.HashMap;
import java.util.Map;
import server.reactors.actions.*;

/**
 *
 * @author Tyler
 */
public enum ReactorActionType {
    HIT(0, HitAction.class),
    RIGHTHIT(2, HitAction.class),
    ITEM(100, ItemAction.class),
    TIME_OUT(101, TimeOutAction.class),
    BREAK(999, DefaultAction.class);

    final int type;
    final Class classType;
    private final static Map<Integer, ReactorActionType> map = new HashMap<>();

    private ReactorActionType(int type, Class classType) {
        this.type = type;
        this.classType = classType;
    }

    static {
        for (ReactorActionType type : ReactorActionType.values()) {
            map.put(type.type, type);
        }
    }

    public static ReactorActionType valueOf(int type) {
        return map.get(type);
    }

    public Class getClassType() {
        return classType;
    }
}
