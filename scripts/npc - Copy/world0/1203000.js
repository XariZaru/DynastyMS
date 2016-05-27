var status = -1;
var dream = 108000700;
var correct = 0;
var riddles = ["There is a man and a woman. They both sit upon the fringes of the lake and are fishing for their meal of the day. A rich man comes upon them and yells #e\"Watch out\"!#n And a great shark launches from the watery depths and kills the woman. What literary device does this echo?\r\n\r\n#bTone/Imagery\r\nMotif\r\nIron\r\nSoliloquy\r\nMetaphor\r\nEulogy\r\nEuphemism", "What starts with E, ends with E, and has a letter in it?", "Who is the person you report to for all of your missions? I only need the first name.", "What neutral town did the Knights of Cygnus wish to consummate a deal with? Yes ... I know your contemporary events. Do not question my power.", "Have you ever been fatally wounded (killed) during your training?"];
var answers = ["metaphor","envelope","taeng","sleepywood","yes"];
var progress = 0;
var newReq;
var token = 4000524;
var skills = [1121000,1221000,1321000,2121000,2221000,2321000,3121000,3221000,4121000,4221000,5121000,5221000,21121000,1120004,1220005,1320005,1121001,1221001,1321001,1121008,11111004,1321007,1221009,3121002,3221002,3120005,13110003,3121007,3221006,3220004,2121001,2221001,2321001,2121002,2221002,2321002,2321005,2221006,4120002,4220002,14110004,4221007,4121006,4120005,4220005,5121007,15111004,5121001,5121009,5221010,15111005,5121002];

function start() 
{
    if (cm.getMapId() < 108000700 && cm.getMapId() > 108000719) {
        cm.sendOk("What do you need?");
        cm.dispose();
    } else {
        cm.sendSimple("What do you wish to do?\r\n\r\n#b#L0#Talk with Sir Blacksmith\r\n#L1#Exit #m"+cm.getMapId()+"#");
    }
}

function sQuest(exp,meso,guide) {
    string = "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# "+exp+" exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# "+meso+" meso";
    cm.gainExp(exp);
    cm.gainMeso(meso);
    cm.talkGuide(guide);
    cm.completeQ();
    cm.dispose();
    return string;
}

