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
 * An abstract class used to represent any action a reactor can take. Specific
 * actions are to extend off of this class and implement any functions needed.
 * @author Tyler (Twdtwd)
 */
public abstract class MapleReactorEvent {
	private final ReactorActionType type;
	
	public MapleReactorEvent(ReactorActionType type) {
		this.type = type;
	}
	
	/**
	 * Runs the event's functions. Could be used to destroy the reactor, change
	 * the state, etc. This is the last step for an event.
	 * @param client The {@link MapleClient} to run the event with.
	 * @param reactor The {@link MapleReactor} to run the event on.
	 */
	public abstract void run(MapleClient client, MapleReactor reactor);
	
	/**
	 * Processes any extra data needed for the event from the WZ files or XML
	 * files. This is used to grab information at load time. This data should be
	 * stored in the class, as the reference to {@link MapleData} can go stale
	 * over time.
	 * @param data The MapleData object used to collect the data from. 
	 */
	public abstract void processData(MapleData data);
	
	
	/**
	 * Checks to see if the action is able to run. Used mainly to only run an 
	 * event if certain criteria are met. Defaults to returning {@code true}
	 * @param client The {@link MapleClient} to run the test using.
	 * @param reactor The {@link MapleReactor} to run the test using.
	 * @param type The {@link ReactorHitType}. Used to show where the hit is coming from.
	 * @return {@code true} if the test passes.
	 */
	public boolean check(MapleClient client, MapleReactor reactor, ReactorHitType type) {
		return true;
	}
	
	/**
	 * Returns the type of event this class processes. All values are from
	 * {@link ReactorActionType}.
	 * @return The ReactorActionType this event handles.
	 */
	public ReactorActionType getType() {
		return type;
	}
}
