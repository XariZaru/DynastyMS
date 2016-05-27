var status = -1;
var dream = 108000700;
var correct = 0;
var riddles = ["There is a man and a woman. They both sit upon the fringes of the lake and are fishing for their meal of the day. A rich man comes upon them and yells #e\"Watch out\"!#n And a great shark launches from the watery depths and kills the woman. What literary device does this echo?\r\n\r\n#bMetaphor\r\nTone/Imagery\r\nMotif", "","",""];
var answers = [["metaphor", "tone/imagery", "motif"],[],[],[],[]];
var progress = 0;
var newReq;

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

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function randomizer() {
    newReq = new Array();
    shuffle(riddles);
    cm.sendOk(riddles[0]);
}

function action(m,t,s) {
    if (m == 1) {
        randomizer();
    } 
    cm.dispose();
}