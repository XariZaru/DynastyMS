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

var elevator_top;
var elevator_bottom;
var elevator_up;
var elevator_up_progress;
var elevator_down;
var elevator_down_progress;

var reactor_top;
var reactor_bottom;


function init() {
    elevator_top = em.getChannelServer().getMapFactory().getMap(222020200);
    elevator_bottom = em.getChannelServer().getMapFactory().getMap(222020100);
    reactor_top = elevator_top.getReactorByName("elevator");
    reactor_bottom = elevator_bottom.getReactorByName("elevator");
    
    elevator_up = em.getChannelServer().getMapFactory().getMap(222020110);
    elevator_up_progress = em.getChannelServer().getMapFactory().getMap(222020111);
    
    elevator_down = em.getChannelServer().getMapFactory().getMap(222020210);
    elevator_down_progress = em.getChannelServer().getMapFactory().getMap(222020211);
    
    var cal = Packages.java.util.Calendar.getInstance();
    cal.setTime(new Packages.java.util.Date());
    var unroundedMins = cal.get(Packages.java.util.Calendar.MINUTE);
    var mod = unroundedMins % 5;
    cal.add(Packages.java.util.Calendar.MINUTE, 5 - mod);
    cal.set(Packages.java.util.Calendar.SECOND, 0);
    cal.set(Packages.java.util.Calendar.MILLISECOND, 0);
    
    em.setProperty("topOpen", "true");
    em.setProperty("bottomOpen", "false");
    reactor_bottom.setState(1);
    
    em.scheduleAtTimestamp("goDown", cal.getTimeInMillis());
}

function scheduleNew() {
    em.setProperty("topOpen", "true");
    em.setProperty("bottomOpen", "false");
}

function goUp() {
    reactor_bottom.setState(1);
    em.setProperty("bottomOpen", "false");
    elevator_up.warpEveryone(elevator_up_progress.getId());
    em.schedule("arriveAtTop", 90000); // might be 60
}

function goDown() {
    reactor_top.setState(1);
    em.setProperty("topOpen", "false");
    elevator_down.warpEveryone(elevator_down_progress.getId());
    em.schedule("arriveAtBottom", 90000);
}

function arriveAtTop() {
	elevator_up_progress.warpEveryone(elevator_top.getId());
    
    reactor_top.setState(0);
    em.setProperty("topOpen", "true");
    em.schedule("goDown", 60000);
}

function arriveAtBottom() {
    elevator_down_progress.warpEveryone(elevator_bottom.getId());

	reactor_bottom.setState(0);
    em.setProperty("bottomOpen", "true");
    em.schedule("goUp", 60000);

}

function cancelSchedule() {
    
}  