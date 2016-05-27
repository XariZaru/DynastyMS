/*Property of Thane Krios 
 * DynastyMS Custom Quest NPC
 * The Town of Ariant
 * Muhamad
 */

var status;

function start() {
    status = -1;
    if (cm.getQ()==1) {
    cm.sendNext("Hey, rascal, get away from that stall! Your filthy hands will plague the meet and bring rats! Scram, get out of here"+
        " you worthless begger, or I'll have the militia upon you!");
    } else {
        cm.sendOk("What do you need? I am a trader of all types of spices.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return false;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendNext("But please, sir, couldn't you spare a few bites for someone like me? I barely have enough to survive. Please, just a"+
            " little ...",2);
    } else if (status == 1) {
        cm.sendNext("Of course not you scoundrel. You know very well what happens if I feed a caste-less such as yourself. You'll be"+
            " back tomorrow, and the day after that, and you'll bring more people with you. Leave, or I'll have your head!");
    } else if (status == 2) {
        cm.sendSimple("\r\n#b#L0#Steal from Muhamad's stall\r\n#L1#End conversation");
    } else if (status == 3) {
        if (selection == 0) {
            cm.sendOk("Steal success! You have gained #i3994090# as a result of your skill."+cm.getPlayer().gainSteal(1)+"");
            cm.gainItem(3994090,1);
            cm.completeQ(), cm.talkGuide("Let's go find some another person to steal from. I'm sure we can find someone."), cm.dispose();
        } else {
            cm.dispose();
        }
    }
}