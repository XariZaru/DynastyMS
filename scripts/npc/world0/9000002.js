var status, txt;

function start() {
    status = -1;
    cm.sendSimple("What would you like to do?\r\n\r\n#b#L0#Check Goal\r\n#L1#Set Goal");
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        if (selection == 0) {
            cm.sendOk("Your current goal is ...\r\n\r\n#b\""+cm.getPlayer().getGoal()+"\"");
            cm.dispose();
        } else {
            cm.sendGetText("Input what you would like as your goal. It can be a message, anything.");
        }
    } else if (status == 1) {
            txt = cm.getText();
            cm.sendYesNo("You are sure you want this message?\r\n\r\n#b\""+txt+"\"#k");
    } else if (status == 2) {
        cm.getPlayer().setGoal(txt);
        cm.sendOk("Your goal has been set to \"#b"+txt+"#k\"");
        cm.dispose();
        }
    }
