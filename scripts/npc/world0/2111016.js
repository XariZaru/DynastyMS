var status;
var quests = [[32,33,34,35,36,37,38],[],[]];
var names = [["Helping Santa","A Night at the Inn","Beasts","Shadowsong","Into the night","With fire and sword","Death","Overlord"],[],[]];
var details = 
      [["#eFinish helping Santa so he can prepare for the holiday festivities.#n\r\nYou've finished helping Santa. Perhaps "+
                "it's time for you to go and see your parents. You should tell them of the things you've accomplished tonight."
        ,"#eFind the hotel tickets so you and your parents may spend the night at Happyville#n\r\nYour parents told you to purchase some "+
                "tickets from a man named Simon. These tickets will grant you a night's stay at Happyville for you to continue its"+
                " hospitalities."
        ,"okay"
        ,"whatever"
        ,"bam bam bam"
        ,"swords?"
        ,"death is good"
        ,"starcraft!"],[],[]];
var reqArray, reqDetails, reqNames, jobType, sel;

// jobtype: 0 = explorer, 1 = KoC, 2 = aran

function start() {
    status = -1;
    cm.sendNext("Let me retrieve a log of your current quests ...");
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        (cm.getJobId()<900 ? jobType = 0 : cm.getJobId()>=1000 && cm.getJobId() < 2000 ? jobType = 1 : jobType = 2);
        cm.sendSimple("Which of the following quest(s) would you like to view?\r\n\r\n#b#L0#Storyline\r\n#L1#Other");
    } else if (status == 1) {
        sel = selection;
        if (selection == 0) {
            cm.sendSimple("Would you like to view in-progress or completed quests?\r\n\r\n#b#L0#In Progress\r\n#L1#Completed");
        } else {
            cm.sendOk("Uncoded");
            cm.dispose();
        }
    } else if (status == 2) {
        if (sel == 0) {
                reqArray = new Array(), reqNames = new Array(), reqDetails = new Array();
                text = "Which of the following "+(selection == 1 ? "completed" : "")+" quests would you like to open to view more details?\r\n#b";
                for (var i = 0; i < quests.length; i++) {
                    (cm.getQ()==quests[jobType][i] && selection == 0 ? (reqArray.push(quests[jobType][i]), reqDetails.push(details[jobType][i]), reqNames.push(names[jobType][i])) : status);
                    (cm.getQ()>quests[jobType][i] && selection == 1 ? (reqArray.push(quests[jobType][i]), reqDetails.push(details[jobType][i]), reqNames.push(names[jobType][i])) : status);
                }
                if (reqArray.length > 0) {
                    for (var i = 0; i < reqNames.length; i++) {
                    text += "\r\n#L"+i+"#"+(selection == 1 ? "#e#r[COMPLETED]#n#k" : "")+"#b "+reqNames[i]+"";
                    }
                   cm.sendSimple(text);
                } else {
                    cm.sendOk("You are currently not undertaking any quests. Please try again once you've accepted a quest.");
                    cm.dispose();
                }
        } else {
            cm.sendOk("\"Other\" quests log has not been created. Please wait for it to be inputed.");
            cm.dispose();
        }
    } else if (status == 3) {
        cm.sendOk("#e"+reqNames[selection]+"#n#k\r\n_____________________________________________\r\n\r\n"+reqDetails[selection]);
        cm.dispose();
    }
}