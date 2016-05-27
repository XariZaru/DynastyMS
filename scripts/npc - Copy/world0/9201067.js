/*
 * Name: Jonathan Nguyen
 * Version: 1.0
 * Description: Lotto NPC for DynastyMS. Win random and exotic prizes.
 */

var status;
var gach = 5220000;

function start() {
    status = -1;
    cm.sendNext("#b(A line of text appears from the Gachapon electronic reader)#k\r\n\r\n- \"In order to play Gachapon lottery, you"+
        " must have 3 #i"+gach+"#.\"");
}

function action(m,t,s) {
    if (m != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        if (!cm.haveItem(gach,3)) {
            cm.sendOk("#b(A line of text appears from the Gachapon electronic reader)#k\r\n\r\n- \"You are lacking the"+
                    " required number of #i"+gach+"# to play.\"");
            cm.dispose();
        } else {
            cm.sendOk("notcoded");
            cm.dispose();
        }
    }
}