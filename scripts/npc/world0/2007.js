var status;

var jobId;

function start() {
    jobId = cm.getJobId();
    jobId /= 1000;
    jobId *= 1000;
    status = -1;
    if (cm.getJobId()==2000 && !cm.getPlayer().isGM()) {
        cm.sendOk("Aran has been disabled until the Explorer and Cygnus Knights storylines are finished. Please play on those classes until further notice.");
    } else if (cm.getMapId()!=100000000) {
        cm.sendOk("GMS-Style Job advances are disabled. Please talk to the guide floating next to you and select \"storyline quests\" to find additional\n\
 information on #bDynastyMS's#k storyline and the one you are a part of.");
        cm.dispose();
    } else {
        cm.sendOk("The Dynasty is full of wonderful experiences and a plethora of information. Experience its life!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode == 1) {
        if (jobId==2000 && cm.getPlayer().getName()!="AranIvar") {
            cm.dc();
        } else {
            status++;
        }
    } else {
        if (jobId==2000 && cm.getPlayer().getName()!="AranIvar") {
            cm.dc();
        } else {
            cm.dispose();
            return;
        }
    }
 }