/* Property of Thane Krios and DynastyMS
 * Road to the Dungeon (Henesys)
 * Custom Quest NPC (KoC) - Level 70
 */

var status;

function start() {
    status = -1;
    if (cm.getQ() == 28 && cm.getJobId()>999 && cm.getJobId()<2000) {
        cm.sendNext("#e#r[Chain Quest 2/4]#n#k\r\n\r\nYou there! Young man, do you know know what's been on these roads? There've been attacks on the immigrants for quite a long"+
            " time!\r\n\r\n#b#L0#Yes, I sure there have been ma'am.");
    } else {
        cm.sendOk("Oh, the monsters ... the children. What will we do?"), cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendNext("The monsters won't leave us alone, #eMONSTERS#n! It's as if they've grown larger and larger, more aggressive. My mother"+
            " used to tell me stories that her grandmother told her. Big, wild beasts. Savage-like, oh dear, son, you haven't seen the likes"+
        " of these things.\r\n\r\n#L0##bI sure I haven't ma'am, now -");
    } else if (status == 1) {
        cm.sendNext("You'll do something, right? The Knights of Cygnus are always willing to intervene in the troubles of us poor folk."+
            "\r\n\r\n#b#L0#Yes, you've been very -");
    } else if (status == 2) {
        cm.sendNext("Oh thank heavens! I was wondering when one of you would show up.\r\n\r\n#L0##bYes ... ");
    } else if (status == 3) {
        cm.sendOk("Then go do your magic! Go help us poor civilians from these growing menace.\r\n\r\n\r\n"+
                "#eInformation acquired!#n\r\n\t\t\- Immigration routes harmed.");
        cm.completeQ(), cm.dispose();
    }
}