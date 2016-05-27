/* Property of Thane Krios and DynastyMS
 * Road to the Dungeon (Henesys)
 * Custom Quest NPC (KoC) - Level 70
 */

var status;

function start() {
    status = -1;
    if (cm.getQ() == 30 && cm.getJobId()>999 && cm.getJobId()<2000) {
        cm.sendNext("#e#r[Chain Quest 4/4]#n#k\r\n\r\nHello, you must be from her Majesty's army, aren't you? It's been awhile since I've seen quite a "+(cm.getPlayer().getGender()==0 ?
     "handsome man" : "beautiful woman")+" such as yourself. Most of the people in my village were slaughtered during the invasion of #bKerning City#k"+
         " a few years back. I've been struggling on my own ever since. I've thought about joining the army when I was little, but now I feel I must"+
     " contribute something bigger to the world.");
    } else {
        cm.sendOk("I've seen too much death and destruction for my life to ever return to normal."), cm.dispose();
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
        cm.sendNext("After seeing so much death and destruction I can't stop and think of what I want, for that would be much too selfish, but"+
            " of what others want. When I look back on all the things I ever wanted, and all the things I did, I can't help but feel that"+
        " my time as a little girl was wasted.");
    } else if (status == 1) {
        cm.sendNext("You can't blame yourself for such trivial matters. Everyone carries a burden that they can't share with others."+
            " Alongside that, you were a little girl. Who could you blame for wanting things, it's what all children would do. I was wondering"+
        ", however, have you spotted any monsters recently? There've been recent outbreaks of attacks and molestation. If possible, I'd like"+
    " to learn more about these series of unfortunate events.",2);
    } else if (status == 2) {
        cm.sendNext("#eMonsters#n, you say? I encountered a pack of them a little ways back, nearby #bEllinia#k. Oh, it was god awful over there."+
            " The monsters roam untamed, unfettered by men and their weapons. The Explorers do little to defend their traveling citizens. They"+
        " even suffer from attacks on their supply caravans once in awhile.");
    } else if (status == 3) {
        cm.sendNext("Really? Now that's something I've never heard of. It seems our very own traveling refugees have access to knowledge the"+
            " Knights of Cygnus don't possess. How large, in comparison to normal packs of monsters, would you say the ones attacking the supply"+
        " caravans were? Twice as big, three times as big?",2);
    } else if (status == 4) {
        cm.sendNext("Neither. The monsters attacking the supply caravans of the Explorers were nearly #eten fold#n the size of normal packs.");
    } else if (status == 5) {
        cm.sendNext("Thank you for your help. I really do hope that you can get past your guilt. It isn't worth your energy nor"+
                " body. By the way, what's your name?",2);
    } else if (status == 6) {
        cm.sendOk("My name's #bAmy#k, short for #bAmelia#k. Amelia Pond.\r\n\r\n#eInformation acquired!#n\r\n\t\t- Number of monsters.");
        cm.completeQ(), cm.dispose();
    }
}