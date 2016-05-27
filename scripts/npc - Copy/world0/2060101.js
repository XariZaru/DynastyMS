    //<editor-fold defaultstate="collapsed" desc="earlier variables">
var status, bj = [[100,200,300,400,500], ["warrior", "magician", "bowman", "thief", "pirate"]], sel,
        nul = "\r\n\r\nDo you need something? I don't think I've any missions for you to do at this time. Come back later and maybe"+
        " we'll be able to find something for you.", leaf = 4000005, cap = 4000012;
var slime = 4000015, wpot = 2000002, bpot = 2000003, nc = "not coded", skelemap = 101030108, skull = 4000208, bone = 4000207,
        scrolls60 = [2044001, 2044101, 2044201, 2044301, 2044401, 2044501, 2044601, 2044701, 2044801, 2044901, 2043001, 2043101, 2043201,
2043301, 2043801, 2043701, 2040804, 2040817], rand, rand1, rand2, dMaps = [100040000, 104040002, 107000100, 105070001
, 101030403, 101010102], marbas = 4032495, infox = ["Orbis is the #bloyalist#k capital city, which occupies a separate continent"+
        " that is reachable only through our airships. Ever since the war began hundreds of years in the past, transportation between"+
    " the two civilizations have grown dim, and trade has become nearly extinct. The most contact we've had with one another are"+
" usually a part of treaty-signing and negotiations. You can take the airship in #bEllinia#k, though, for it's one of the"+
" few ships the #bloyalist#k fleet will allow to pass through their blockade.", "#bAgent M#k is one of her Majesty's most loyal"+
" agents. It's been said that no man has ever beaten him in single combat. Now, #bAgent M#k rose to notoriety a few years back when"+
" he defeated our head commander, #bTuo Ye#k. It was a devastating blow for our entire nation, but we were able to recuperate"+
" and deal a crushing blow to their advance at our capital city, #bNew Leaf City#k. From there we were able to"+
" set up communication bases and establish a foothold in areas such as this. #bAgent M#k has been trying to reclaim lost territory"+
" ever since, and has been known to be very successful in his endeavors.","The loyalist and explorer feud has been in existence since"+
" the years of 0 R.E. The start of the system #bR.E.#k was recognized the moment our great war began. It is a fixed point in time"+
" and has been titled #bThe Great  Year#k.","It's quite simple. When our army has amassed in strength, we gather at one fixed point"+
" and launch our divisions are various towns. Our main force is focused on the primary target whilst the divsionary forces, ground"+
" forces, and ranged support assist from behind. Our divisionary forces exploit weaknesses in the enemy's defense.","Me?"+
" I've been part of the military since I could wield a proper sword! Which was ... I believe when I was 9. Young men are drafted into"+
" the military so they can begin combat experience training as soon as possible. This will prepare the boys for future combat"+
" and strengthen their resolve in fights."], ret = 0, food = 4031580;
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Towns_Descriptions">
    
    var history = [
        //<editor-fold defaultstate="collapsed" desc="Towns">
        ["Ellinia has perhaps the most intricate history out of any town on Victoria Island. Guang Xi noted it as a #b\"lotus\"#k, a beauty which grows healthily despite the mud and dirt around it."+
                    " Construction on this city began at 850 B.R.E and finished by the end of 750 B.R.E. At the time the splendor of the city was unmatched. Its buildings towered"+
                    " higher than those in Orbis, and the buildings' affinity to nature provided a copious supply of energy that overflowed the city's reserve. So advanced was Ellinia's"+
                    " technology and knowledge in the arts of science that monsters refused to enter a 50 mile radius of the city, which instilled in Ellinia's citizens a sense of"+
                    " superiority and immunity from harm. \r\n\r\nIn his novel,"+
                    " #eYin Cang de Zhon Guo Qi Guan#n (The Hidden Wonders of China), Wu Yuan describes Ellinia as a \"place of extreme fertility and splendor, a state worthy of"+
                    " recognition and eternal praise.\" Wu Yuan stayed in Ellinia for 25 years, and eventually died in Grendel's library, which was at the time known as\n\
 the Library of Great Knowledge, while studying contemporary literature of authors from"+
                    " Orbis, who were at the time envious of the riches of Ellinia.",            
            "You say you wanted to learn more about Perion? Understandable. It possesses a refined\n\
, but warlike culture and has produced perhaps the Empire's strongest Victorian fighters in recorded history. Perion was existent even before the Empire;\n\
 it was an aggressive and brutal tribe, one keen on sacrifices to the God of the Sun. Little was known about this archaic people as written history only\n\
 began a century prior to the tribe's sudden disappearance; however, we do possess some works that reflect on the tradition and deity system of these\n\
 ancient people.\r\n\r\nYou can find multiple works in the Ellinia library at Grendel the Really Old. It's a shame many works were lost in the Great\n\
 Raid of 2685 B.R.E, when the neighboring tribes of Ellinia and Henesys joined in a temporary alliance to plunder the tribe's capital. In \n\
 Big Wolf's #e\"With Fire and Wind\"#n, brutal accounts of rape, pillaging, murder, and ransack were depicted during the tribe's downfall. The Library of\n\
 Perion was spared, as the invaders saw it as a fine piece of architecture; however, the literature inside was confiscated and burned. Henesys and\n\
 Ellinia would not allow works of the Perion tribe to survive and propagate.",        
            "Lith Harbor has had a relatively peaceful history. There is not much to speak of it that is as riveting as that of Perion and Ellinia. It was founded\n\
 recently, just after the election of the first queen that marked the beginning of the R.E period. The Empire relied on the port as means of commerce, always exporting\n\
 goods to the nearest continents. Orbis imported many goods from Victoria Island during this time and manufactured the raw materials only to export them back\n\
 to the port for profit. This type of mercantalism was accepted ubiquitously throughout Victoria; it seems the citizens of the Empire did not mind paying extortiating\n\
 sums in exchange for protection given by Imperial troops.", "Rien was an island colony of the Empire pre-dating to 865 B.R.E. It was discovered and raised\n\
 only a few years before construction on the famous city, Ellinia, began. The Empire saw Rien as an able port, one possessing the ability to shelter the Empire's\n\
 ships and fleets from the devastating storms of the Southern seas. There is a northern and southern current that meets just at Rien's southern tip. There,\n\
 many have known typhoons that frequently pull ships into the ocean's ruthless embrace and crush its survivors in a ferocious tidal pool. The Lith\n\
 Harbor colony participated mainly in fishing and maritime activities for the majority of its years in the Empire, becoming lucrative off of the fish and whale\n\
 oil it exported frequently.\r\n\r\nFor a long time, Rien was peaceful. This placid atmosphere extended for nearly 500 years, when Mengu Ren fleeing the\n\
 coast of Victoria Island docked onto the main harbor. The citizens of Rien welcomed the Mengu Ren with open arms, unaware of what had happened in Ellinia. It\n\
 was here that the Mengu Ren assimilated into Rien culture."],
        //</editor-fold>
        
        //<editor-fold defaultstate="collapsed" desc="Towns0">
        ["However, Ellinia's power and fame did not last forever. It is perhaps the most classic example of the rise to and fall from supreme power; \n\
in 250 B.R.E, Ellinia was attacked and ransacked by the predecessor of the Explorer tribe, a nomadic group called #eMengu Ren#n. In one swift movement all of Ellinia's riches were\n\
 downed and consumed by the greediness and wrath of the nomadic people, who had watched Ellinia grow ceaselessly for nearly half a millenia. The viceroyalty\n\
 at the time came from a long and noble lineage of the #eGong#n family, who were people of great merchant expertise, requested for help from the Empire\n\
 by appealing to her Majesty's right-hand man, whom we know today as the famous #eGuang Xi#n. He arrived in Ellinia in December 24th, 250 B.R.E, and\n\
 drove out the invading forces with an ingenius plan. Ellinia itself was a fortified city capable of withstanding an invasion for at least 12 months.\n\
 Its food supply was large and Ellinia's self-sustaining energy sources made it nearly impossible to bleed the city dry.",
            "Perion's history is actually rather simple. When broken down into segments, one can segregate them into:\n\
 antebellum, bellum, and post-bellum. Antebellum existed during Perion's more quiet days in which their rule was unchallenged\n\
 and unmitigated by the might of the other tribes. Sacrifies went unhindered, and for a long time the sun shined bright\n\
 on Perion. There is a single record of a chant from one of its rituals, which has been recorded into Guan Yu's #e\"A\n\
 History of Ancient Victoria\"#n. On page 84 one can find the tribal chant: \r\n\r\n#e\"The God smiles upon us.\r\n\
It is time for us to go to war\r\n\
Where we may die like true men\r\n\
To be greeted with Heaven's sweet embrace.\r\n\
The God smiles upon us\r\n\
We will make him proud\r\n\
By springing scarlet leaks\r\n\
Across man's porcelain face\r\n\
And crack it open\r\n\
To explore the wonders beneath\r\n\
He smiles upon us.\"#n",
            "When the Empire fell into chaos in the 3rd century B.R.E, Lith Harbor remained relatively unscathed and continued to profit off of its maritime trade.\n\
 Only in the year 248 B.R.E, shortly after the liberation of Ellinia from the Mengu Ren, did Lith Harbor suffer a minor setback. The Mengu Ren, who were fleeing\n\
 the continent as a result of Guang Xi's aggression, passed through the harbor and razed a majority of its fishing ports. Local authorities attempted to withstand\n\
 the brunt force of the invasion, but the Mengu Ren force was too strong and was able to pillage the town without much resistance. A few days later, Guang Xi and his\n\
 army arrived to find Lith in a smoldering ruin, a legion of militia corpses piled at the center of the village. It was here that Guang Xi's second-in-command\n\
 received inspiration to write his documentary, \"The Horrors of the Nomads\", in which he states that #e\"the nomadic peoples know only death and destruction, rape\n\
 and greed. They are a manifestation of evil that must be cleansed from the pure face of her Majesty.\"#n.\r\n\r\nThrough his documentary, he stereotyped all nomadic\n\
 people and marred them with the actions of the Mengu Ren. The documentary became so wide-spread that the Queen herself issued an edict to eradicate all\n\
 non-sedentary peoples in 300 B.R.E. The Mengu Ren were forced into submission, many \n\
abandoning the nomadic ways and settling down in the country side to avoid the Empire's inquisition.",
            "Mengu Ren brought with them innovative ideas to fishing. Since they were nomadic, the Mengu Ren had experience in different environments. They\n\
 brought along with them new technology, such as the #eadvanced harpoon#n. With a single push of a button, a person can launch a harpoon from a semi-automatic\n\
 harpoon to pin fish. This was especially helpful in local communities where men and women relied on fish for their daily appetite. For large scale fishermen,\n\
 the Mengu Ren brought along reinforced nets woven from tree fiber of Victorian trees. The Rien colony, whom had been unaware of such an innovative idea, began\n\
 to import Victorian tree fiber at an alarming rate. The influx of tree fiber was increased by almost 20x, whilst the exports of fish and maritime products \n\
were multiplied by nearly 100. Rien became a bustling colony by the end of 2nd century B.R.E."],
        
        //</editor-fold>
        
        //<editor-fold defaultstate="collapsed" desc="Towns1">
        ["However, Guang Xi concocted a brilliant plan during a two month siege of the city. Technology at the time was most\n\
 limited. Unbeknownst to the Mengu Ren army fortified behind Ellinia's defenses, Guang Xi had requested the schematics and\n\
 blue prints to Ellinia's mainframe. He knew every nook and cranny to the city's defenses, including the knowledge of\n\
 Ellinia's pipage system, which at the time had not been renovated and secured. It was here where Guang Xi spoke his famous\n\
 words: \r\n\r\n#e\"Only during winter's boney grasp does man understand nature's true wrath. And through his fear and clouded judgment\n\
 shall she unveil his one and only weakness and breathe unto it a gout of fire which doth consume him in entirety.\"#n",
            "The bellum records of Perion lie scattered by hostile nations of the old. It is said that one grizzly man \n\
traveled across the lands, clambering up hill sides, trekking the steep mountain slopes, collected one by one these\n\
pieces of paper and transcribed from them onto elegant pieces of paper the text and primary sources of the warrior\n\
 tribe. In very archaic texts, this man was dubbed #bGuang Xi#k. Yes, he shared the name of the once valiant hero of\n\
 the Empire. It is from this man that #bGeneral Guang Xi#k took his name, for only the noblest can possess such a \n\
 renowned name. The Guang Xi we are speaking of, however, scoured the country and city-sides and recorded each\n\
 record in chronological order, ultimately preserving the archaic texts in his small journals.\r\n\r\nWhen he returned\n\
 to his homeland in 2600 B.R.E in El Nath, he was but a withered and worldly old man. Traveling had opened his mind to many new ideas, many of which\n\
 derived from the arid sands of Ariant and the unique half-subterannean machine dubbed \"The Nautilus\". Guang Xi published\n\
 in 2598 B.R.E due to the unwillingness for various presses to accept his \"fanatical\" tales of a dream world; however, he died penniless and without\n\
 a home. His wife and children had left him to his \"meaningless\" banter. It was only at the start of 2000 B.R.E, when the Perion tribe had all been\n\
 extinct, that historians began to understand the validity in his work. His journals and scholarly articles were propagated and widely diffused across\n\
 continents, eventually becoming prominent in the one place he had spent his life in the most: Victoria Island. His descendents grew rich off of his\n\
 endeavors, but squandered its resources quickly. One nephew gambled away rights to his first journal, whilst another lost an entire collection of Guang\n\
 Xi's notes and analysis of Perion culture and its rituals. Only one person, his great, great, great, great grand daughter realized its importance\n\
 and hid his findings in at the time independent #bAquarium#k. There it has rested in confinement of the keepers of the sea, who have refused access to such\n\
 documents for more than two millenia.","The reign of the Inquisition was a ubiquitous and a large enormity. It spanned from #bNautilus Harbor#k to #bLith Harbor#k. Officials were deployed throughout\n\
 the rural and urban areas to detect any possible sign of nomadic influence. Many of the Mengu Ren attempted to assimilate in the city slums, where they would be\n\
 seen as the commoner, one who was worth little to the Inquisitionists. Of the Inquisitionists, the most brutal of them all was a man named #bGuang Zhong#k,\n\
 who excommunicated and burned over 200 Mengu Ren at the stake. He spoke his famous words of power and purification at the burning of his 250th victim:\r\n\r\n\n\
#e\"It is all but flames and ashes to me. The is evil all around me. And I must cleanse. \n\
For this world is full of imperfection and requires such purification.\"#n",
            "When 1st century B.R.E approached, Rien was a lucrative colony, one worthy of the Empire's protective interests; however, when the word of\n\
 rebellion reached Rien, and that the rebels were that of the Mengu Ren, the Rien colony was faced with a decision. It had to either remain loyal to its\n\
 mother country, or honor the bond it had forged with the migrant Mengu Ren by joining the rebellion. It decided the latter, and became the Rebels'\n\
 primary supplier of weapons and arms due to its immense profits from oversea trading. The Empire, angry and resentful over Rien's treachery, attempted a coup\n\
 using her Majesty's right-hand men, but failed miserably. Rien colonists unraveled the plan nearly two weeks in advance and interrupted the usurpers\n\
 before any harm could be done."],
        
        //</editor-fold>
        
        //<editor-fold defaultstate="collapsed" desc="Towns2">
        ["Guang Xi exploited this tragic weakness. He'd manipulated the city's hubris and wielded it as its only bane.\n\
 As early March descended on his encampment, Guang Xi ordered five of his most talented men to approach in the dead of night\n\
 the section of the wall which held the draining pipes. They dug in secrecy, revealing a mini sewage system slithering\n\
 away to a nearby tributary. As dawn broke along the horizon of the city walls, casting its rejuvenating beams onto the\n\
 Imperial army, a bitter irony arose for the Mengu Ren defenders. As the defenders braced themselves for an apparent\n\
 frontal invasion, the right wing of the city shattered with a sonorous sound that extended over a distance of at least\n\
 twenty miles.\r\n\r\nDebris rained from the sky like a thunderstorm, smashing into the ground so violently that Guang Xi himself nearly fell\n\
 from the reigns of his horse. Dust spewed from the ground like an approaching sandstorm, engulfing the Imperial army in an opaque veil which obscured\n\
 all vision and daylight. The sunlight, which had shone so vibrantly on the army, vanished like a candle put out.\r\n\r\nThe Mengu Ren defenders stood\n\
, covered in ash and dirt, awaiting the signal which would doom them. It came. And with the sound of a hundred thousand horsemen and half a million footmen,\n\
 the Imperial army stormed through the breach, slaughtering all who came to its defense. It was #e\"a terrible experience, one full of bloodshed and\n\
 entrails and severed heads. No other day matches the cruelty of the repcature of Ellinia, and no other day will ever emit such dread and horror as\n\
 it. It is a day that will forever live in the blackened halls of my ancestors.\"#n", "Perion was conquered and overtake eventually in 520 B.R.E by the newly\n\
 risen Empire of Cygnus, where the matriarchal society placed upon it new culture and traditions. The warrior tribe was partially subdued by the Imperial\n\
 influences and was succumbed to an overwhelming burden of taxation that stemmed from the Empire's multitude of wars, which seemed to propagate with the\n\
 decades. Perion was subjugated entirely. Its past traditions were lost, and although they held onto their affinity to warfare, the descendents\n\
 of the old began to stray from the ways of the past, adopting Imperial customs and morals. Perion's culture became evanescent by 400 B.R.E, its remnants left behind\n\
 only by Guang Xi's investigative journals.\r\n\r\nIt was only in 338 B.R.E that the Empire began to recruit warriors from the Perion tribe. The Queen\n\
 had mixed herself into a conundrum, potentially fracturing the Empire in halves. A brutal power struggle between her second-in-command General and\n\
 her right-hand man had errupted in an all-out civil war. Desperate to put an end to the mayhem, she enlisted help from Perion, who were eager to\n\
 show their prowess in battle, despite centuries of oppression.", "Guang Zhong continued his reign of the Inquisition for nearly 15 more years until being assassinated\n\
 at one of his Inquisitions. It was said that a man garbed in blackened attire walked by him, and in one subtle motion, injected Guang Zhong with a single poisonous\n\
 needle. Guang fell within two minutes with foam frothing at the corners of his mouth and the spectacle of a burning Mengu Ren dancing in front of his eyes. It\n\
 is a bitter irony, finding yourself a \"harbringer\" of doom whilst seeing your own life slip away from your hands. Guang Zhong may have thought that his life's\n\
 work was one of extreme justice and righteousness, but to the ousted Mengu Ren his name has become a demon, a monster to scare the children at night.",
        "Rien has yet to fall due to external conflict, but there have been numerous accounts of sedition in its very borders. A few loyalists were put to death\n\
 in 188 B.R.E from an attempt to regain control of the island colony. Since then, security has tightened and a permanent militia has been enstated on the\n\
 island to ensure order. Rien is far from the reaches of the Empire, so it is relatively safe; however, we Explorers continue to monitor Rien for any activity\n\
 as it remains our most lucrative province. Without it, our cause will surely falter and the Empire will overrun us. With the monster threat present, however,\n\
 we may be able to put aside such thoughts and focus on a more potent enemy. Access to Rien has been blocked for some time, but rumor has it that construction\n\
 has begun on a canal that will open a direct route from Lith Harbor to Rien, so be prepared to witness Rien in all of its splendor."],
        //</editor-fold>
        
        //<editor-fold defaultstate="collapsed" desc="Towns3">
        ["Guang Xi himself entered the fray. His commanding marshal, Tuo Ye, would later report that the triumphant general \"cut down men with such\n\
 ferocity that even the juggernaught of the Mengu Ren was nearly sliced in half by the vindictive blade of the General.\" Guang Xi's men stormed the outer\n\
 walls, mercilessly decimating all those who approached them. And though they killed without regret, the soldiers made certain not to harm the\n\
 city's infrastructure. Guang Xi understood the vitality of Ellinia to the Empire's revenue; the lucrative city would not be harmed. His men quickly \n\
overtook the eastern part of the city before completely overwhelming the #e\"Forbidden City\"#n, a section of Ellinia reserved only for the viceroyalty.\n\
 The commanding Mengu Ren, the predecessor to today's #bGrendel the Really Old#k, was subdued and brought before the might of Empress Cygnus. The very\n\
 next day his head dangled from the city's highest tower as a symbol of Imperial ruthlessness toward invaders.", "When the warriors finally readied themselves\n\
 for battle in 337 B.R.E, the country was in shambles. Henesys had crumbled to due to internal strife and was plagued by starvation and insanitary\n\
 lifestyles and military juntas which established themselves across the territory. The viceroyalty in Ellinia was being hampered by the populace, whom\n\
 were divided over the support for the general or the Queen's right-hand-man. Unbelievably, this chaos continued for nearly 50 years, weakening the\n\
 Empire substantially and bringing the rule of the Queen to a stand-still as she was rendered useless by the conflicting powers. The Perion troops, \n\
whom were titled #b\"Legio I Perionia\"#k brought order to multiple territories, but were unable to reestablish the Queen's rule over the major towns.\n\
 It was only in 275 B.R.E that the Imperial Legion of Perion was able to reconquer Henesys and establish order. The Queen knighted every member of the\n\
 Legion and promoted its ranks to the Hall of Fame, which can be viewed at any Bulletin Board.", "When the reign of the Inquisition came to a blurry end in 265\n\
  B.R.E, Lith Harbor had recovered financially and an influx of immigrants searching for new opportunities flooded its gates. Mengu Ren, whom had been tamed into\n\
 submission by the Inquisition, desperately craved a middle or even lower class standing; the now sedentary nomads had found themselves lower than the peasantry,\n\
 cast aside by discrimination and prejudice. Especially in Ellinia, where sentiment to Mengu Ren ran dry, the population percentage of Mengu Ren to the Imperials was\n\
 less than 1%. As Mengu Ren demographics were slowly being recorded into the Imperial slates, a segregation between the original Imperials and the now existing\n\
 Mengu Ren developed. Between the years 245 B.R.E and 200 B.R.E, not a single Mengu Ren held any office position, regardless of importance. They were subjugated\n\
 to the farm lands of the South and poverty-stricken homes in the North."],
        //</editor-fold>      
        
        //<editor-fold defaultstate="collapsed" desc="Towns4">
        ["After the recapture of Ellinia, Guang Xi quickly reinstated the antebellum viceroyalty and restored the city's defenses. His men quickly labored to\n\
 restore Ellinia to its previous glory. They worked day and night on the outer city walls. Guang Xi imported artisans from across the Empire to\n\
  erect the Imperial deities; however, by the end of 248 B.R.E, the efforts to restore Ellinia to its previous glory seemed bleak. Guang Xi himself\n\
 lamented at the loss of the supremacy of the city by remarking #e\"It is a sad sight when a mother loses her only child to the embrace of war. Losing the city,\n\
 however, is a pain which will echo forever in the confinements of my heart.\"#n", 
            "Post-275 B.R.E for Perion has been marked only prosperity and fame.\n\
 The heroic deeds of the olden warriors have placed upon Perion a respect unmarred by those who wish to debase its reputation. Shortly after Henesys\n\
 was recaptured, the general we know today as #bGuang Xi#k led a battalion of #bPerionian#k troops to Ellinia to reconquer the lands from the barbaric\n\
 and nomadic Mengu Ren. The very same viceroyalty that had been troubled by the internal conflict caused by the two conflicting powers of the 3rd century\n\
 B.R.E was forced to flee for his life. With his men, Guang Xi was able to retake Ellinia by force and reinstate the city as a wealthy project of the\n\
 Imperial Dynasty. Perionian troops remained garrisoned in the city for nearly a decade before returning home to their families, where they were welcomed\n\
 back as heroes. This second legion, dubbed #b\"Legio II Perionia\"#k was commended for its brave and courageous deeds on the battlefield and was placed\n\
 along side the original Perion legion of Victoria Island.", 
            "When the Mengu Ren situation did not improve over the span of 65 years, discontent began to \n\
arise in the suburbs and rural areas. This, #b#h ##k, is where the rebellion first stirred. The first rebellions took place on a local scale, mainly overthrowing\n\
 local officials and governors. There were several riots and marches consisting of a few hundred people, but there was no major large-scale rebellion which threatened\n\
 the rule and sovereignty of Her Majesty; however, a few years into these rebellions, my great predecessor, #bTaeng the Magnificent#k, united the local populous\n\
 and started what you know today as the #eRebellion#n. His first target was Ellinia, which was the source of Imperial pride and wealth. It was also where\n\
 the first Mengu Ren fell to Imperial blades. The timing was perfect. Guang Xi died in 180 B.R.E, signifying the collapse of the strongest general the\n\
 Empire had ever witnessed. Taeng quickly took advantage of his boon and struck Ellinia, instantly taking it back from the second viceroyalty.\n\
 The city fell without a single razed building. The resistance grew with the fall of Ellinia, spreading like wildfire on a sweltering summer's day. Rien,\n\
 a distant colony of the Empire, succumbed to internal pressure and was liberated by Rebels. The Nautilus, an underwater boat, mutinied against its\n\
 oppressive commander and joined the Rebellion. The resistance had effectively begun at the start of 1st century B.R.E."],
        //</editor-fold>
        
        //<editor-fold defaultstate="collapsed" desc="Towns5">
        
        ["The city you see today is more or less the same as the one Guang Xi left in 248 B.R.E. It is still magnificent, but not nearly as wondrous as it was\n\
 over a millenia ago. Its luminescence has been evanescent, and we can only watch as other cities, such as Orbis, overtake its splendor. We Explorers\n\
 took this city from the Imperial troops almost half a millenia ago, long after its heroic generals and commanders had succumbed to the grasps of the\n\
 afterlife. We hold this city today as a resolute reminder that even the Empire's most treasured city cannot stand against the might of the oppressed.",
            "Perion you see today is one holds the theme that even the most oppressed may be able to rise to fame and glory through\n\
heroic deeds and actions. It began as a noble tribe, one praising the Sun God of the skies, and fell to external conflict of neighboring enemies.\n\
 Its final collapse to the Imperial Dynasty served as a waypoint for the beginning of its rise to prosperity. The city is a culmination of past, present,\n\
 and future events. It is a symbol of how one can rise from the depths of the void and achieve greatness. Perion's people are a proud people, and they\n\
 are content with the Imperial's rule over them. This once proud tribe has come under the content rule of the Empire. Its spawn are magnificent warriors\n\
 who prove their prowess in combat. We Explorers have never met men so fearless as these. If I were to meet one on the battlefield, I would not underestimate\n\
 his or her ability. They are true warriors of the heart and mind.", "Lith Harbor remains one of the Rebels most important historical sites. It marks\n\
 the reasons to why the Mengu Ren rebelled, and also demonstrates why we can never fall back to an oppressed people. The Empire will only condemn us\n\
 and relegate us to lower positions. These positions are unacceptable. We have become as much of the Empire as the regulars who inhabit it. We will fight\n\
 for the day when we are given our rights, and are given our respect. Lith Harbor stands as a manifestation of all of this. It is a beacon of hope, and a \n\
light in the dark."]];
    //</editor-fold>
    //</editor-fold>


