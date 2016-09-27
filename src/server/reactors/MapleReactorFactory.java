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

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.reactors.actions.DefaultAction;
import server.reactors.actions.MapleReactorEvent;
import server.reactors.actions.TimeOutAction;
import tools.LogHelper;
import tools.StringUtil;

public class MapleReactorFactory {

    private static MapleDataProvider data = MapleDataProviderFactory.getDataProvider(
            new File(System.getProperty("wzpath") + "/Reactor.wz"));
    private static Map<Integer, MapleReactor> reactorTemplates = new HashMap<>();

    public static MapleReactor getReactor(int rid) {
        MapleReactor reactor = reactorTemplates.get(rid);
        if (reactor == null) {
            int infoId = rid;
            MapleData reactorData = data.getData(StringUtil.getLeftPaddedStr(Integer.toString(infoId) + ".img", '0', 11));
            MapleData link = reactorData.getChildByPath("info/link");
            if (link != null) {
                infoId = MapleDataTool.getIntConvert("info/link", reactorData);
                reactor = reactorTemplates.get(rid);
//                reactor = reactorTemplates.get(infoId); //ori
            }

            if (reactor == null) {
//                reactor = new MapleReactor(infoId); //ori
                reactor = new MapleReactor(rid);
                reactorData = data.getData(StringUtil.getLeftPaddedStr(Integer.toString(infoId) + ".img", '0', 11));

                for (MapleData stateData : reactorData.getChildren()) {
                    if (stateData.getName().equals("action") || stateData.getName().equals("info")) {
                        continue;
                    }

                    ReactorState state = new ReactorState();
                    try {
                        int stateId = Integer.parseInt(stateData.getName());
                        reactor.addState(stateId, state);
                    } catch (NumberFormatException ex) {
                        //LogHelper.GENERAL_EXCEPTION.get().error("Reactor " + rid, ex);
                    }

                    MapleData events = stateData.getChildByPath("event");

                    if (events == null) {
                        state.addEvent(new DefaultAction(null));
                        continue;
                    }

                    for (MapleData eventData : events.getChildren()) {
                        if (eventData.getName().equalsIgnoreCase("timeOut")) {
                            continue;
                        }

                        int typeAsInt = MapleDataTool.getInt("type", eventData);
                        ReactorActionType type = ReactorActionType.valueOf(typeAsInt);
                        try {
                            MapleReactorEvent event = (MapleReactorEvent) type.getClassType().
                                    getConstructor(MapleData.class).newInstance(eventData);
                            state.addEvent(event);

                            if (type == ReactorActionType.TIME_OUT) {
                                TimeOutAction timeOutEvent = (TimeOutAction) event;
                                timeOutEvent.setTimeout(MapleDataTool.getInt(events.getChildByPath("timeOut"), 0));
                            }
                        } catch (NoSuchMethodException | InstantiationException |
                                IllegalAccessException | InvocationTargetException ex) {
                            //LogHelper.GENERAL_EXCEPTION.get().error("Reactor " + rid, ex);
                        }
                    }
                }

//                reactorTemplates.put(infoId, reactor); //ori, prolly dont need these anymore since only rid is used to create reactor.
//                if (rid != infoId) {
//                    reactorTemplates.put(rid, reactor);
//                }
            }
//            else { // stats exist at infoId but not rid; add to map
//                reactorTemplates.put(rid, reactor);
//            }
            reactorTemplates.put(rid, reactor);
        }
        return reactor;
    }

    public static void clearAllreactors() {
        reactorTemplates.clear();
    }

    public static void clearReactor(int reactorId) {
        reactorTemplates.remove(reactorId);
    }
}
