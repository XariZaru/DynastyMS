var status;

function start() {
    status = -1;
    if (cm.getJobId() >= 1000 && cm.getJobId() < 2000) {
        if (cm.getQ() == 24) {
            cm.sendNext("Hello, #bAgent M#k? I'm running a task for #bAgent E#k in regards to a traitor in Aquarium. I'd like to tell you his name"+
                ", as mandated by law.",2);
        } else {
            cm.sendOk("Eh, what do you want? I'm a very busy man.");
            cm.dispose();
        }
    } else if (cm.getQ()==51) {
        if (!cm.haveItem(4001192)) {
            cm.sendOk("Here's another treaty.\r\n\r\n#eObtained Item!#n\r\n#i"+4001192+"#"), cm.gainItem(4001192), 
                    cm.talkGuide("Let's get this back to Taeng."), cm.dispose();
        } else {
            cm.sendOk("Don't you have to give the copy of the treaty to your commander?");
            cm.dispose();
        }
    } else if (cm.getQ()==50) {
        cm.sendNext("Right ... the treaty. We'll need to sign our names and include the commander we work under. We can simply"+
            " write their names and they can sign it later. You understand this, right? Let's begin to mark it up.");
    } else if (cm.getQ()==49) {
        cm.sendNext("I'm very busy, please come back at a later time ...");
    } else {
        cm.sendOk("What do you want? I'm very, very busy.");
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
        if (cm.getJobId() >= 1000 && cm.getJobId()<2000) {
            cm.sendGetText("Okay, what is his name? I'll jot it down in our records as soon as possible.\r\n\r\n#eCapitalize the first letter in"+
                " all names#n");
        } else if (cm.getQ()==50) {
            cm.sendNext("By the proclamation and acknowledgment of both the Explorer Tribe and the armies of the Knights of Cygnus"+
                ", this document invokes the powers of both empires to declare an armistice of 2 months. Through this document, the"+
            " following actions are prohibited:#b\r\n\n\
            \r\nOpen confrontation\r\nAmbushes\r\nAssassination Attempts\r\nCoups\r\nBlockades\r\nEmbargos\r\nQuarantines\r\nDiscrimination"+
                "\r\nTariffs\r\nMonopolies\r\nBattles\r\nImprisonment of Major Figures\r\nBribery\r\nCorruption of Opposing Figureheads"+
            "\r\nSpying\r\nSabotage\r\n\r\n#kBy agreeing to these terms, the two powers, Explorer Tribe and the armies of the Knights"+
        " of Cygnus employ their armed forces and dedication to the eradication of a growing monster threat effective 1244 R.E. If"+
    " such monster threat has not been eliminated from the continents of both powers, then through the binding legal power of this"+
" document may the two powers intialize a renewal of contract and allegiance to one another. The terms of establishing such a renewal"+
" lie in the following conditions:\r\n\r\n#bHalting of Sieges By Monsters\r\nTrade Routes Unfettered\r\nComprehensive Messenging\r\n"+
"Nights in Public Areas Unhampered\r\nSafety to Citizens in Public and Enstated Areas\r\n\r\n#kIf these conditions are filled, then"+
" the armistice will end effective 2 months from now, and will no longer require a council meeting to reinstate its legal powers. If"+
" the conditions are not met, then this contract will reopen 2 months after its initial signing for renewal. If renewal does not"+
" take place although the monster threat has not been eradicated, then this contract will dissolve legally and leave the two powers"+
" in an antebellum phase regarding the monster threat. For this treaty to operate legally, the two powers are required to select"+
" two ambassadors, one for each empire, to sign this treaty. These two ambassadors are then tied to this document, and are obligated to"+
" return for future renewals of this contract. If the powers refuse to meet this requirement, then the contract will dissolve and an"+
" antebellum state regarding the monsters will be resumed.\r\n\r\n#k#eSignature 1:#n ______________\r\n#eSignature 2:#n #bAgent Max"+
"imillium#k");
        } else {
        cm.sendNext("It's actually very important. I come on behalf of the #bexplorer tribe's#k embassy, here to negotiate a treaty"+
            " regarding terms in ceasefire and alliance.",2);
        }
    } else if (status == 1) {
                if (cm.getJobId() >= 1000 && cm.getJobId()<2000) {
                if (cm.getText()!="Gerrard") {
                    cm.sendOk("#b"+cm.getText()+"#k? I don't seem to have in the population records. Are you sure you have his name correct?");
                    cm.dispose();
                } else {
                        cm.sendOk("Brilliant, that'll take care of him. Report back to #bAgent E#k so you can relay her his name as well."+
                            "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 45000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 45000 meso");
                        cm.completeQ();
                        cm.gainExp(45000), cm.gainMeso(45000), cm.dispose();
                }
                } else if (cm.getQ()==50) {
                     cm.sendGetText("Please sign your name ...");
        } else {
        cm.sendNext("What? Ceasefire, I can believe. The #bloyalists#k are winning the battle against the #bexplorers#k, that's why"+
            " you want a ceasefire, isn't it? Well, how about no? How about I say \"no\" to your pathetic treaty?\r\n\r\n"+
        "#L0##bSure, you can say no. And while you're at it, you can also fight the monster threat that is beginning to loom on all"+
            " borders of the planet. So then you'll have to fight two of us at once, how does that sound? Great, doesn't it."+
        " You know what, see ya, I don't have to waste time negotiating with the losing side.");
        }
    } else if (status == 2) {
         if (cm.getQ()==50) {
            if (cm.getText() != cm.getPlayer().getName()) {
                cm.talkGuide("Hey, you didn't even sign your name correctly!");
                cm.dispose();
            } else {
                cm.sendOk("That's it, I guess we're officially partners against the monster horde. It feels incredibly awkward ... and"+
                    " somewhat relieving. We have a goal that both of us can share.\r\n\r\n#eObtained Item!#n\r\n#i"+4001192+"#\r\n\r\n"+
                " If you lose the treaty we have copies, so don't worry.");
                 cm.talkGuide("Let's get the treaty back to Taeng, he should know what to do with it."), cm.gainItem(4001192);    
                 cm.completeQ();
            cm.dispose();
            }
        } else {
        cm.sendNext("Wait! Wait, back-peddle for a moment. You noted that a monster threat is growing on every border of the world?"+
            " Do you know the underlying cause of it? If you have a good enough reason, then maybe we'll be able to work out some"+
        " sort of arrangement ... an armistice to save ourselves from this threat. We haven't had monster infestations on a large"+
    " scale since almost a millenia ago. Are you sure this isn't a ploy, because if it is I'll redouble any efforts to wipe out your"+
" filthy peasantry.\r\n\r\n#L0##bNope, you can check for yourself. There are several demon portals sprouting from out within the"+
" surface of the Earth and releasing the fiends. Haven't you had an increased report of monster activity? If so, have you been"+
" avoiding such reports?");
        }
    } else if (status == 3) {
        cm.sendOk("Look, I've had a lot more problems to deal with than a simple monster infestation, but now that you bring it"+
            " to mind they do seem to be growing in number. Fine, let's make a treaty right now then.\r\n\r\n"+
        "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0#"+
        "100000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 50000 meso");
        cm.gainExp(100000), cm.gainMeso(50000), cm.completeQ(), cm.talkGuide("Let's talk to Agent M again. He seems to be preparing the"+
            " treaty for us."), cm.dispose();
    }
}