function start() {
    cm.sendYesNo("Do you want to leave this ride? The ticket is non-refundable.");
}

function action(m,t,s) {
    if (m == 1) {
        cm.warp(103000000);
    }
    cm.dispose();
}