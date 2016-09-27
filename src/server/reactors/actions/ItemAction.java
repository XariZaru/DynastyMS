/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.reactors.actions;

import client.MapleClient;
import java.awt.Point;
import java.awt.Rectangle;
import java.util.Collections;
import provider.MapleData;
import provider.MapleDataTool;
import scripting.reactor.ReactorScriptManager;
import server.maps.MapleMap;
import server.maps.MapleMapItem;
import server.maps.MapleMapObjectType;
import server.reactors.MapleReactor;
import server.reactors.ReactorActionType;
import server.reactors.ReactorHitType;
import tools.MaplePacketCreator;

/**
 *
 * @author Tyler
 */
public class ItemAction extends MapleReactorEvent {

    private int stateTo, itemId, itemAmount;
    private Point lt, rb;

    public ItemAction(MapleData data) {
        super(ReactorActionType.ITEM);
        processData(data);
    }

    @Override
    public void processData(MapleData data) {
        stateTo = MapleDataTool.getIntConvert(data.getChildByPath("state"));
        itemId = MapleDataTool.getIntConvert(data.getChildByPath("0"));
        itemAmount = MapleDataTool.getIntConvert(data.getChildByPath("1"));

        lt = MapleDataTool.getPoint(data.getChildByPath("lt"));
        rb = MapleDataTool.getPoint(data.getChildByPath("rb"));
    }

    @Override
    public void run(MapleClient c, MapleReactor reactor) {
        MapleMap map = reactor.getMap();
        MapleMapItem item = (MapleMapItem) map.getMapObjectsInRect(getRect(reactor), Collections.singletonList(MapleMapObjectType.ITEM)).stream()
                .filter(object -> {
                    MapleMapItem x = (MapleMapItem) object;
                    return checkIfItemMatches(x);
                }).findFirst().get();

        item.itemLock.lock();
        try {
            item.setPickedUp(true);
            reactor.setState(stateTo);
            map.broadcastMessage(
                    MaplePacketCreator.removeItemFromMap(
                            item.getObjectId(),
                            0,
                            0),
                    item.getPosition());
            ReactorScriptManager.getInstance().act(c, reactor);
        } finally {
            item.itemLock.unlock();
            map.removeMapObject(item);
        }
        item.setPickedUp(true);

    }

    @Override
    public boolean check(MapleClient c, MapleReactor reactor, ReactorHitType type) {
        if (type == ReactorHitType.HIT) {
            return false;
        }

        return reactor.getMap().getMapObjectsInRect(getRect(reactor),
                Collections.singletonList(MapleMapObjectType.ITEM))
                .stream()
                .anyMatch(object -> {
                    MapleMapItem item = (MapleMapItem) object;
                    return checkIfItemMatches(item);
                });
    }

    private Rectangle getRect(MapleReactor reactor) {
        return new Rectangle(reactor.getPosition().x + lt.x,
                reactor.getPosition().y + lt.y, rb.x - lt.x, rb.y - lt.y);
    }

    private boolean checkIfItemMatches(MapleMapItem item) {
        if (item.getItemId() != itemId) {
            return false;
        }
        if (item.getItem().getQuantity() != itemAmount) {
            return false;
        }
        if (!item.isPlayerDrop()) {
            return false;
        }
        if (item.isPickedUp()) {
            return false;
        }

        return true;
    }
}