var sel;
var progress = 0;
var el = 0; 
var per = 0; 
var lith = 0;
var rien = 0; 
var exp = 0;
var read = [el,per,lith,rien,exp];
var contract = 4031218;
var ava = false;



importPackage(Packages.scripting.npc);

function sQuest(exp,meso,guide) {
    string = "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# "+exp+" exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# "+meso+" meso";
    cm.gainExp(exp);
    cm.gainMeso(meso);
    cm.talkGuide(guide);
    cm.completeQ();
    cm.dispose();
    return string;
}


function start() {
    status = -1;
    if (cm.getJobId()>=1000) {
        cm.sendOk("I'm Taeng, who are you?");
        cm.dispose();
    } else if (cm.getPlayer().isFourth()) {
        switch(cm.getQ()) {
            case 60:
            case 61:
            case 62:
            case 63:
                cm.sendOk("I believe you still need to hone your skills a little more. Come back after you finish your lessons, yes?");
                cm.dispose();
                break;
            case 58:
                cm.sendNext("Hey, before you take off, I realize you're terribly inadequate in terms of clothing and new skills. Our generals have always been given the top skills before leaving off to command their troops valiantly. It is a tradition that accompanies any fine man like you into battle.");
                break;
            case 59:
                cm.sendOk("What are you still doing here? You have to talk to Grendel to get your skills! Your men cannot enter the field of battle with a general who's not honed his blade.");
                cm.dispose();
                break;
            default:
                cm.sendOk("Hah! A strong breeze accompanies the land today. To war!");
                cm.dispose();
                break;
            
        }
         } else if (cm.getQ()==57) {
            if (cm.getLevel()<120) {
                cm.sendOk("#e#r[Level 120] : A General of the Rebels#n#k"+nul+"");
                cm.dispose();
            } else {
                cm.sendNext("So, #h #, it seems you're now well versed in both our ancient history and our plight. What say you? Is the Rebel cause really \n\
    justified, or is it just full of men who are full of themselves and desire power? Because I tell you this, we fight not for power, but for freedom. There\n\
 is no other reason to fight other than for this. Do you not agree?\r\n\r\n#b#L0#Yes I agree");
            }
    } else if (cm.getQ()===56) {
        if (cm.getLevel() < 110) {
            cm.sendOk("#e#r[Level 110] : Preparations to Strike#n#k"+nul+"");
            cm.dispose();
        } else {
            cm.sendNext("Hey, I've been saddling up our forces to combat the growing monster threat."+
                " The provisions you got from our agent in #bPerion#k greatly boosted our munitions"+
            " and have enabled us to march for several days. Perhaps there's hope for our generation yet."+
        "\r\n\r\nAnyways ... before we embark on this incredibly crazy and ambitious quest to eliminate"+
    " yet another monster blight, I believe I owe you an in-depth explanation about our "+
"Explorer lineage. You'd only joined our ranks just awhile ago and you have already completed many"+
" arduous tasks that would cripple some of our most experienced men.");
        }
    } else if (cm.getQ()===55) {
            cm.sendOk("Great, let me just take those off your hands quickly ..."+
                "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 250000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 65000 meso");
            cm.gainItem(food, -cm.itemQuantity(food)), cm.gainExp(1350000), cm.gainMeso(65000), cm.completeQ();
    } else if (cm.getQ()===54) {
        cm.sendOk("Get those supplies from our guy in #bPerion#k.");
        cm.dispose();
    } else if (cm.getQ()===53) {
        if (cm.getLevel()<90) {
            cm.sendOk("#e#r[Level 90] : Taking the Initiative#n#k"+nul+"");
            cm.dispose();
        } else {
            cm.sendNext("Okay, first thing's first, we have to combine forces with the #bloyalists#k. We need to secure our supply trains and"+
                " coordinate movements. We have to pin-point and attack each and every demon portal. If we do that, we'll be able to successfully"+
            " push back the invading monster forces.");
        }
    } else if (cm.getQ()===52) {
        if (cm.getLevel() < 70) {
            cm.sendOk("#e#r[Level 70] : New Powers in Mind?#n#k"+nul+"");
            cm.dispose();
        } else {
            cm.sendAcceptDecline("I've been thinking, it's been awhile since we've last promoted you. I mean, you weren't exactly enstated"+
                " the way we usually promote our men. You were initiated through some dirty underground town by one of our agents without"+
            " a proper ceremony. What do you say? Would you like a proper ceremony?");
    
        }
    } else if (cm.getQ()===51) {
        if (!cm.haveItem(4001192)) {
            cm.sendOk("Huh, where's the treaty? Weren't you supposed to get me a copy of it?");
            cm.dispose();
        } else {
            cm.sendOk("Great, this will do nicely for our endeavor to eliminate the monsters. With the support of the Knights of"+
                " Cygnus, we'll be able to eliminate the monsters.\r\n\r\n#eItem lost!#n\r\n#i4001192#");
        cm.gainItem(4001192,-1), cm.completeQ(), cm.dispose();
        }
    } else if (cm.getQ()>49 && cm.getQ() < 51) {
        cm.sendOk("What are you doing here? Don't you have negotiations with #bAgent M#k?");
        cm.dispose();
    } else if (cm.getQ()===49) {
        cm.sendSimple("You have to go see #bAgent M#k if you want to engage in diplomatic relations at the"+
                " Guild Headquarters. We have to call a ceasefire if we"+
            " want to fight the impending monster threat cohesively.\r\n#b#L0#What is Orbis?\r\n#L1#Who is Agent M?\r\n#L2#How"+
        " long has the explorer and loyalist feud been going on?\r\n#L3#How do we expand our territories?\r\n#L4#How long have you"+
    " been a part of the fight?\r\n\r\n\r\n#l#k#eChoose an option.");
    } else if (cm.getQ()===48) {
        if (!cm.haveItem(marbas)) {
            txt = "Here are the areas you can go to ...\r\n";
            for (var i = 0; i < dMaps.length; i++) 
            txt += "\r\n#b#m"+dMaps[i]+"#";
            cm.sendOk(txt);
            cm.dispose();
        } else {
            cm.sendNext("I found this item when I arrived at the portal. A monster named #bMarbas#k appeared and we fought for awhile"+
                ", but I overpowered him. When he died, he left this behind.",2);
        }
    } else if (cm.getQ()===46) {
        if (!cm.haveItem(bone, 50) || !cm.haveItem(skull,10)) {
            cm.sendOk("You have yet to collect the materials needed for me to study what exactly is allowing the monsters to infiltrate our"+
                " world. Please collect the items necessary."+
                "\r\n\r\n"+("#B"+(cm.itemQuantity(skull)/10 * 100))+"#  "+(cm.itemQuantity(skull)/10 * 100
        )+"% #i"+skull+"# collected\r\n"+("#B"+(cm.itemQuantity(bone)/50 * 100))+"#  "+(cm.itemQuantity(bone)/50 * 100
        )+"% #i"+bone+"# collected");           
        } else {
            rand = Math.floor(Math.random()*scrolls60.length);
            cm.sendNext("This is just what I needed, thank you. I'll have my top scientists looking onto this. The #bexplorer#k tribe will"+
                " need to enter negotiations with the #bloyalists#k to put our past grievances away until we can solve this mystery."+
            "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 85000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 25000 meso"+
        "\r\n#fUI/UIWindow.img/QuestIcon/5/0# Mystery Reward");
        }
    } else if (cm.getQ()===47) {
        cm.sendAcceptDecline("#r#e[Chain Quest 2/2]#n#k\r\n\r\nHey, you're back. I found something in those bones that you might"+
            " like to hear about. Traces of it lead back to a #bdemon's doorway#k, a portal in which mobs spawn from constantly. There"+
        " are several of these portals all across the world, and if monsters are increasing because of these portals, we must look at the"+
    " cause behind them.");
    } else if (cm.getQ()===24) {
        if (cm.getLevel() < 30) {
            cm.sendOk("#e#r[Level 30] : Another Power?#n#k"+nul+"");
            cm.dispose();
        } else {
            cm.sendNext("Hey, the time is right. I've got a man under cover in one of the #bloyalist#k towns that has some juicy news for us.");
            
        }
    } else if (cm.getQ()===45) {
        if (cm.getLevel()<60) {
        cm.sendOk("#e#r[Level 60] : Fighting Revenge#n#k"+nul+"");
        cm.dispose();
        } else {
            cm.sendNext("#r#e[Chain Quest 1/2]#n#k\r\n\r\nYou feeling stronger? Good, because you look the part. "+
                    "We have a problem that's arising. The #bloyalists#k found out"+
                " about our intervention and are bitter. They've already retaliated against several of our delicate supply convoys and"+
            " interecepted several of our messengers. We need some time to cool off.\r\n\r\n#ePlus, there's a bigger problem growing at hand.#n");
            
        }
    } else if (cm.getQ()<45 && cm.getQ() > 25) {
        cm.sendOk("Report to our agent in #bSleepywood#k, he'll know what to do with you.");
        cm.dispose();
    } else if (cm.getQ()===23) {
        if (!cm.haveItem(slime,50)) {
            cm.sendOk("You are currently lacking in proof of completion."+
                    "\r\n\r\n"+("#B"+(cm.itemQuantity(slime)/50 * 100))+"#  "+(cm.itemQuantity(slime)/50 * 100
        )+"% #i"+slime+"# collected");
        } else {
            cm.sendOk("Fantastic work. You haven't failed me once..."+
                "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 28000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 100000 meso"+
            "\r\n\r\n50 #i"+wpot+"# #t"+wpot+"#\t\t50 #i"+bpot+"# #t"+bpot+"#");
                cm.gainExp(28000), cm.gainMeso(100000), cm.gainItem(wpot, 50), cm.gainItem(bpot, 50), cm.gainItem(slime, -50),
                cm.completeQ(), cm.complete(), cm.dispose();
        }
    } else if (cm.getQ()===20) {
        if (cm.getLevel() < 18) {
            cm.sendOk("#e#r[Level 18] : The Next Step#k#n"+nul+"");
            cm.dispose();
        } else {
            cm.sendNext("So, how does it feel to be blessed with a position of the #eexplorer#n tribe? You have to fight for your side at all times, fight for the"+
            " #bDynasty#k. And that starts off with training to be a stronger fighter.");
    
        }
    } else if (cm.getQ()===16) {    
        cm.sendNext("Oh, hello, my name is #bTaeng#k and I am the leader of the explorer tribe on this side of the continent. Say, you seem"+
        " like a worthy adventurer yourself.");
    } else if (cm.getQ() === 19) {
        cm.sendSimple("Now, I understand there are many choices in life, but you've gotta make one right now. And this one decision will"+
            " dictate the outcome of your life. Do you understand? Choose an option below.#b\r\n\r\n#L0#Warrior #L1#Magician #L2#Bowman"+
        " #L3#Thief #L4#Pirate");
    } else if (cm.getQ() === 18) {
        if (cm.getLevel() < 10) {
            cm.sendOk("You don't seem to be prepared for what I'm about to give you. Why don't you train a little while longer?");
            cm.talkGuide("Although you can become a mage at level 8, Taeng wishes for us to train a little longer. He said he'd compensate us."+
                    " Taeng also told us to train in the forest west of here. Why don't we give that a go?");
            cm.dispose();
        } else {
            cm.sendOk("Amazing, I didn't think you would finish so quickly."+
                "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/7/0# 15000 meso");
        cm.gainMeso(15000);
        cm.complete();
        cm.talkGuide("It seems Taeng wishes to speak with us some more.");
        cm.completeQ();
        cm.dispose();              
        }
    } else if (cm.getQ()===22) {
        if (cm.getLevel() < 25) {
            cm.sendOk("#r#e[Level 25] : Tying Loose-Ends#k#n"+nul+"");
            cm.dispose();
        } else {
            cm.sendNext("Brilliant work before. Our caravan supplies have nearly increased by 3 fold ever since you took care of the monster infestation."+
                " We have to be careful when dealing with our own supply trains. An army is built upon layers, the supplies and men being the core of the structure.");
       
        }
    } else if (cm.getQ()===21) {
        if (!cm.haveItem(cap, 40) || !cm.haveItem(leaf, 60)) {
            cm.sendOk("Where are those items I told you to get? You need proof!\r\n\r\n"+("#B"+(cm.itemQuantity(cap)/40 * 100))+"#  "+(cm.itemQuantity(cap)/40 * 100
        )+"% #i"+cap+"# collected\r\n"+("#B"+(cm.itemQuantity(leaf)/60 * 100)+"#  "+(cm.itemQuantity(leaf)/60 * 100
        )+"% #i"+leaf+"# collected")+"");  
            cm.dispose();
        } else {
            cm.sendOk("Great work! I think our supply trains will be okay for now."+
                    "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0#3085 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 13550 meso");
            cm.gainExp(3085);
            cm.gainMeso(13550);
            cm.completeQ();
            cm.complete();
            cm.dispose();
        }
    } else if (cm.getQ() === 17) {
        cm.sendAcceptDecline("#r#e[Getting Started] : Level 7+#n#k\r\n\r\nYou seem to be all right there. Why don't you train in the area "+
                "to the left of here? There are an abundance in all types of monsters that you can train on.");
    } else {
        cm.sendOk("I am Taeng. Make yourself appear in a better fashion!");
        cm.dispose();
    }
    

}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else if (mode === -1) {
        if (status > -1) {
            cm.dispose();
            return;
        } else {
            cm.dispose();
            return;
            }
    } else {
        if (cm.getQ()===49) {
            cm.talkGuide("Let's go to Orbis!");
            cm.dispose();
        } else {
        cm.dispose();
        return;
        }
    }
    if (status === 0) {
        if (cm.getPlayer().isFourth()) {
            switch(cm.getQ()) {
                case 58:
                    cm.sendOk("You can find Grendel the Really Old in his #bMagic Library#k just at the crest of Ellinia. He'll guide you through the ancient arts so that you will not be left behind.");
                    cm.completeQ();
                    cm.talkGuide("Let's go find Grendel the Really Old. Taeng said he was at the top of Ellinia.");
                    cm.dispose();
                    break;
            }
        } else if (cm.getQ()===16) {
            cm.sendNext("Oh, yes I am quite the adventurer. I like to explore and imagine myself on great journeys. Why, what do adventurers "+
                    "do?", 2);      
        } else if (cm.getQ()==57) {
            cm.sendGetText("That's what I thought you'd say. Let me retrieve this form that we give to all of our generals ... yes, I am electing to\n\
 promote you to a status of a general. If you sign your name here on the #bContract of Darkness#k you'll find yourself one with history and with the\n\
 olden generals of the Rebels.");
        } else if (cm.getQ()===56) {
            cm.sendSimple(""+(read[0] == 0 ? "Ask me anything; however, make it quick. I know I owe information to you, but"+
                " at the same time my men require my presence. I most likely won't have time"+
            " to go over our history once we end this conversation." : progress < 5 ? "I can tell you of more towns if you wish. It'd be best if you learned about all of them, and of the Explorers\n\
 before we continue and embark on our second Blight." : "I'm sure that's all I have to tell you, unless you'd like to\n\
 listen to my ramblings again.")+"\r\n\r\n#b#L0#"+(read[0] == 1 ? "#r#e[READ]#n#k#b " : "")+"History of Ellinia\r\n#L1#"+(read[1] == 1 ? "#r#e[READ]#n#k#b " : "")+"History of Perion\n\
\r\n#L2#"+(read[2] == 1 ? "#r#e[READ]#n#k#b " : "")+"History of Lith Harbor\r\n#L3#"+(read[3] == 1 ? "#r#e[READ]#n#k#b " : "")+"History of Rien"+
        ""+(progress == 4 ? "\r\n#L5#I'm good. Thanks for the information" : "")+"");
        } else if (cm.getQ()===53) {
            cm.sendAcceptDecline("Of course, you'll have to travel to our supply city, #bPerion#k. You've passed by there before, it's nearly savage-like"+
                " since we position almost 0 funds into improving its healthcare. Ask around for the supply-man, you should be able to find"+
            " him, or her.");
        } else if (cm.getQ()===52) {
            cm.sendNext("It's nothing too fancy, I just have to endow you the powers myself. Any commanding officer has the"+
                " power to do so. So, let's begin then, okay?");
        } else if (cm.getQ()===49) {
                (ret === 0 ? cm.sendNext(""+infox[selection]+"") : cm.sendSimple("What else would you like to know?"+
                    "\r\n#b#L0#What is Orbis?\r\n#L1#Who is Agent M?\r\n#L2#How"+
        " long has the explorer and loyalist feud been going on?\r\n#L3#How do we expand our territories?\r\n#L4#How long have you"+
    " been a part of the fight?\r\n\r\n\r\n#l#k#eChoose an option."));               
        } else if (cm.getQ()===48) {
            cm.sendAcceptDecline("Interesting, there seems to be traces of energy that radiate to the caves of #bEl Nath#k and #bLeafre#k."+
                " I'll find the trace myself, as for you, I need you to undergo a diplomatic mission to the #bloyalists#k main city,"+
            " #bOrbis#k, there I need you to talk to one of the top Knights, #bAgent M#k. He's in charge of all foreigns affairs,"+
        " and he holds the position as secretary of state.");
        } else if (cm.getQ()===47) {           
            txt = "There are some doorways nearby #bEllinia#k if you'd like to investigate, and there are some nearby Henesys. Just look around and"+
                " you'll find them. If you find anything interesting, or find any item, just pick it up and return.\r\n";
                for (var i = 0; i < dMaps.length; i++) 
                    txt += "#b\r\n#m"+dMaps[i]+"#";                 
                    cm.sendOk(txt);
                    cm.completeQ();
                    cm.dispose();
        } else if (cm.getQ()===46) {
            if (!cm.canHold(scrolls60[rand])) {
                cm.sendOk("Please make room in your USE, ETC, or EQP before continuing.");
                cm.dispose();
            } else {
            cm.sendOk("Your rewards are ..."+
                "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 85000 exp"+
                "\r\n#fUI/UIWindow.img/QuestIcon/7/0# 25000 meso\r\n#i"+scrolls60[rand]+"#\t#i"+1142109+"#");
            cm.gainItem(skull, -10), cm.gainItem(bone, -50),
                    cm.gainExp(85000), cm.gainMeso(25000), cm.gainItem(1142109), cm.gainItem(scrolls60[rand]), cm.completeQ();
            }
        } else if (cm.getQ()===45) {
            cm.sendNext("What threat? There's something bigger than the #bloyalist#k armies?",2);
        } else if (cm.getQ()===24) {
            cm.sendNext("Great, what is it?",2);
        } else if (cm.getQ()===20) {
            cm.sendAcceptDecline("Now, onto our main issue. We've been sending supplies to our neighboring towns, #bPerion#k and #bHenesys#k, but the supplies seem to"+
                " never arrive. We suspect it's the monsters disrupting our caravans. I need you to clean up some of the monsters there for me. Do you feel"+
            " up to the task?");
        } else if (cm.getQ()===19) {
            sel = selection;
            cm.sendYesNo("Are you sure you want to be a #b"+bj[1][selection]+"#k?");
        } else if (cm.getQ()===17) {
            cm.sendOk("Fantastic! Train on the slimes until you're #r#elevel 10#n#k, then come and see me. If you over level it's fine, I'll"+
                " compensate you when you get back.");
                cm.completeQ();
            cm.dispose();
        } else if (cm.getQ()===22) {
            cm.sendAcceptDecline("However, recently there have been sightings of a smaller infestation growing down near #bEllinia#k. Normally I'd send a new recruit"+
                " in there, but I suppose you can fill in. Our more experienced soldiers are fighting off the #bCygnus#k empire. Are you up for it?");
    }
    } else if (status === 1) {
        if (cm.getQ()===16) {
            cm.sendYesNo("We #bexplorers#k scout surrounding territory and claim the land for ourselves. By doing so we spread our claim over new"+
                " minerals and metals, giving us a claim and advantage over the other nations. Sounds intriguing, right?");
        } else if (cm.getQ()==57) {
            if (cm.getText() == cm.getPlayer().getName()) {
                cm.sendOk("It is done. You are now one of us, one of the mighty commanders who lead our valiant forces to victory.\n\
\r\n\r\n#eTo earn your basic 4th job skills complete the next arc of the storyline by talking to Taeng#n!"+sQuest(10000000,5000000,"We have come so far to be so strong. We are now worthy warriors of the Rebellion. Your mother and father would be so proud\n\
 of what you have done these past events.")+"");
                cm.broadcastServerMessage(""+cm.getPlayer().getName()+" has achieved his or her fourth job! This remarkable achievement is applauded\n\
 throughout Victoria Island and its surrounding satellites.");
                (!cm.getPlayer().isFourth() ? cm.changeJobById(cm.getJobId()+1) : status);
            } else {
                cm.talkGuide("Sign your name correctly! This matter is very important to the Rebellion plight.");
                cm.dispose();
            }
        } else if (cm.getQ()===56) {
            sel = selection;
            if (selection < 5) {
                cm.sendNext(history[0][selection]);
            } else {
                cm.sendOk("That about sums up Victorian history. If you have any further questions, you'll have to search for them on your own."+sQuest(5500000,2000000
            ,"Let's come back at level 120 so that we can receive our next important task.")+"");
            cm.dispose();
            }
        } else if (cm.getQ()===53) {
            cm.sendOk("Great, get the supplies and bring them to me. I'll send them off in a shipment to #bAgent M#k for processing and"+
                " distribution.");
        cm.completeQ(), cm.talkGuide("Let's get the supplies and bring them back to Taeng. We've got a war to fight!"), cm.dispose();
        } else if (cm.getQ()===52) {
            cm.sendOk("As a power of the #bExplorer Tribe#k, I am able to read these mighty commandments which make us #bexplorers#k"+
                " a proud nation of the free and liberated. Through these sacred scriptures I endow upon you the second form of"+
            " blessedness, a form which shall shape your character from here until the third and final stage. You shall be an equal"+
        " comrade, a partner which will guide your fellow brethren through the dark shadows of misty and fury, of betrayal and deceit."+
    " Your cunning will rival that of the goddess #bMu Cheng#k. Your strength will not falter, and your resolve grow in strength "+
" a thousand stone walls. I shall bestow upon you the blessings of a thousand generations, and may your name be a veneration to those"+
" who follow you in your almighty footsteps. May your name collapse into a legend, may it be so famous that it will dissolve into myth"+
", for only the deeds of great people fade into such obscurity.\r\n\r\nBy the power of #bTaeng#k, I endow you the powers of a second"+
" form #bexplorer#k.");
        } else if (cm.getQ()===49) {
            (ret === 0 ? (cm.sendYesNo("Would you like to know something else?"), ret = 1, status = -1) : (cm.sendNext(infox[selection])));
        } else if (cm.getQ()===48) {
            cm.sendOk("Heads to #bOrbis#k and find #bAgent M#k, there you will engage in diplomatic negotiations.");
            cm.talkGuide("Orbis it is! Let's go find this Agent M guy.");
            cm.completeQ();
            cm.dispose();
        } else if (cm.getQ()===45) {
            cm.sendAcceptDecline("Yes, and it's growing rapidly. Monsters in our world used to only reside as side-liners. They've never become"+
                " a major threat until recently, when they attacked a village and killed several citizens. I need you to go in and investigate.");
        } else if (cm.getQ()===24) {
            cm.sendAcceptDecline("Apparently, we've got some loyalist movement forming down at #bSleepywood#k. I need you to go there and meet up with"+
                " our agent. You should be able to find him, it's a small town. I reckon he's near the edges of the town, skulking around"+
            " and digging up information. What do you say, can I trust you?");
        } else if (cm.getQ()===20) {
            cm.sendOk("That's a good chap. I'll need you to show proof that you actually took care of the monsters, so I believe you should bring back some proof. Perhaps you should bring back ..."+
                "\r\n\r\n60 #i"+leaf+"#\r\n40 #i"+cap+"#");
            cm.completeQ();
            cm.dispose();
        } else if (cm.getQ()===22) {
            cm.sendOk("Clear out Horny Mushrooms near #bEllinia#k and bring me back ...\r\n\r\n50 #i"+slime+"#");
            cm.completeQ();
            cm.dispose();
    } else if (cm.getQ()===19) {
        newbb = (cm.getLevel() - 10), newbb *= 3;
            cm.sendOk("You have become a #b"+bj[1][sel]+"#k, congratulations. You have gained #b"+newbb+"#k sp in compensation for overleveling.");
            cm.changeJobById(bj[0][sel]);
            (sel === 1 ? cm.gainSp(6) : status);
            cm.gainSp(newbb);
            cm.getPlayer().resetStats();
            cm.completeQ();
            cm.dispose();
        }
    } else if (status === 2) {
        if (cm.getQ()===16) {
            cm.sendNext("Well, we're always looking for more volunteers, so if you would like to join us just say #b\"yes\"#k");
        } else if (cm.getQ()===56) {
            cm.sendNext(history[1][sel]);
         } else if (cm.getQ()===52) {
            cm.completeQ();
            cm.changeJobById(cm.getJobId() + 1), cm.talkGuide("Congratulations on your new job! I can't believe we've come this far!")
            cm.dispose();
        } else if (cm.getQ()===49) {
            cm.sendYesNo("Would you like to know something else?"), status = -1, ret = 1;
        } else if (cm.getQ()===45) {
            cm.sendNext("Where is this place? Somewhere nearby?",2);
        } else if (cm.getQ()===24) {
            cm.sendOk("Great, just head down to #bSleepywood#k and find our man. He'll brief you on what's necessary.\r\n\r\nOh! And the"+
                " secret code is #e\"Pidgeon\"#n");
            cm.completeQ(), cm.talkGuide("Sleepywood it is then. Do you even know how to get there? I suppose we have to use our world map"+
                "(W), to find it.");
            cm.dispose();
        }
    } else if (status === 3) {
        if (cm.getQ()===16) {
            cm.sendOk("That's my lad! Speak to me again for your next task. Boy this is incredibly exciting."+
                "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 350 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 500 meso");
            cm.talkGuide("Taeng would like to speak with us again.");
            cm.completeQ();
            cm.gainExp(350);
            cm.gainMeso(500);
        } else if (cm.getQ()===56) {
            cm.sendNext(history[2][sel]);
        } else if (cm.getQ()===45) {
            cm.sendNext("They're everywhere my man! Monsters are filling themselves throughout the world as we speak. We have to begin to"+
                " find the source of all this madness. The filling of monsters must mean the crack in our worlds is widening, and that"+
            " the seal placed by #bGuang Xi#k is failing. We've had monster dilemmas before, but not at the rate of this.");
        }
    } else if (status === 4) {
        if (cm.getQ()===45) {
            cm.sendOk("I need you to take a look at an area named #b#m"+skelemap+"##k. There is unusual activity brewing there, the undead"+
                " rising from their graves as if taken over by some unknown spirit. If you could bring me back:\r\n\r\n10 #i"+skull+"#\r\n"+
            "50 #i"+bone+"#\r\n\r\nthat'd be splendid."); 
            cm.completeQ();
            cm.dispose();
        } else if (cm.getQ()===56) {
            if (sel == 3) {
                status = -1;
                read[sel] = 1;
                progress++;
            }
            cm.sendNext(history[3][sel]);
        }
    } else if (status === 5) {
        if (cm.getQ()===56) {
            cm.sendNext(history[4][sel]);
        }
    } else if (status === 6) {
        if (cm.getQ()===56) {
            cm.sendNext(history[5][sel]);
        }
    } else if (status === 7) {
        if (cm.getQ()===56) {
            if (read[sel] == 0) {
                read[sel] = 1;
                progress++;
            }
            cm.sendOk(history[6][sel]);          
            status = -1;
        }
    }
}