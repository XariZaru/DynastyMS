/*Property of Thane Krios 
 * DynastyMS Custom Quest NPC
 * The Town of Ariant
 * Ardin
 */

var status;

function start() {
    status = -1;
    if (cm.getQ()==2) {
    cm.sendNext("Get out of here! I don't have time to deal with infidel like you. Move, or I'll do the same as old man Muhamad did"+
        " last week; I'll call the militia and order a beheading!");
    } else {
        cm.sendOk("Weapons are my last name, and armor is my first name. Do you want to see my wonderful wares?");
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
        cm.sendNext("Look, get out or I will call them. Don't force me -- I'm not joking around. You better leave right now, or the"+
            " sultan's militia will hear about this. GET OUT!!!");
    } else if (status == 1) {
        cm.sendNext("I'll give you a countdown. You better leave! 1 ....");
    } else if (status == 2) {
        cm.sendNext("You better go! 2 ....");
    } else if (status == 3) {
        cm.sendSimple("#b\r\n#L0#Steal from Ardin's stall\r\n#L1#End conversation");
    } else if (status == 4) {
        if (selection == 0) {
            cm.sendOk("You've stolen something from Ardin's stall!"+cm.getPlayer().gainSteal(1)+"");
            cm.completeQ(), cm.gainItem(4031569,1), cm.talkGuide("We made our run for today. Let's go see how Sejan is doing."),cm.dispose();
        } else {
            cm.dispose();
            }
         }
    }