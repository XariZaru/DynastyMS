function start() {
    cm.sendYesNo("Do you want to board the boat to "+(cm.getMapId()==250000100 ? "Orbis" : "Mu Lung")+"?");
}

function action(m,t,s) {
    if (m == 1) {
        (cm.getMapId()!=250000100 ? cm.boardOrbisToMulungBoat() : cm.boardMulungToOrbisBoat());
    }
    cm.dispose();
}