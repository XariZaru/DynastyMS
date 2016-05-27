/*
 * Name: Jonathan Nguyen
 * Version: 1.0
 * Voting points reward npc
 */
var status, sel;
var use = [[2040826,2049100,2049000,2340000],[20,50,60,100]];
var fail = "You do not have enough vote points to complete this transaction.";

function start() {
    status = -1;
    cm.sendNext("Hey, #b#h ##k, I exchange your voting points for some radical prizes."+
        " Each time you vote you receive #b2#k points, which can occur every 6 hours from each of our"+
    " voting links.");
}

function action(m,t,s) {
    if (m != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendSimple("Which of the category would you like to view for purchase? #e(you currently have "+/*cm.getPlayer().getVp()*/+" voting points)#n\r\n"+
            "\r\n#b#L0#NX\r\n#L1#USE");
    } else if (status == 1) {
        sel = s;
        text = "This is what I have right now in stock ...\r\n";
        if (s == 0) {
            cm.sendGetNumber("How many voting points will you spend on NX? Each"+
                " point is worth #b2000 pre-paid NX#k. You have #e"+cm.getPlayer().getVp()+"#n"+
                " vote points.",1,1,100);
        } else if (s == 1) {
            for (var i = 0; i < use[0].length; i++) {
                text += "\r\n\r\n#L"+i+"##i"+use[0][i]+"# - #b"+use[1][i]+" vote points";
            }
            cm.sendSimple(text);
        }
    } else if (status == 2) {
        if (sel == 0) {
            if (cm.getPlayer().getVp() < s) {
                cm.sendOk(fail), cm.dispose();
            } else {
                cm.sendOk("You have gained #b"+2000 * s+"#k prepaid NX in exchange for #b"+s+"#k voting points");
                cm.getPlayer().getCashShop().gainCash(4, 2000 * s);
                cm.getPlayer().gainVp(-s), cm.dispose();
            }
        } else if (sel == 1) {
            if (cm.getPlayer().getVp() < use[1][s]) {
                cm.sendOk(fail);
            } else {
                cm.sendOk("You have gained 1 #i"+use[0][s]+"# for #b"+use[1][s]+"#k voting points");
                cm.gainItem(use[0][s], 1), cm.getPlayer().gainVp(-use[1][s]), cm.dispose();
            }
        }
    }
}

//function start() {
//    cm.sendOk("Disabled until further notice.");
//    cm.dispose();
//}