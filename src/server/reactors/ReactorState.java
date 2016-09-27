/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.reactors;

import client.MapleClient;
import java.util.ArrayList;
import java.util.List;
import server.reactors.actions.MapleReactorEvent;

/**
 * Class to hold many ReactorEvents and check/run them all.
 *
 * @author Tyler
 */
public class ReactorState {

    private List<MapleReactorEvent> events = new ArrayList<>();

    public void addEvent(MapleReactorEvent event) {
        events.add(event);
    }

    public List<MapleReactorEvent> getEvents() {
        return events;
    }

    /**
     * Run the check function on all current {@link MapleReactorEvent}(s).
     * Return true if any of them pass their check. This allows reactors with
     * multiple events to succeed even if one of the checks fails for a specific
     * event.
     *
     * @param client The {@link MapleClient} object to check the event as.
     * @param reactor The {@link MapleReactor} object to check the event as.
     * @param type {@link ReactorHitType} used to show where the hit is coming
     * from.
     * @return {@code true} if any of the checks passed.
     */
    public boolean checkEvents(MapleClient client, MapleReactor reactor, ReactorHitType type) {
        return events.stream().anyMatch(event -> event.check(client, reactor, type));
    }

    /**
     * Runs all {@link MapleReactorEvent}(s) in the event list if they pass
     * their test.
     *
     * @param client The {@link MapleClient} object to run the event as.
     * @param reactor The {@code MapleReactor} object to run the event as.
     * @param type {@link ReactorHitType} used to show where the hit is coming
     * from.
     */
    public void runEvents(MapleClient client, MapleReactor reactor, ReactorHitType type) {
        events.stream()
                .filter(event -> event.check(client, reactor, type))
                .forEach(event -> event.run(client, reactor));
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + events.hashCode();
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }

        final ReactorState other = (ReactorState) obj;

        return events.equals(other.getEvents());
    }
}
