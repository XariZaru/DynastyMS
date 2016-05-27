var status;
var again;
var sel;

function start() {
	status = -1;
    cm.sendNext("Hello, you must be #b#h ##k, I'm the #bNews Stand#k npc.");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple(""+(again != 1 ? "I keep log of all the patch and revisions made every week by the #bDynasty#k team. Which of the patch notes would you like to"+
        " review?" : "What other logs or revisions would you like to review?")+"\r\n\r\n#b#L0#Pre-Alpha\r\n#L1#Alpha\r\n#L2#Beta");
    } else if (status == 1) {
    	sel = selection == 0 ? "prealpha" : selection == 1 ? "alpha" : "beta";
    	cm.sendSimple(cm.getPlayer().getRevisionsLog(selection == 0 ? "prealpha" : selection == 1 ? "alpha" : "beta"));
    } else if (status == 2) {
    	cm.sendNext(cm.getPlayer().getRevision((selection * .1) + 1, sel));
    } else if (status == 3) {
        status = -1, again = 1;
        cm.sendYesNo("Would you like to review more logs and revisions?");
    }
}