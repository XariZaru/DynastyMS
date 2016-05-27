//item = 1012084;
//var skills = [[4120005,4220005],[10,10]];
//var npcs = [9300005];
//
//
//function start() {
//    cm.changeMusic("Bgm00/Tennessee");
//    x = -95;
//    y = 95;
//    id = 100100;
//    id = 6130101;
//    cm.createMob(id,x,y,3,50,10);
//    c = cm.c;
//    //cm.spawn(id,1,x,y);
//    cm.c.getPlayer().dropCleanMessage("" + c.getPlayer().getMap().getMonsterById(id).getStats().getExp());
//    cm.dispose();
//    }
////    cm.gainSp(26);
////    cm.warp(101000000)
////    cm.dispose();
////    cm.gainExp(50 * Math.pow(cm.getLevel(),3));
////}
//
//function action(m,t,s){
//    if (mode != 1) {
//        cm.dispose();
//    }
//}
//
//function faggot(string, exp, meso) {
//    cm.sendOk(string);
//    cm.gainExp(exp);
//    cm.gainMeso(meso);
//    cm.dispose();
//}

var status = -1;
var info = [
    "#bJob advancements#k are not like GMS. You must follow the storyline of the server in order to receive your job advancement.\r\n\r\nEach type of job (Explorer, Cygnus, Aran), have an important npc to speak to in order to continue his or her storyline. For Explorers the main person to speak to in your storyline is #bTaeng#k, whilst Aran's is #bSejan#k, and Cygnus's is #bAgent E#k.\r\n\r\nYou must complete the quests assigned by the storyline npcs and they will job advance you as you reach appropriate levels.",
    "You can communicate with other players by whispering to them. You can find who's online by using the command: #b@online#k. This will allow you to view all online users in different channels.\r\n\r\nTo call for GM assistance, simply use the command: #b@callgm#k, which will send a world-wide notice to all GMs to come to your aid. If there are none online, a notice is left for the GM upon return so he or she may contact you as soon as possible.",
    "This server is a custom server with features similar to that of GMS. You must follow a storyline to job advance, and earning rewards, items, equips, and other things are also very difficult. The community is very interactive and tight-nit, although we are a little small right now.", 
    "The server may be missing some core features such as the entrance to some bosses, but that's because DynastyMS is  striving for customization. That means bosses may be fought only if the party or individual completes a task. This will provide maximum player interaction with the server to bring a feeling of community and involvement with the server and its players."];
var job,communicate,server,lack,quiz = false;
var quest = 10002;
var progress = 0;
var correct = 0;
var questions = ["In order to job advance, what must you progress?\r\n\r\n#b#L0#Storyline\r\n#L1#Karma\r\n#L2#Standing\r\n#L3#Level","What is the command you must type to see who is online in the game?#b\r\n\r\n#L0#@who\r\n#L1#@online\r\n#L2#@check\r\n#L3#@on",
//    "Who must the an Explorer talk to in order to job advance?\r\n\r\n#b#L0#Taeng\r\n#L1#Sejan\r\n#L2#Agent E\r\n#L3#Master Explorer", "What type of server is this?\r\n\r\n#b#L0#Custom-GMS\r\n#L1#Custom\r\n#L2#GMS\r\n#L3#High-rate", "Why is this server seeming to lack in complete features?\r\n\r\n#b#L0#Because of customization\r\n#L1#Because the staff is lazy\r\n#L2#Because the players are lazy\r\n#L3#Because I'm tired"
    ];
var answers = [0,1,0,0,0];
var head = "#eQuestion #";

function start() {
    action(1,0,0);
}

function header() {
    return "#b#e----------=========DynastyMS Basics=========----------#k#n\r\n\r\n";
}

function action(m,t,s) {
    if (m == 1) {
        status++;
    }
    switch(status) {
        case 0:
            if (!cm.iQC(quest)) {
                cm.sendNext(""+header()+"Hey, #b#h ##k, I'm here to give you the core basics to the server to prevent miscommunication and confusion when reaching higher levels. You must go through each option and are subjected to a quiz at the end. You must pass this quiz to move on, or you're forced to re-read the information once more.");
            } else {
               cm.sendOk("You've already completed the 101-DynastyMS basics quiz. You may continue on with your storyline!");
               cm.dispose();              
            }
            break;
        case 1:
            cm.sendSimple(""+header()+"Which of the following options would you like to see? You must read through all four options before taking the quiz.\r\n\r\n#b#L0#"+(job == true ? "#r[READ]#k " : "")+"How do I job advance?\r\n#L1#"+(communicate == true ? "#r[READ]#k " : "")+"How can I communicate with GMs and/or players?\r\n"+(job && communicate ? "#e#L4#Take the quiz#n" : "")+"");
            break;
        case 2:
            switch(s) {
                case 0:
                    job = true;
                    break;
                case 1:
                    communicate = true;
                    break;
                case 2:
                    server = true;
                    break;
                case 3:
                    lack = true;
                    break;
                case 4:
                    quiz = true;
                    break;
            }
            if (!quiz) {
                cm.sendNext(header() + info[s]);
                status = 0;
                break;
            } else {
                if (progress > 0) {
                    if (s == answers[(progress - 1)]) {
                        correct++;
                    }
                }
                if (progress < 2) {
                    text = ""+(progress + 1)+"#n\r\n\r\n\r\n";
                    cm.sendSimple(head + text + questions[progress]);
                    progress++;
                    status--;
                } else {
                    if (correct == 2) {
                        cm.sendOk("You've successfully completed this assignment. Have fun playing #bDynastyMS#k!");
                        cm.completeQuest(quest);
                        cm.talkGuide("You may now speak with "+(cm.getJobId()== 0 ? "Mom and Dad" : "Perzen")+" to continue your storyline!");
                        cm.dispose();
                        return true;
                    } else {
                        cm.sendNext("You scored a "+correct+"/"+(questions.length)+". You must answer all questions correctly to continue your Dynasty experience. As a result, you'll be taken back to the front and be required to read through everything once more.");
                        reset();
                    }
                }
            } 
      }
}

function reset() {
    correct = 0;
    progress = 0;
    job = false;
    communicate = false;
    server = false; 
    lack = false;
    quiz = false;
    status = 0;
}

