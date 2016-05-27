/*
 * Yuan
 * Desc: Sells basic skills for money
 * Name: Jonathan Nguyen
 */

var status = -1;
var skills = [[2321008],[5221006],[1120004,1220005,1320005],[1121006,1221007,1321003],[1121002,1221002,1321002],[1120003,11110005],[1121010],[1320006],[1321007],[1221003],[1221004],[1221011],[3121008],[3121006],[3121004,13111002],[3221005],[3221001],[3221007],[2321003],[9101005,2321006],[3211003,2221007],[2221006],[2221003],[2221005,12111004],[2121005],[2121003],[2121007,12111003],[2121006],[4121004,4221004],[4221001],[4221006],[4121008], [3221001], [5121003], [5121004], [5121005]];
var price = 15000000;
var selection;
var count = 0;
var x = 0;

function start() {
    if (cm.getPlayer().isFourth()) {
        if (cm.getQ() >= 64) {
            cm.sendNext("Haha! It's good to see someone who wishes to purchase my wares. Come, come, why don't you see the skills you can purchase. All of them are the same price. Anything for a general of the army!");
        } else {
            cm.sendOk("Training the men is any general's job in the army. We must all be a part and provide the necessary materials to win this war.");
            cm.dispose();
        }
    } else {
        cm.sendOk("Finding the right equipment for the right man is only one of the thousands of tasks required to run an army.");
        cm.dispose();
    }
}

function action(m,t,s) {
    if (m == 1) {
        status++;
    } else {
        cm.dispose();
        return false;
    }
    if (status == 0) {
        text = "You can purchase any of the following skills below for #b"+price+"#k mesos. Upon purchase, the mastery level will be set to #e10#n and any points you have invested in it will be set to #e0#n, so be careful when you invest your money into this synthesis.";
        for (var i = 0; i < skills.length; i++) {
                text += "\r\n#L"+i+"##s"+skills[i][0]+"# - #q"+skills[i][0]+"#";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        selection = s;
        cm.sendYesNo("Are you sure you wish to purchase #b#q"+skills[selection][0]+"##k for #b"+price+"#k mesos?");
    } else if (status == 2) {
        if (cm.getMeso() >= price) {
            cm.sendOk("You have purchased the skill: #b#s"+skills[selection][0]+"##k for #e"+price+"#n mesos.");
            for (var i = 0; i < skills[selection].length; i++) {
                cm.teachSkill(skills[selection][i],0,10,-1);
            }
            cm.gainMeso(-price);
        } else {
            cm.sendOk("You lack the necessary funding for this investment, general. Perhaps if you go and raise more funds you can synthesize your knowledge with the skills I have with me.");
        }
        cm.dispose();
    }
}