/*Custom Quest NPC 
 * By Thane Krios
 * Aquarium Zoo
 * DynastyMS
 */

var status;

function start() {
    status = -1;
    if (cm.getQ()==20) {
    cm.sendNext("Tell me what you know about the traitor. Speak quickly before I have to"+
        " beat it out of you.",2);
    } else {
        cm.sendOk("Would you like to see the beauty of our aquarium?");
        cm.dispose();
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
        cm.sendNext("Okay! Okay, please don't hurt me. Look, if I tell you will you promise"+
            " to leave this town alone?");
    } else if (status == 1) {
        cm.sendNext("You have my word, now tell me who the perpetrator is, for he has violated the laws put forth by the empire.",2);
    } else if (status == 2) {
        cm.sendOk("It's a man, I don't know his name, but he commands storage over travelers. He #estores#n items and money, please, don't hurt"+
            " our villagers. We wish to live in peace.");
    cm.talkGuide("A man who stores items and mesos, huh? Doesn't he sound familiar ...");
    cm.completeQ(), cm.dispose();
    }
}