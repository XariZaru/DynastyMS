var status = -1;
var maps = [100000000,101000000,102000000,103000000,104000000,120000000,200000000,250000000,220000000,230000000,221000000,130000000,140000000,211000000,260000000,261000000,240000000,251000000,222000000,540000000,600000000,550000000,551000000];
var map = 1;
var progress = 0;
var train = 920030001;
var info = [//<editor-fold defaultstate="collapsed" desc="Information on the Network">
    ["Our network branches out to nearly every continent, with the exception of a small Royalist sect known as #bOmega Sector#k. Operations in that area have been segregated from the real world and little is known about their discoveries. If you don't know who the Royalists are, or who the Rebels are, perhaps you should talk with our main informant: #bElpam Gorlab#k, who is situated in various towns. You can probably find him in major cities, such as #bNew Leaf City#k on the Victorian Continent.\r\n\r\nOur network provides intel on many different areas. I can tell you right now that Her Majesty, #bCygnus#k, is dining secretly with an ambassador from the country of #bAriant#k and that the Rebel commander, #bTaeng#k, is in discourse with a new recruit in Ellinia. Our network should not be underestimated. We can strike at a moment's notice.","Our little organization originated in the deserts of #bAriant#k as a clan dedicated to simple lifestyles. We pitied the poor, hated the rich, and starved daily. We took our misfortune, wielded it as our boon, and became the thieves people think of us today. Our little inconspicuous group began in 1600 B.R.E, almost 2 millenia ago, in a small room towered by the royal palace in the distance. It was in this hovel where five struggling men devised a solution which would better the lives of those in poverty.\r\n\r\nThey would steal from the merchants and share the goods with the poor: the classic Wu Yu and his hooded gang parable. The network stretched across all of Ariant. If you could find the symbol of a bloody hand imprinted on the bottom right of the door, then you could be sure to find some sort of help within the home if you were a thief yourself. And because of Royal regulations on private property the merchants could not storm said homes searching for someone to incriminate.\r\n\r\nBy 1550 B.R.E the Ariant network had disseminated into Magatia, where the famous scientists themselves found the markets mysteriously lacking in goods. The Magatian task force, renowned for police brutality, stormed the painted homes and murdered 3 women who refused to give up the refugees. In fury, the local thief network rose in rebellion and boycotted the markets by destroying food stalls and restaurants. Ariant sympathsizers sent provisions to supplement the rebellion's armament", "By 1450 B.R.E the rebellion had ended and the police force was coerced to adhere to the thieves' commands. This meant that the thieves held the majority of the power in the social structure. Without the common man the kingdom is doomed to fall, and thus the King's edict repealed the anti-tariff laws and established protection for local businesses. Still, it would take many years for the impoverished sections of the country to recover.\r\n\r\nIn 1385 B.R.E the situation was still nearly as bad as before. Although preventative measures had been put in place, the poor were unable to take advantage of their boon and capitalize on it. The amount of money in the commoners' hands was too little to ignite true reform. As a result, the rich stayed in power, and the poor stayed in poverty.", "Other continents got wind of what our little organization had become. New ones formed in Ellinia and Henesys, and even one in the royal city: Orbis. Our grassroot organization had become something much larger than any of the original founding fathers had even speculated. Riots broke out across the globe. Men sang of more prosperous  times. And from the shadows of the smoke that arose from the fervor rose new feelings of power and balance. In 1290 B.R.E the network of thieves finally met up and formed an intricate communications highway that allowed them to span across the whole world. It is the modern network you see today, and we've hardly changed. It has become a tradition for our younglings to start at a small age and become honed with years of practice. This is what has become of you today."]
    //</editor-fold>
,["I participate as a mediator between the clans."],[]];
var intel,who,how, sel;

function start() {
    if (cm.getJobId()>=2000 && cm.getJobId()<=2999) {
            switch(cm.getQ()) {
                case 30:
                  cm.sendNext("#b(The statue seems to be unmoving and stoic)#k",2);  
                    break;
                default:
                    cm.sendSimple("What do you wish to do? You may enter the hideout whenever you wish to, but to go to other maps you will have to wait an entire day for it to replenish for our network is spread thin at this moment.\r\n\r\n#b#L0#Go to the Hideout\r\n#L1#Other Maps");
                    break;
            }
    } else {
        cm.sendOk("Huh? What do you want from me?");
        cm.dispose();
    }
}


function action(m,t,s) {
    if (m != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        switch(cm.getQ()) {
            case 30:
                cm.sendNext("#b(The statue's eyes suddenly shine brightly and then fade away evanescently)#k",2);
                break;
            default:
                if (s == 0) {
                    for (var i = 0; i < map; i++) {
                        if (cm.getPlayerCount((train + i)) < 1) {
                            cm.getPlayer().saveLocation("WORLDTOUR");
                            cm.warp(train+i);               
                            cm.dispose();
                            return true;               
                        }
                    }
                            cm.sendOk("There is currently a person in the training map. Please change channels or try again at another time.");
                            cm.dispose();
                } else {
                    text = "Here are the following maps our network branches out to:\r\n#b";
                    for (var i = 0; i < maps.length; i++) {
                        text += "\r\n#L"+i+"##m"+maps[i]+"#";
                    }
                    cm.sendSimple(text);
                }
                break;
        }
    } else if (status == 1) {
        switch(cm.getQ()) {
            case 30:
                cm.sendSimple("What do you wish to learn?\r\n\r\n#b#L0#What is the thief network?\r\n#L1#Who are you?\r\n#L2#How do I get missions?"+(intel && how && who ? "\r\n#L3##e#rThat's all I need for now#n#k" : "")+"");
                break;
            default:
                if (cm.getBossLog('Aran') == 0) {
                    cm.setBossLog('Aran');
                    cm.warp(maps[s]);
                    cm.dispose();
                } else {
                    cm.sendOk("Our network is unable to reach you at this time; we are spread too thin to move you. You should wait some time so we can reorganize our men.");
                    cm.dispose();
                    break;
            }
        }
    } else if (status == 2) {
        if (cm.getJobId() >= 2100) {
            switch(cm.getQ()) {
                case 30:
                    sel = s;
                    switch(s) {
                        case 0:
                            intel = true;
                            break;
                        case 1:
                            who = true;
                            break;
                        default:
                            how = true;
                            break;
                    }
                    cm.sendNext(info[sel][progress]);
                    progress++;
                    break;
            }
        }
    } else if (status == 3) {
      if (cm.getJobId() >= 2100) {
            switch(cm.getQ()) {
                case 30:
                    cm.sendNext(info[sel][progress]);
                    progress++;
                    break;
            }
        }  
   } else if (status == 4) {
      if (cm.getJobId() >= 2100) {
            switch(cm.getQ()) {
                case 30:
                    cm.sendNext(info[sel][progress]);
                    progress++;
                    break;
            }
        }  
    } else if (status == 5) {
      if (cm.getJobId() >= 2100) {
            switch(cm.getQ()) {
                case 30:
                        cm.sendNext(info[sel][progress]);
                        progress++;
                        resetInfo();
                        break;                   
            }
        }  
    }
}

function resetInfo() {
    status = 0;
    progress = 0;
}