/* Thane Krios: DynastyMS
 * Ariant Palace, Custom Quest NPC
 * Tigun
 */

var status;

function start() {
    status = -1;
    if (cm.getJobId()==2000) {
        if (cm.getQ()==6) {
            cm.sendNext("Hey, peasant, what are you doing here? You understand palace grounds are off limits, right?");
        } else if (cm.getQ()==9) {
            cm.sendNext("Hey, you! Where do you think you're going? You're not going anywhere you little scumbag!");
        } else if (cm.getQ()==10) {
            if (cm.countMonster() > 0) {
                cm.talkGuide("We need to kill all the guards!");
            } else {
                cm.warp(260000300);
                cm.talkGuide("That was a close one ... hopefully Sejan will be satisfied by what we took from the throne room.");
                cm.completeQ();
                cm.dispose();
            }
        } else {
            cm.sendOk("What do you want. Don't you have something to do?");
            cm.dispose();
        }
    } else {
        cm.sendOk("Hey! Back away from that entrance! Only royals allowed.");
        cm.dispose();
    }
}

function sQuest(exp, meso) {
    text = "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# "+exp+" exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# "+meso+" meso";
    cm.gainMeso(meso);
    cm.gainExp(exp);
    cm.completeQ();
    return text;
}

function action(mode,type,selection) {
    if (mode != 1) {
        cm.dispose();
        return false;
    } else {
        status++;
    }
    if (status == 0) {
         if (cm.getQ()==9) {
             for (var i = 0; i < 5; i++) {
                cm.createMob(9300018,-128,153,10,20,2);
             }
            cm.talkGuide("We have to get rid of these guards, otherwise they'll follow us back to Sejan!");
            cm.completeQ();
            cm.dispose();
         } else {
        cm.sendNext("Look, I understand how you want to go in, worship the King's feet, kiss the Queen's fingertips, but that's not going"+
            " to happen. We've had a lot of difficulties already and would appreciate it if you just left us alone.");
         }
    } else if (status == 1) {
        cm.sendNext("Bud, I told you to bug off. If you don't I'll have your head on a pike, and I mean it!");
    } else if (status == 2) {
        cm.sendSimple("#b\r\n#L0#Persuade\r\n#L1#End conversation");
    } else if (status == 3) {
        if (selection == 1) {
            cm.dispose();
        } else {
            cm.sendNext("Look, just let me through; I know what's been ailing the King and I have the medication needed to solve his issue"+
                ". The Queen requested me; I am a medicine man, and the Queen thought it would be better for me to show up in a beggar's attire"+
            " than my standard uniform. Does that suit you?",2);
        }
    } else if (status == 4) {
        cm.sendOk("I ... I suppose so. You can enter through the gates, then. Just don't do anything stupid. We have guards posted everywhere.#e"+
            ""+cm.getPlayer().gainPers(1)+"#n"+sQuest(100,5000)+"");
    cm.completeQ(), cm.talkGuide("Let's go inside now that it is open and steal something useful."), cm.dispose();
        }
    }