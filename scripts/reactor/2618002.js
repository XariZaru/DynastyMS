/**
 *	@Description: Boxes (Romeo & Juliet PQ)
 */
function act() {
	rm.getPlayer().getMap(rm.getPlayer().getMapId() + 1).getReactorByName(rm.getPlayer().getMapId() == 926100200 ? "rnj31_out" : "jnr31_out").forceHitReactor(1);
}