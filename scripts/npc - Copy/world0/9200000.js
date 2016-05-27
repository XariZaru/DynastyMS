var status, choice, report;

function start() {
    status = -1;
    cm.sendSimple("What would you like to do today?\r\n\r\n#b#L0#Check all submitted bugs\r\n#L1#Log a report");
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
            cm.sendOk(cm.getReports());
            cm.dispose();
        } else {
            cm.sendGetText("Please list the bug you have found clearly. Make it brief and precise. If your report is invalid, or deemed"+
                    " unproductive, your account may be held for suspension.\r\n#eEx: Orbis boat not traveling.#n");
        }
    } else if (status == 1) {
        report = cm.getText();
        cm.sendYesNo("Is this what you'd like to submit to the log as a bug?\r\n\r\n#e"+cm.getText()+"");
    } else if (status == 2) {
        if (report.length() < 3) {
            cm.sendOk("You cannot submit a report that has less than 3 characters. Please try again.");
            cm.dispose();
        } else {
        cm.sendOk(cm.logReport(report));
       cm.dispose();
        }
    }
}

//
////var status = 0;
//
//function start() {
//    cm.sendNext("I'm giving out free smeges to players everyday..");
//}
//
//function action(mode, type, selection) {
//    if (mode == 0) {
//        cm.sendOk("Fine, I'll give to other players if you don't want it..")
//        cm.dispose();
//    }else {
//        if(mode > 0)
//            status++;
//        else if(mode < 0)
//            cm.dispose();
//        if (status == 1) {
//            if (cm.getGiftLog('Sexy') >= 1) {
//                cm.sendOk("I'm sorry, You have already received your gift in this account today!! Please come back 24 hours later!!");
//                cm.dispose();
//            }else
//                cm.sendYesNo("Grats, you haven't received your #r#e10#n#k free #v5072000# today, do you want to get your free gift now?");
//        }else if (status == 2) {
//            cm.gainItem(5072000, 10);
//            cm.setBossLog('Sexy');
//            cm.sendOk("Congratulation!! You've reveived your #r#e10#n#k free #v5072000#!!");
//            cm.dispose();
//        } else
//            cm.sendOk("Fine, I'll give to other players if you don't want it..")
//    }
//}