
function start() {
	cm.sendOk("What.");
	cm.dispose();
}
// 미나르 : 무기합성
function chat_message3( integer index, string makeItem, string needItem, integer reqLevel ) {
    inventory = target.inventory;

    nRet = self.askYesNo( "Para fazer um " + makeItem + "com o estimulador, voc?precisar?dos seguintes itens. O N?el Limite ser?" + reqLevel + ". Se o estimulador for usado, a op豫o de item pode ser toda incrementada, mas #bela tamb? pode sair pior do que estava antes, al? de carregar uma chance de falha de 10%, ent?, por favor, tenha cuidado#k. O que voc?acha? Voc?quer faz?lo?\r\n\r\n#b" + needItem );
    if ( nRet == 0 ) self.say( "Eu entendo. Usar o estimulador significa um poss?el risco de destruir a arma. Eu tomaria cuidado tamb?, mas, se mudar de id?a, sinta-se ?vontade." );
    else {
        sProp = random( 1, 10 );
        if ( sProp == 1 ) {
            // Warrior 무기 제작 실패
            if ( index == 0 ) ret = inventory.exchange( 0, 4130002, -1, 1302056, -1, 4000244, -20, 4000245, -25, 4005000, -8);
            else if ( index == 1 ) ret = inventory.exchange( 0, 4130003, -1, 1312030, -1, 4000244, -20, 4000245, -25, 4005000, -8);
            else if ( index == 2 ) ret = inventory.exchange( 0, 4130004, -1, 1322045, -1, 4000244, -20, 4000245, -25, 4005000, -8);
            else if ( index == 3 ) ret = inventory.exchange( 0, 4130005, -1, 1402035, -1, 4000244, -20, 4000245, -25, 4005000, -8);
            else if ( index == 4 ) ret = inventory.exchange( 0, 4130006, -1, 1412021, -1, 4000244, -20, 4000245, -25, 4005000, -8);
            else if ( index == 5 ) ret = inventory.exchange( 0, 4130007, -1, 1422027, -1, 4000244, -20, 4000245, -25, 4005000, -8);
            else if ( index == 6 ) ret = inventory.exchange( 0, 4130008, -1, 1432030, -1, 4000244, -20, 4000245, -25, 4005000, -8);
            else if ( index == 7 ) ret = inventory.exchange( 0, 4130009, -1, 1442044, -1, 4000244, -20, 4000245, -25, 4005000, -8);

            // Magician 무기 제작 실패
            else if ( index == 100 ) ret = inventory.exchange( 0, 4130010, -1, 1372010, -1, 4000244, -20, 4000245, -25, 4005001, -6, 4005003, -2);
            else if ( index == 101 ) ret = inventory.exchange( 0, 4130011, -1, 1382035, -1, 4000244, -20, 4000245, -25, 4005001, -6, 4005003, -2);

            // Bowman 무기 제작 실패
            else if ( index == 200 ) ret = inventory.exchange( 0, 4130012, -1, 1452019, -1, 4000244, -20, 4000245, -25, 4005000, -3, 4005002, -5);
            else if ( index == 201 ) ret = inventory.exchange( 0, 4130013, -1, 1462015, -1, 4000244, -20, 4000245, -25, 4005000, -5, 4005002, -3);

            // Thief 무기 제작 실패
            else if ( index == 300 ) ret = inventory.exchange( 0, 4130014, -1, 1332051, -1, 4000244, -20, 4000245, -25, 4005000, -5, 4005002, -3);
            else if ( index == 301 ) ret = inventory.exchange( 0, 4130014, -1, 1332052, -1, 4000244, -20, 4000245, -25, 4005002, -3, 4005003, -5);
            else if ( index == 302 ) ret = inventory.exchange( 0, 4130015, -1, 1472053, -1, 4000244, -20, 4000245, -25, 4005002, -2, 4005003, -6);

            if ( ret == 0 ) self.say( "Verifique se voc?tem todos os itens necess?ios, ou se o seu invent?io de equip. possui slots livres." );
            else self.say( "Ah, n?... Eu devo ter entendido a porcentagem do estimulador toda errada. Todos os itens se foram agora... Me desculpe. Eu te avisei sobre a possibilidade de isso acontecer e fiquei aqui esperando que voc?entendesse. Novamente, eu sinto muito." );
        }
        else {
            // Warrior무기 제작 성공
            if ( index == 0 ) ret = inventory.exchangeEx( -120000, "4130002", -1, "1302056", -1,  "4000244", -20, "4000245", -25, "4005000", -8, "1302059,Variation:1", 1 );
            else if ( index == 1 ) ret = inventory.exchangeEx( -120000, "4130003", -1, "1312030", -1,  "4000244", -20, "4000245", -25, "4005000", -8, "1312031,Variation:1", 1 );
            else if ( index == 2 ) ret = inventory.exchangeEx( -120000, "4130004", -1, "1322045", -1,  "4000244", -20, "4000245", -25, "4005000", -8, "1322052,Variation:1", 1 );
            else if ( index == 3 ) ret = inventory.exchangeEx( -120000, "4130005", -1, "1402035", -1,  "4000244", -20, "4000245", -25, "4005000", -8, "1402036,Variation:1", 1 );
            else if ( index == 4 ) ret = inventory.exchangeEx( -120000, "4130006", -1, "1412021", -1, "4000244", -20, "4000245", -25, "4005000", -8, "1412026,Variation:1", 1 );
            else if ( index == 5 ) ret = inventory.exchangeEx( -120000, "4130007", -1, "1422027", -1,  "4000244", -20, "4000245", -25, "4005000", -8, "1422028,Variation:1", 1 );
            else if ( index == 6 ) ret = inventory.exchangeEx( -120000, "4130008", -1, "1432030", -1,  "4000244", -20, "4000245", -25, "4005000", -8, "1432038,Variation:1", 1 );
            else if ( index == 7 ) ret = inventory.exchangeEx( -120000, "4130009", -1, "1442044", -1,  "4000244", -20, "4000245", -25, "4005000", -8, "1442045,Variation:1", 1 );

            // Magician 무기 제작 성공
            else if ( index == 100 ) ret = inventory.exchangeEx( -120000, "4130010", -1, "1372010", -1, "4000244", -20, "4000245", -25, "4005001", -6, "4005003", -2, "1372032,Variation:1", 1 );
            else if ( index == 101 ) ret = inventory.exchangeEx( -120000, "4130011", -1, "1382035", -1, "4000244", -20, "4000245", -25, "4005001", -6, "4005003", -2, "1382036,Variation:1", 1 );

            // Bowman 무기 제작 성공
            else if ( index == 200 ) ret = inventory.exchangeEx( -120000, "4130012", -1, "1452019", -1, "4000244", -20, "4000245", -25, "4005000", -3, "4005002", -5,  "1452044,Variation:1", 1 );
            else if ( index == 201 ) ret = inventory.exchangeEx( -120000, "4130013", -1, "1462015", -1, "4000244", -20, "4000245", -25, "4005000", -5, "4005002", -3,  "1462039,Variation:1", 1 );

            // Thief 무기 제작 성공
            else if ( index == 300 ) ret = inventory.exchangeEx( -120000, "4130014", -1, "1332051", -1,  "4000244", -20, "4000245", -25, "4005000", -5, "4005002", -3,  "1332049,Variation:1", 1 );
            else if ( index == 301 ) ret = inventory.exchangeEx( -120000, "4130014", -1, "1332052", -1,  "4000244", -20, "4000245", -25, "4005002", -3, "4005003", -5,  "1332050,Variation:1", 1 );
            else if ( index == 302 ) ret = inventory.exchangeEx( -120000, "4130015", -1, "1472053", -1,  "4000244", -20, "4000245", -25, "4005002", -2, "4005003", -6,  "1472051,Variation:1", 1 );

            if ( ret == 0 ) self.say( "Verifique se voc?tem todos os itens necess?ios, ou se o seu invent?io de equipamento possui slots livres." );
            else self.say( "Ok, aqui est? ?seu. " + makeItem + ". Ainda bem que a arma n? foi destru?a durante o processo. Com certeza isso ajudou a aperfei?ar sua arma. Agora, quando quiser aperfei?ar sua arma, voc?sabe a quem visitar~~" );
        }
    }
}

