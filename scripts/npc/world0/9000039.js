// Import to use SkillFactory and its static methods
importPackage(Packages.client);

var status = -1;

// 5 lists of skills
var warrior_skills = 
	[{id: 11111004, level: 30}, {id: 11110005, level: 20}];
var mage_skills = 
	[{id: 12111003, level: 20}, {id: 12111004, level: 20}];
var archer_skills = 
	[{id: 13111002, level: 20}, {id: 13110003, level: 20}];
var thief_skills = 
	[{id: 14110004, level: 20}, {id: 14111005, level: 20}];
var pirate_skills = 
	[{id: 15111004, level: 20}, {id: 15111005, level: 20}];
	 
// Global variables that are set by type of job
var skills = null;
var commendation = null;

function start() {
	
	// If not a cygnus
	if (cm.getPlayer().getJob().getId() < 1000 || cm.getPlayer().getJob().getId() > 1512) {
		cm.sendOk("Only the Empire's most loyal and strongest knights and inquisitors may access these wares.");
		cm.dispose();
		return;
	}
	
	// Choose skills to sell based on job
	var job = Math.floor(cm.getPlayer().getJob().getId() / 100);
	skills = job == 11 ? warrior_skills : job == 12 ? mage_skills : job == 13 ? archer_skills : job == 14 ? thief_skills : pirate_skills;
	commendation = job == 11 ? 4032374 : job == 12 ? 4032376 : job == 13 ? 4032377 : job == 14 ? 4032378 : 4032379;
	
	// Shows skills that haven't been mastered yet
	var txt = "Which of the following skills would you like to max out for a #b#z"+commendation+"##k?\r\n\r\n";
	for (var x = 0; x < skills.length; x++)
		if (cm.getPlayer().getSkillLevel(skills[x].id) < skills[x].level)
			txt += "#L"+x+"##s" + skills[x].id + "# " + SkillFactory.getSkillName(skills[x].id) + " - " + skills[x].level + "\r\n";
	cm.sendSimple(txt + "\r\n#L999#Exit");
}

function action(m,t,s) {
	if (m < 1 || s == 999) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		// Don't have enough commendations
		if (!cm.haveItem(commendation,1)) {
			cm.sendOk("You need 1 #b#z" + commendation + "##k in order to level up one of your skills to the max.");
		// Purchase complete
		} else {
			cm.sendOk("You have obtained #b" + SkillFactory.getSkillName(skills[s].id) + "'s#k highest mastery level: " + skills[s].level + ".");
			cm.teachSkill(skills[s].id, cm.getPlayer().getSkillLevel(skills[s].id), skills[s].level, -1);
			cm.gainItem(commendation, -1, true)
		}
		cm.dispose();
	}
}