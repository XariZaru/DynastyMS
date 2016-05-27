var status;

var categories = ["Towns", "SecondCategory", "ThirdCategory", "Fourth Category"];
// Last time I'm touching this JQ npc except for fixes.
var points = [[1,2,3,4],[1]];

// This array gets pushed with a chosen map's name
var selections = [];
 
// Return map id
var returnMap = 910000000;
var choosing = null;
var playList = false;
var selection = null;
var deleting = false;
 
 
function start() {
        status = -1;
        var getJQ = cm.getPlayer().getJQ();
        if (getJQ == null) {
                cm.sendSimple("Which JQ would you like to attempt? You currently have #b"+cm.getPlayer().getJQPoints()+"#k JQ points.\r\n\r\n#L100#Start a playlist#l\r\n\r\n\t\t\t\t\t\t\t\t#b#L"+(Math.floor(Math.random() * cm.numberOfJQMaps()) + 200)+"#Random JQ#l\r\n" + sendCategories());
        } else {
        	var notFinished = !getJQ.checkFinished();
        	if (notFinished) {
	        	if (cm.getParty() != null) 
	        		cm.warpParty(parseInt(cm.getJQStuff(getJQ.getNextMap(), "mapid")));
	        	else
	        		cm.warp(parseInt(cm.getJQStuff(getJQ.getNextMap(), "mapid")));
        	}
        	cm.getPlayer().yellowMessage("You have gained " + cm.getJQStuff(getJQ.getMaps()[getJQ.getLevel() - 1], "points") + " JQ points!");
        	cm.getPlayer().gainJQPoints(cm.getJQStuff(getJQ.getMaps()[getJQ.getLevel() - 1], "points"));
        	getJQ.advanceStage();
            cm.dispose();
        }
}
 
function action(m,t,s) {
        if (m != 1) {
                cm.dispose();
                return;
        }
        status++;
        if (status == 0) {
                // Playlist
                if (s == 102) {
                        cm.dispose();
                } else if (s == 100 || playList) {
                        playList = true;
                        text = "These are your currently selected maps:\r\n\t\t#b" + getMapNames(false) + "\r\n\r\n";
                        text += "#kWhat maps do you wish to add to your playlist?\r\n" + sendCategories();
                        text += "#e\r\n#L501#Clear current selections\r\n";
                        text += "#L1000#Delete a selection\r\n";
                        text += "#L1001#Shuffle playlist\r\n"
                        text += "#L500#Start the JQ!";
                        cm.sendSimple(text);
                } else if (s >= 200) {
                    selections.push(Math.round(s - 199));
                    cm.sendSimple("You have been given a #d#erandom map#n#k to play on." + confirmSelection());
                } else {
                	cm.sendSimple("Choose from the following category:\r\n" + cm.getJQList(categories[s], selections));
                }
        } else if (status == 1) {
            if (s == 500) {
            	startJQ();
            } else if (s==1001) {
            	cm.sendNext("Your list has been shuffled!");
            	shuffle();
            	status = -1;
            } else if (s == 1000) {
            	if (selections.length == 0) {
            		cm.sendNext("You currently have no selected maps!")
            		status = -1;
            	} else {
            		deleting = true;
                	cm.sendSimple("What maps do you wish to delete from your playlist?\r\n\r\n#b" + 
                			getMapNames(true));
            	}
            } else if (s == 502) {
        		cm.sendOk("\t\t\t\t\t\t\t#eRankings for #b#m"+parseInt(cm.getJQStuff(selections[0], "mapid"))+"##k#n\r\n\r\n" + cm.getRankings(parseInt(cm.getJQStuff(selections[0], "mapid"))));
                cm.dispose();
            } else if (s == 501) {
                cm.sendNext("Your current playlist has been cleared.");
                selections = [];
                status = -1;
            } else if (playList) {
	        	selection = s;
	        	cm.sendSimple("Choose from the following maps:\r\n" + cm.getJQList(categories[s], selections) + "\r\n#L1000#Go back");
            } else {
            	selections.push(s);
		        text = "You have selected #e#d#m" + parseInt(cm.getJQStuff(s, "mapid")) + "##k#n as your current map.";
		        cm.sendSimple(text + "\r\n\r\n\t\t#L500#Enter JQ\t\t#L502#View Rankings");
		        status = 0;
            }
        } else if (status == 2) {
        	if (s==1000) {
        		cm.sendNext("Going back to map selections ...");
        		status = -1;
        	} else if (playList && !deleting) {
        		cm.sendNext("You've chosen #b#m " + parseInt(cm.getJQStuff(s, "mapid")) + "##k as a JQ map.");
        		selections.push(s);
        		status = -1;
        	} else {
	        	cm.sendNext("You have removed #b#m" + parseInt(cm.getJQStuff(s, "mapid")) + "##k from your playlist.");
	        	selections.splice(selections.indexOf(s), 1);
	        	deleting = false;
	        	status = -1;
        	}
        }
}

function getMapNames(selection) {
	var names = [];
	for (var x = 1; x <= selections.length; x++) {
		names.push((selection ? "#L"+selections[x - 1]+"#" : "") + "#m"+parseInt(cm.getJQStuff(selections[x - 1], "mapid"))+"#" + (selection ? "\r\n" : ""));
	}
	return selection ? names.join("") : names.join(", ");
}

function startJQ() {
	if (selections.length > 0) {
		if (cm.getParty() != null)
			cm.warpParty(parseInt(cm.getJQStuff(selections[0], "mapid")));
		else
			cm.warp(cm.getJQStuff(selections[0], "mapid"));
		cm.startJumpQuest(selections, returnMap);
        cm.dispose();
	} else {
		cm.sendOk("You cannot start a JQ when you have no maps chosen!");
		cm.dispose();
	}
}

function confirmSelection() {
	return "\r\n\r\n\t\t#L500#Enter JQ";
}

function sendCategories() {
	text = "\r\n";
	for (x = 0; x < categories.length; x++) {
		text += "#L"+x+"#"+categories[x]+"#l";
		text += "\r\n";
	}
	return text;
}

function shuffle() {
  var currentIndex = selections.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = selections[currentIndex];
    selections[currentIndex] = selections[randomIndex];
    selections[randomIndex] = temporaryValue;
    
  }

  return;
}