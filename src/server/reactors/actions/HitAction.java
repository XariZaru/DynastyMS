/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.reactors.actions;

import client.MapleClient;
import provider.MapleData;
import provider.MapleDataTool;
import scripting.reactor.ReactorScriptManager;
import server.reactors.MapleReactor;
import server.reactors.ReactorActionType;
import server.reactors.ReactorHitType;

/**
 *
 * @author Tyler
 */
public class HitAction extends MapleReactorEvent {

    public int stateTo;

    public HitAction(MapleData data) {
        super(ReactorActionType.HIT);
        processData(data);
    }

    @Override
    public void processData(MapleData data) {
        stateTo = MapleDataTool.getInt(data.getChildByPath("state"));
    }

    @Override
    public void run(MapleClient c, MapleReactor reactor) {
        reactor.setState(stateTo);
        if (reactor.getStates().size() == stateTo + 1) {
            ReactorScriptManager.getInstance().act(c, reactor);
            reactor.getMap().destroyReactor(reactor);
        }
    }

    @Override
    public boolean check(MapleClient c, MapleReactor reactor, ReactorHitType type) {
        return type != ReactorHitType.ITEM_TRIGGER;
    }
}
