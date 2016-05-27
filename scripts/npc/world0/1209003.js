/* Property of Thane Krios and DynastyMS
 * Road to the Dungeon (Henesys)
 * Custom Quest NPC (KoC) - Level 70
 */

var status;

function start() {
    status = -1;
    if (cm.getQ() == 29 && cm.getJobId()>999 && cm.getJobId()<2000) {
        cm.sendNext("#e#r[Chain Quest 3/4]#n#k\r\n\r\n\t\tYou look like a friendly enough man, say, how goes the war? My family has been uprooted and we've spent"+
                " most of our times"+
            " traveling as immigrants from of the war.");
    } else {
        cm.sendOk("\t\tMy children come from far away, past the lands of #bPerion#k and #bEllinia#k. We're just looking for some"+
            " calm and peace. My wife was taken away from me in the dawn of these boys' lives. I can't bear to separate with them"+
        " so soon."), cm.dispose();
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
        cm.sendNext("The war goes along fine enough. The loyalists will not cease until every explorer bows to his knees and proclaims"+
            " undying loyalty to her Majesty.",2);
    } else if (status == 1) {
        cm.sendNext("\t\tI see, but ... there is something amidst us. There is something that creeps in the forests at night, something that prowls"+
            " in search of those feeble enough to be left behind. Dare I say, monsters? I swear by upon her Majesty's name that there are"+
        " monsters alive, breathing, #ekilling#n in these forests. You have to get us out of here. Every single day we wait we squander our"+
    " chances of survival. I can't let that happen to my children.");
    } else if (status == 2) {
        cm.sendNext("Calm down, I'm certain we can find some camp for your children to take refuge. I used to board in an area named #bAltaire"+
            "#k. Are you familiar with the place?",2);
    } else if (status == 3) {
        cm.sendNext("\t\t#bAltaire#k? Yes, I think I am. My wife was born there. She used to speak about the forests and rivers as if it were all"+
            " a dream. Do you ... could you perhaps tell us where it is? #bAltaire#k should be far from the fronts of war. I need this security"+
        " for my children.");
    } else if (status == 4) {
        cm.sendNext("Yes, it's very easy to find. You must take a ship to our capital, #bOrbis#k, and then take a smaller boat to a large industrial"+
            " city named #bLudibrium#k. From there you may ask directions from the citizens. Altaire is a very commonly spoken word and many know"+
        " of its existence.",2);
    } else {
        cm.sendOk("\t\tOh thank you, thank you so much for this. I am forever indebted to you, I'll take the next ship to #bOrbis#k as soon as"+
            " possible.\r\n\r\n#eInformation acquired!#n\r\n\t\t- Status of refugees.");
        cm.completeQ(), cm.dispose();
    }
}