/*Custom Quest NPC for DynastyMS
 * By Thane Krios
 * In Aquarium, storge and quest NPC
 */

var status;


function start() {
    status = -1;
    cm.sendSimple("Oh, do you need something?\r\n\r\n#b#L0#Storage"+(cm.getQ()>20 && cm.getQ() < 24 ? "\r\n#L1#DynastyMS Custom Quest" : "")+"");

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
           	cm.getPlayer().getStorage().sendStorage(cm.getClient(), 2060008);
                cm.dispose(); 
        } else {
            if (cm.getQ()==21) {
            cm.sendNext("You, you're coming with me. You're in direct violation of the #bShadow Proclamation#k, law 2 revision 0. By order"+
                " of the supreme commanders of her Majesty's military force, you are hereby to be placed under the jurisdiction of the court"+
                " marshalls and sentenced from 10 to 30 years of imprisonment.\r\n\r\nHow does the defendent plea?",2);
            } else if (cm.getQ()==22) {
                cm.talkGuide("He refuses to accompany us unless we prevent evidence. Perhaps if we talk to Dolphin we can find something"+
                    " to pin this culprit.");
            cm.dispose();
            } else if (cm.getQ()==23) {
                cm.sendNext("Gerrard, you are under arrest for treason and the attempt to trick an officer of the military regarding the"+
                        " actual status of your innocence. As for your length in punishment, that shall be decided by the judicial court of"+
                        " the loyalist armies in #bOrbis#k. You are to follow me and obey my every command. Any act of disobedience will lead"+
                        " to the ending of your life.",2);
            } else {
                cm.sendOk("What do you need?");
        }
        }
    } else if (status == 1) {
        if (cm.getQ()==21) {
        cm.sendNext("What the devil are you talking about, man? I'm no traitor, look, look at me. I'm a simple banker--a storage man, what"+
            " would you want with someone like me? You have no evidence, I am an innocent man until you prove me otherwise. So don't think about"+
        " taking me anywhere before you show me some solid evidence!");
        } else if (cm.getQ()==23) {
            cm.sendNext("As for the evidence, it is shown here through the black liquid, which is the primary ingredient in producing explosives."+
                " This material is accessable only through imperial mines and is sold only through markets of #bHenesys#k and #bPerion#k. Your"+
            " connection to the explorers is marked by the explorer seal on the side of the liquid's container. The explorer seal was discovered"+
        " for imperial products have no other seal aside from the Empress's seal. Any other marking aside from that is regarded as the marketing"+
    " of a product now illegal.",2);
        }
    } else if (status == 2) {
        if (cm.getQ()==21) {
        cm.sendOk("I'll find the evidence needed to lock you away forever. Don't you move or I will make sure you are sentenced to 2 months"+
            " for the disobedience toward military personnel.",1);
    cm.completeQ(), cm.talkGuide("Well have to find some sort of evidence. Let's ask Dolphin outside. Maybe he knows something."), cm.dispose();
        } else {
            cm.sendOk("Actually, I think I'll just chain you up here and report to #bAgent M#k first. The town will ensure you will remain here"+
                " due to the recent treaty I've just signed with them. Enjoy yourself, #bGerrard#k.",2), cm.talkGuide("We have to tell Agent M"+
            " Gerrard's name so he can be marked down in the lists of treason. Agent M should be somewhere in the Guild Headquarters in Orbis."), cm.completeQ(), cm.dispose();
            }
        }
    }