function chat_message4( integer index, string makeItem, string needItem, integer reqLevel ) {
    inventory = target.inventory;

    nRet = self.askYesNo( "Para fazer um " + makeItem + "com o estimulador, voc?precisar?dos seguintes itens. O N?el Limite ser?" + reqLevel + ". Se o estimulador for usado, a op豫o de item pode ser toda incrementada, mas #bela tamb? pode sair pior do que estava antes, al? de carregar uma chance de falha de 10%, ent?, por favor, tenha cuidado#k. O que voc?acha? Voc?quer faz?lo?\r\n\r\n#b" + needItem );
    if ( nRet == 0 ) self.say( "Entendo. Eu entendo que voc?queira partir agora, mas, se precisa de ajuda com as armas, por favor, venha me ver~ Eu estarei aqui de qualquer forma." );
    else {
        // Warrior 무기
        if ( index == 0 ) ret = inventory.exchange( -120000, 1302056, -1, 4000244, -20, 4000245, -25, 4005000, -8, 1302059, 1);
        else if ( index == 1 ) ret = inventory.exchange( -120000, 1312030, -1, 4000244, -20, 4000245, -25, 4005000, -8, 1312031, 1);
        else if ( index == 2 ) ret = inventory.exchange( -120000, 1322045, -1, 4000244, -20, 4000245, -25, 4005000, -8, 1322052, 1);
        else if ( index == 3 ) ret = inventory.exchange( -120000, 1402035, -1, 4000244, -20, 4000245, -25, 4005000, -8, 1402036, 1);
        else if ( index == 4 ) ret = inventory.exchange( -120000, 1412021, -1, 4000244, -20, 4000245, -25, 4005000, -8, 1412026, 1);
        else if ( index == 5 ) ret = inventory.exchange( -120000, 1422027, -1, 4000244, -20, 4000245, -25, 4005000, -8, 1422028, 1);
        else if ( index == 6 ) ret = inventory.exchange( -120000, 1432030, -1, 4000244, -20, 4000245, -25, 4005000, -8, 1432038, 1);
        else if ( index == 7 ) ret = inventory.exchange( -120000, 1442044, -1, 4000244, -20, 4000245, -25, 4005000, -8, 1442045, 1);
        // Magician 무기 제작
        else if ( index == 100 ) ret = inventory.exchange( -120000, 1372010, -1, 4000244, -20, 4000245, -25, 4005001, -6, 4005003, -2, 1372032, 1);
        else if ( index == 101 ) ret = inventory.exchange( -120000, 1382035, -1, 4000244, -20, 4000245, -25, 4005001, -6, 4005003, -2, 1382036, 1);
        // Bowman 무기 제작
        else if ( index == 200 ) ret = inventory.exchange( -120000, 1452019, -1, 4000244, -20, 4000245, -25, 4005000, -3, 4005002, -5, 1452044, 1);
        else if ( index == 201 ) ret = inventory.exchange( -120000, 1462015, -1, 4000244, -20, 4000245, -25, 4005000, -5, 4005002, -3, 1462039, 1);
        // Thief 무기 제작
        else if ( index == 300 ) ret = inventory.exchange( -120000, 1332051, -1, 4000244, -20, 4000245, -25, 4005000, -5, 4005002, -3, 1332049, 1);
        else if ( index == 301 ) ret = inventory.exchange( -120000, 1332052, -1, 4000244, -20, 4000245, -25, 4005002, -3, 4005003, -5, 1332050, 1);
        else if ( index == 302 ) ret = inventory.exchange( -120000, 1472053, -1, 4000244, -20, 4000245, -25, 4005002, -2, 4005003, -6, 1472051, 1);

        if ( ret == 0 ) self.say( "Verifique se voc?tem todos os itens necess?ios, ou se o seu invent?io de equip. possui slots livres." );
        else self.say( "Aqui, ?seu. " + makeItem + ". Eu acho que me sai muito bem, especialmente beeeeeeem aqui. Eu espero que voc?esteja #Gsatisfeito:satisfeita# com o resultado. Se voc?quiser aperfei?ar outra arma mais tarde, por favor, volte para me ver~" );
    }
}