function action(m,t,s) {
    if (m == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (s == 1) {
            cm.warp(101000003);
            cm.dispose();
        } else {
            switch(cm.getQ()) {
                case 63:
                    if (!cm.haveItem(token,100)) {
                        cm.sendOk("You're getting there, but I don't believe you have anywhere close to the amount I want. I need at least #b100#k #t"+token+"#.\r\n\r\n#eProgress!#n\r\n\r\n#B"+(cm.itemQuantity(token)/100)+"# "+(cm.itemQuantity(token)/100 * 100)+"%, "+cm.itemQuantity(token)+"/100 #t"+token+"# collected.");
                        cm.dispose();
                        break;
                    } else {
                        cm.sendAcceptDecline("Wow, this is exactly what I needed! I gather #t"+token+"# from the bears. I'm not entirely sure where they get them from, but I've spent millienias deciphering their language and habits. They disappear every solstice and return with a plethora of these weird little tokens. I'm able to forge weapons and extract energy from the tokens to make wonderful pieces for the generals of the Explorers. What do you say, do you want to absorb the skills you so truly deserve?");
                    break;
                    }
                case 60:
                    cm.sendNext("#eAHA!#n Finally, someone else to come by to take the challenge? God, I've spent years rennovating this place just to scare the jesus out of someone like you. Come here, come here!");
                    break;
                case 61:
                    cm.sendAcceptDecline("The very first thing I need to do is to test your intelligence and wit. This includes answering riddles correctly and having a worldly knowledge of the lives around you. Are you up to this task? This will be your #e1st#n task.");
                    break;
                case 62:
                    cm.sendAcceptDecline("Now that I've gotten insight into that brain of yours, let's take a look at your skills! Go into the next map and kill all the bears you see there. Sure, they're a little worn down from practice, but they've been savoring a moment to fight against a general. What say you? Why don't you head over and get me some of those little things they drop ... what were they called again?");
                    break;
                default:
                    cm.sendOk("Yes, what do you need?");
                    cm.dispose();
                    break;
            }
        }
    } else if (status == 1) {
        switch(cm.getQ()) {
            case 63:
                for (var i = 0; i < skills.length; i++) {
                    cm.teachSkill(skills[i],0,10,-1);
                }
                cm.sendOk("I believe you have been taught all I know about the mastery of skills. Your most basic ones are revealed to you (ones given in GMS upon job advancement); however, I will not be teaching you the rest. Those are ones you must find in your quest against the blight. You may leave now."+sQuest(10000000,5000000,"Finally, we have completed our day's worth and proved ourselves valuable to hold such knowledge and skill!"));
                cm.gainItem(token,-cm.itemQuantity(token));
                cm.dispose();
                break;
            case 60:
                cm.sendNext("You know why you're here right? Of course you know why! That's the reason you came in the first freaking place. Look, I'll tell you what. My shop is one hell of a place. I've honed so many generals that I could probably take over the universe with an entire legion of them. #eWait, no ... it's not about me#n. It's about you! Yes ... you want your skills, don't you? Well ... I do suppose that'd be beneficial for leading an army. Okay then, fine, you can have your skills.\r\n\r\n#eBUT!#n You have to do a few errands for me. In other words: challenges.");
                break;
            case 61:
                cm.sendGetText(riddles[progress]);
                progress++;
                break;
            case 62:
                cm.sendOk("Just exit through that map to the left and kill some bears. You'll find what I'm looking for. I believe I need at least 100 ...\r\n\r\nBe careful. They're quite strong, those beasts. They've been training for a moment such as this for over a century!");
                cm.talkGuide("Let's go to the area on the left and find these foul creatures!");
                cm.completeQ();
                cm.dispose();
                break;
        }
    } else if (status == 2) {
        switch(cm.getQ()) {
            case 60:
               cm.sendAcceptDecline("If you're up for the task, just accept. Otherwise, you can just leave this place like a coward.");
               break;
            case 61:        
                text = cm.getText();
                if (text.toLowerCase()==answers[(progress-1)]) {
                    correct++;
                }
                cm.sendGetText(riddles[progress]);
                progress++;
                break;
        }
    } else if (status == 3) {
        switch(cm.getQ()) {
            case 60:
                cm.sendOk("Fantastic! I'm sure we'll get along quite well. If you wish to begin your training, just talk to me again.");
                cm.completeQ();
                cm.dispose();
                break;
            case 61:
                text = cm.getText();
                if (text.toLowerCase()==answers[(progress-1)]) {
                    correct++;
                }
                cm.sendGetText(riddles[progress]);
                progress++;
                break;
        }
    } else if (status == 4) {
        switch(cm.getQ()) {
            case 61:
                text = cm.getText();
                if (text.toLowerCase()==answers[(progress-1)]) {
                    correct++;
                }
                cm.sendGetText(riddles[progress]);
                progress++;
                break;
        }
    } else if (status == 5) {
        switch(cm.getQ()) {
            case 61:
                text = cm.getText();
                if (text.toLowerCase()==answers[(progress-1)]) {
                    correct++;
                }
                cm.sendGetText(riddles[progress]);
                progress++;
                break;
        }
    } else if (status == 6) {
        switch(cm.getQ()) {
            case 61:
                text = cm.getText();
                if (text.toLowerCase()==answers[(progress-1)]) {
                    correct++;
                }
                if (correct < 5) {
                    cm.sendOk("Unfortunately you only answered #b"+correct+"/"+riddles.length+"#k questions. You have to answer all of them correctly to proceed.");
                    cm.dispose();
                } else {
                    cm.sendOk("My, that is just splendid! I never expected you to ever answer any of them correctly at all! Haha, well played. If you wish to continue with your lesson, please just speak with me any time.");
                    cm.completeQ();
                    cm.dispose();
                }
                break;
        }
    }
}