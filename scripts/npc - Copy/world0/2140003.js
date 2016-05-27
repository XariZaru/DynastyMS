var status;

function start() {
    status = -1;
    cm.sendOk("");
    cm.dispose();
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        
    }
}