script "minar_weapon" {
//    qr = target.questRecord;
    inven = target.inventory;
//    if ( qr.getState( 7301 ) == 1 or qr.getState( 7303 ) == 1 ) {
    if ( inven.itemCount( 4001079 ) > 0 ) {
        if ( inven.itemCount( 4001078 ) < 1 ) {
            ret = self.askYesNo( "Humm... Parece que voc?deseja algo de mim. O que ?" );
            if( ret == 0 ) self.say( "Opa! Talvez eu tenha errado." );
            else {
                val = self.askYesNo( "Voc?precisa de #b#t4001078##k? Bem, a ?ica maneira de fazer #b#t4001078##k seria modificar #b#t4001079##k. Para modificar #b#t4001079##k precisarei dos seguintes itens. Voc?deseja modific?lo?\r\n#b#v4001079# #t4001079# \r\n#v4011001# 1 #t4011001#s\r\n#v4011002# 1 #t4011002#s" );
                if ( val == 0 ) {
                    self.say( "Se mudar de id?a, ?s?me falar." );
                    end;
                } else {
                    if ( inven.itemCount( 4001078 ) < 1 ) {
                        ret = inven.exchange( 0, 4001079, -1, 4011001, -1, 4011002, -1, 4001078, 1 );
                        if ( ret == 0 ) self.say( "Por favor, verifique se voc?tem todos os itens prontos, ou se seu invent?io de etc. tem espa? suficiente." );
                        else {
                            self.say( "O que voc?acha? Como se fosse novo, n? Se voc?perd?lo, ou quiser fazer outro novo, sabe onde me achar~" );
                            end;
                        }
                    } else {
                        self.say( "Eu acho que voc?j?tem um #b#t4001078##k." );
                        end;
                    }
                }
            }
        }
    }

    nRet1 = self.askYesNo( "Ol? Se tiver interesse em aperfei?ar sua arma, voc?com certeza veio ao lugar certo! Sou o melhor armeiro desta grande cidade de Leafre. Certo, o que voc?acha de uma arma que cont? o incr?el poder do drag?? O que voc?acha?" );
    if ( nRet1 == 0 ) self.say( "Eu sou a ?ica pessoa que pode criar uma arma que cont? o incr?el poder do drag?. Me avise se voc?mudar de id?a." );
    else {
        v1 = self.askMenu( "Certo. Com uma pequena taxa, eu vou criar uma maravilhosa arma para voc? e, dentro dela, o incr?el poder do drag?.\r\n#b#L0# O que ?um estimulador?#l\r\n#b#L1# Criar uma arma de Guerreiro usando o estimulador#l\r\n#b#L2# Criar uma arma de M?ico usando o estimulador#l\r\n#b#L3# Criar uma arma de Arqueiro usando o estimulador#l\r\n#b#L4# Criar uma arma de Gatuno usando o estimulador#l\r\n\r\n#b#L5# Criar uma arma normal de Guerreiro#l\r\n#b#L6# Criar uma arma normal de M?ico#l\r\n#b#L7# Criar uma arma normal de Arqueiro#l\r\n#b#L8# Criar uma arma normal de Gatuno#l" );;
        if ( v1 == 0 ) {
            self.say( "Em Leafre, voc?pode aperfei?ar ainda mais sua arma usando o estimulador. Tudo bem, mas o que ?o #restimulador#k? ?uma po豫o misteriosa que est?inclusa no processo de cria豫o de uma arma, e, ap? ser usada, a arma ser?criada com uma op豫o de leve incrementa豫o da arma, como se voc?a tivesse recebido de um monstro. O estimulador pode ent? ser usado n? apenas em armas, mas tamb? em outros itens. Certifique-se de carregar muitos deles com voc? pois h?tipos diferentes de estimuladores dispon?eis para diferentes tipos de armas." );
            self.say( "Mas voc?deve estar ciente de algumas coisinhas. Se o estimulador for usado, ?muito prov?el que a op豫o de item seja alterada, e o problema com isso ?que o resultado pode #bacabar sendo pior#k, bem pior do que a original. Voc?tamb? correr?o risco de uma taxa de #b10% de fracasso ao criar o item#k, o que significa que voc?perder?os itens que usou para criar o item em quest?. Bem perigoso, n? ?" );
            self.say( "At?mesmo com esses riscos relacionados, muitos viajantes procuram minha ajuda para criar uma arma perfeita usando o estimulador. O pensamento quanto ao item ser de m?qualidade, ficar pior do que era ou at?desaparecer pode assustar voc? mas que tal tentar mesmo assim? Se voc?tiver sorte, o seu item pode ser uma maravilha. Isso ?tudo o que posso lhe dizer." );
        }
        else if ( v1 == 1 ) {
            v2 = self.askMenu( "Em quais dessas armas para Guerreiros voc?gostaria de usar o estimulador?\r\n#L0##b #t1302059##k(N?el Limite: 110, Guerreiro)#l\r\n#L1##b #t1312031##k(N?el Limite: 110, Guerreiro)#l\r\n#L2##b #t1322052##k(N?el Limite: 110, Guerreiro)#l\r\n#L3##b #t1402036##k(N?el Limite: 110, Guerreiro)#l\r\n#L4##b #t1412026##k(N?el Limite 110, Guerreiro)#l\r\n#L5##b #t1422028##k(N?el Limite 110, Guerreiro)#l\r\n#L6##b #t1432038##k(N?el Limite 110, Guerreiro)#l\r\n#L7##b #t1442045##k(N?el Limite 110, Guerreiro)#l" );
            if ( v2 == 0 ) chat_message3( 0, "#t1302059#", "#v4130002# 1 #t4130002#\r\n#v1302056# 1 #t1302056#\r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 1 ) chat_message3( 1, "#t1312031#", "#v4130003# 1 #t4130003#\r\n#v1312030# 1 #t1312030#\r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 2 ) chat_message3( 2, "#t1322052#", "#v4130004# 1 #t4130004#\r\n#v1322045# 1 #t1322045#\r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 3 ) chat_message3( 3, "#t1402036#", "#v4130005# 1 #t4130005#\r\n#v1402035# 1 #t1402035#\r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 4 ) chat_message3( 4, "#t1412026#", "#v4130006# 1 #t4130006#\r\n#v1412021# 1 #t1412021#\r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 5 ) chat_message3( 5, "#t1422028#", "#v4130007# 1 #t4130007#\r\n#v1422027# 1 #t1422027#\r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 6 ) chat_message3( 6, "#t1432038#", "#v4130008# 1 #t4130008#\r\n#v1432030# 1 #t1432030#\r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 7 ) chat_message3( 7, "#t1442045#", "#v4130009# 1 #t4130009#\r\n#v1442044# 1 #t1442044#\r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
        }
        else if ( v1 == 2 ) {
            v2 = self.askMenu( "Em quais dessas armas para M?icos voc?gostaria de usar o estimulador?\r\n#L0##b #t1372032##k(N?el Limite: 108, M?ico)#l\r\n#L1##b #t1382036##k(N?el Limite: 110, M?ico)#l" );
            if ( v2 == 0 ) chat_message3( 100, "#t1372032#", "#v4130010# 1 #t4130010# \r\n#v1372010# 1 #t1372010# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005001# 6 #t4005001#s\r\n#v4005003# 2 #t4005003#s\r\n#v4031138# 120000 mesos", 108 );
            else if ( v2 == 1 ) chat_message3( 101, "#t1382036#", "#v4130011# 1 #t4130011# \r\n#v1382035# 1 #t1382035# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005001# 6 #t4005001#s\r\n#v4005003# 2 #t4005003#s\r\n#v4031138# 120000 mesos", 110 );
        }
        else if ( v1 == 3 ) {
            v2 = self.askMenu( "Em quais dessas armas para Arqueiros voc?gostaria de usar o estimulador?\r\n#L0##b #t1452044##k(N?el Limite: 110, Arqueiro)#l\r\n#L1##b #t1462039##k(N?el Limite: 110, Arqueiro)#l" );
            if ( v2 == 0 ) chat_message3( 200, "#t1452044#", "#v4130012# 1 #t4130012# \r\n#v1452019# 1 #t1452019# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 3 #t4005000#s\r\n#v4005002# 5 #t4005002#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 1 ) chat_message3( 201, "#t1462039#", "#v4130013# 1 #t4130013# \r\n#v1462015# 1 #t1462015# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 5 #t4005000#s\r\n#v4005002# 3 #t4005002#s\r\n#v4031138# 120000 mesos", 110 );
        }
        else if ( v1 == 4 ) {
            v2 = self.askMenu( "Em quais dessas armas para Gatunos voc?gostaria de usar o estimulador?\r\n#L0##b #t1332049##k(N?el Limite: 110, Gatuno)#l\r\n#L1##b #t1332050##k(N?el Limite: 110, Gatuno)#l\r\n#L2##b #t1472051##k(N?el Limite : 110, Gatuno)#l" );
            if ( v2 == 0 ) chat_message3( 300, "#t1332049#", "#v4130014# #t4130014# \r\n#v1332051# #t1332051# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 5 #t4005000#s\r\n#v4005002# 3 #t4005002#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 1 ) chat_message3( 301, "#t1332050#", "#v4130014# 1 #t4130014# \r\n#v1332052# 1 #t1332052# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005002# 3 #t4005002#s\r\n#v4005003# 5 #t4005003#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 2 ) chat_message3( 302, "#t1472051#", "#v4130015# 1 #t4130015# \r\n#v1472053# 1 #t1472053# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005002# 2 #t4005002#s\r\n#v4005003# 6 #t4005003#s\r\n#v4031138# 120000 mesos", 110 );
        }
        else if ( v1 == 5 ) {
            v2 = self.askMenu( "Ent? voc?est?#Gdisposto:disposta# a aperfei?ar sua arma de Guerreiro, certo? J?que isso n? envolve estimuladores, sua arma n? correr?riscos de ser destru?a no processo. Al? do que, como resultado, a efici?cia geral da arma ser?aumentada. Por favor, escolha o item que voc?gostaria de criar~\r\n#L0##b #t1302059##k(Limite do N?el : 110, Guerreiro)#l\r\n#L1##b #t1312031##k(N?el Limite : 110, Guerreiro)#l\r\n#L2##b #t1322052##k(N?el Limite: 110, Guerreiro)#l\r\n#L3##b #t1402036##k(N?el Limite: 110, Guerreiro)#l\r\n#L4##b #t1412026##k(N?el Limite 110, Guerreiro)#l\r\n#L5##b #t1422028##k(N?el Limite 110, Guerreiro)#l\r\n#L6##b #t1432038##k(N?el Limite 110, Guerreiro)#l\r\n#L7##b #t1442045##k(N?el Limite 110, Guerreiro)#l" );
            if ( v2 == 0 ) chat_message4( 0, "#t1302059#", "#v1302056# #t1302056# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 1 ) chat_message4( 1, "#t1312031#", "#v1312030# 1 #t1312030# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 2 ) chat_message4( 2, "#t1322052#", "#v1322045# 1 #t1322045# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 3 ) chat_message4( 3, "#t1402036#", "#v1402035# 1 #t1402035# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 4 ) chat_message4( 4, "#t1412026#", "#v1412021# 1 #t1412021# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 5 ) chat_message4( 5, "#t1422028#", "#v1422027# 1 #t1422027# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 6 ) chat_message4( 6, "#t1432038#", "#v1432030# 1 #t1432030# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 7 ) chat_message4( 7, "#t1442045#", "#v1442044# 1 #t1442044# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 8 #t4005000#s\r\n#v4031138# 120000 mesos", 110 );
        }
        else if ( v1 == 6 ) {
            v2 = self.askMenu( "Ent? voc?est?#Gdisposto:disposta# a aperfei?ar sua arma de M?ico, certo? J?que isso n? envolve estimuladores, sua arma n? correr?riscos de ser destru?a no processo. Al? do que, como resultado, a efici?cia geral da arma ser?aumentada. Por favor, escolha o item que voc?gostaria de criar~\r\n#L0##b #t1372032##k(Limite do N?el: 108, M?ico)#l\r\n#L1##b #t1382036##k(N?el Limite: 110, M?ico)#l" );
            if ( v2 == 0 ) chat_message4( 100, "#t1372032#", "#v1372010# 1 #t1372010# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005001# 6 #t4005001#s\r\n#v4005003# 2 #t4005003#s\r\n#v4031138# 120000 mesos", 108 );
            else if ( v2 == 1 ) chat_message4( 101, "#t1382036#", "#v1382035# 1 #t1382035# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005001# 6 #t4005001#s\r\n#v4005003# 2 #t4005003#s\r\n#v4031138# 120000 mesos", 110 );
        }
        else if ( v1 == 7 ) {
            v2 = self.askMenu( "Ent? voc?est?#Gdisposto:disposta# a aperfei?ar sua arma de Arqueiro, certo? J?que isso n? envolve estimuladores, sua arma n? correr?riscos de ser destru?a no processo. Al? do que, como resultado, a efici?cia geral da arma ser?aumentada. Por favor, escolha o item que voc?gostaria de criar~\r\n#L0##b #t1452044##k(Limite do N?el: 110, Arqueiro)#l\r\n#L1##b #t1462039##k(N?el Limite: 110, Arqueiro)#l" );
            if ( v2 == 0 ) chat_message4( 200, "#t1452044#", "#v1452019# 1 #t1452019# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 3 #t4005000#s\r\n#v4005002# 5 #t4005002#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 1 ) chat_message4( 201, "#t1462039#", "#v1462015# 1 #t1462015# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 5 #t4005000#s\r\n#v4005002# 3 #t4005002#s\r\n#v4031138# 120000 mesos", 110 );
        }
        else if ( v1 == 8 ) {
            v2 = self.askMenu( "Ent? voc?est?#Gdisposto:disposta# a aperfei?ar sua arma de Gatuno, certo? J?que isso n? envolve estimuladores, sua arma n? correr?riscos de ser destru?a no processo. Al? do que, como resultado, a efici?cia geral da arma ser?aumentada. Por favor, escolha o item que voc?gostaria de criar~\r\n#L0##b #t1332049##k(Limite do N?el: 110, Gatuno)#l\r\n#L1##b #t1332050##k(N?el Limite: 110, Gatuno)#l\r\n#L2##b #t1472051##k(N?el Limite: 110, Gatuno)#l" );
            if ( v2 == 0 ) chat_message4( 300, "#t1332049#", "#v1332051# #t1332051# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005000# 5 #t4005000#s\r\n#v4005002# 3 #t4005002#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 1 ) chat_message4( 301, "#t1332050#", "#v1332052# 1 #t1332052# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005002# 3 #t4005002#s\r\n#v4005003# 5 #t4005003#s\r\n#v4031138# 120000 mesos", 110 );
            else if ( v2 == 2 ) chat_message4( 302, "#t1472051#", "#v1472053# 1 #t1472053# \r\n#v4000244# 20 #t4000244#s\r\n#v4000245# 25 #t4000245#s\r\n#v4005002# 2 #t4005002#s\r\n#v4005003# 6 #t4005003#s\r\n#v4031138# 120000 mesos", 110 );
        }
    }
}  