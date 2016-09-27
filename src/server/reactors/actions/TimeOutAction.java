/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.reactors.actions;

import client.MapleClient;
import provider.MapleData;
import server.reactors.MapleReactor;
import server.reactors.ReactorActionType;
import server.reactors.ReactorHitType;

/**
 *
 * @author Tyler
 */
public class TimeOutAction extends MapleReactorEvent {
	private int stateTo, timeout;
	
	public TimeOutAction(MapleData data) {
		super(ReactorActionType.TIME_OUT);
		processData(data);
	}
	
	@Override
	public void processData(MapleData data) {
		
	}
	
	@Override
	public void run(MapleClient c, MapleReactor reactor) {
		
	}
	
	@Override
	public boolean check(MapleClient c, MapleReactor reactor, ReactorHitType type) {
		return true;
	}
	
	public void setTimeout(int timeout) {
		this.timeout = timeout;
	}
}
