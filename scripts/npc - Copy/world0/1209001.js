/* Property of Thane Krios
 * Henesys Hunting Ground I
 * Custom Quest NPC (KoC) - Level 70
 */

var status;

function start() {
    status = -1;
    if (cm.getQ() == 27 && cm.getJobId()>999 && cm.getJobId()<2000) {
        cm.sendNext("#e#r[Chain Quest 1/4]#n#k\r\n\r\nYou look like a recent refugee. Tell me, have you seen anything peculiar on the roads recently?",2);
    } else {
        cm.sendOk("You won't believe the things I've seen!"), cm.dispose();
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
        cm.sendNext("Actually, yes. Last week I was traveling with a caravan on the way to these grounds when a large group of monsters came"+
            " from out of nowhere and invaded our pack. They took away supplies and murdered many young men. You must do something about this"+
        " madness!");
    } else if (status == 1) {
        cm.sendNext("I see, okay. Why don't you head a few miles to the east and you'll find yourself at #bHenesys#k. There, I'm sure you'll be"+
                "offered provisions for your troubles.",2);
    } else if (status == 2) {
        cm.sendOk("Oh, bless you son. Bless you very much!\r\n\r\n"+
                "\r\n\r\n#eInformation acquired!#n\r\n\t\t- Monster aggression toward supply trains.");
        cm.completeQ(), cm.dispose();
    }
}