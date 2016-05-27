var status;
var sel;
var talk = 0;
var text = [["#bAltaire#k was established some time 400 BC, and was used to combat the #eexplorer#n"+
                " tribe. Here we are able to travel back into the memory of our ancestors and"+
            " feel what they felt, think what they thought. It is quite intricate.", "My husband"+
        " is quite the historian. He loves researching about the famous battles and skirmishes"+
    " that took place at #bAltaire#k.", "Other people may have been drafted and required to serve their"+
" sentences here. Others may come solely for the entertainment, as my husband is doing now.", "His father"+
" was a part of the armed forces during the invasion of the #eexplorer#n capital. Observing spears"+
", swords, and shields of that era are part of my husband's complete and absolute obsession. But he is"+
" still the loving man I knew before.", "Oh, I come from the outer ridges of the #enoble palace#n."+
" There are hundreds of people like me searching for a better life. My husband and I are one of the few"+
" thousands that have immigranted inward."],["Though, there are several stories about apparitions in the dark"+
", ghosts of the past that continue to haunt those who do not conform with tradition.", "Many of them are from"+
" the outer ring of the noblesse court. We have unwavering loyalty to the queen, but from time to time we do"+
" express our deepest wishes for a better life.", "He received his"+
" strange obsession when he was but a young boy of nine or ten.", "Though, his line of work does prohibit"+
" him from spending as much time as I would like with him.", "I loved the home we lived in previously"+
", but the #eexplorer#n nation cut it down and scavenged the the leftovers. We had to move inward to escape"+
" the destruction."]];

function start() {
    status = -1;
    if (cm.getQ()!= 6) {
        cm.sendNext("My husband is obsessed with learning more about battlefield tactics and famous historical battles"+
            ". I wish I could share his fervor, but my place remains at home with the kids.");
    } else {
        cm.sendOk("Oh my, is this the medicine I ordered a few weeks ago?"+
            "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 150 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 550 meso");
        cm.gainExp(150);
        cm.gainMeso(550);
        cm.completeQ();
        cm.talkGuide("Let's go see Perzen again.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (mode == -1) {
        cm.dispose();
        return;
    } else {
        status--;
    }
   if (status == 0) {
        cm.sendSimple(""+(talk == 0 ? "Actually, while you're here would you like to learn more about this area?" : "So, what else would you"+
            " like to know about our tiny town?")+""+
                "\r\n\r\n#b#L0#How did a camp like this become established?\r\n#L1#Why are you here?\r\n"+
                "#L2#Why are other people here?\r\n#L3#Why is your husband so involved with the battlefield?\r\n"+
                "#L4#Where do you come from?");
   } else if (status == 1) {
       sel = selection;
       cm.sendNext(text[0][selection]);
   } else if (status == 2) {
       cm.sendNext(text[1][sel]);
   } else if (status == 3) {
       cm.sendYesNo("Would you like to know something else?");
       talk = 1;
       status = -1;
        }
    }
