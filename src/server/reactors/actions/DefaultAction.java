/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.reactors.actions;

import client.MapleClient;
import provider.MapleData;
import scripting.reactor.ReactorScriptManager;
import server.reactors.MapleReactor;
import server.reactors.ReactorActionType;
import server.reactors.ReactorHitType;

/**
 *
 * @author Tyler
 */
public class DefaultAction extends MapleReactorEvent {

    public DefaultAction(MapleData data) {
        super(ReactorActionType.BREAK);
        processData(data);
    }

    @Override
    public void processData(MapleData data) {

    }

    @Override
    public void run(MapleClient c, MapleReactor reactor) {
        if (reactor.getStates().size() - 1 > reactor.getCurrState()) {
            reactor.setState(reactor.getCurrState() + 1);
        } else {
            ReactorScriptManager.getInstance().act(c, reactor);
            reactor.getMap().destroyReactor(reactor);
        }

    }

    @Override
    public boolean check(MapleClient c, MapleReactor reactor, ReactorHitType type) {
        return type != ReactorHitType.ITEM_TRIGGER;
    }
}
