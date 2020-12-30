importPackage(java.io);
importPackage(java.awt);
importPackage(java.sql);
importPackage(java.util);
importPackage(java.lang);
importPackage(Packages.tools);
importPackage(Packages.server);
importPackage(Packages.server.life);
importPackage(Packages.launch.world);
importPackage(Packages.tools.packet);
importPackage(Packages.packet.creators);
importPackage(Packages.client.items);
importPackage(Packages.server.items);

var bossname = "Zakum" // In Hangul
var bossname2 = "Chaos Zakum" // In hangul
var limit = 4; // Number of admissions allowed per day
var limit2 = 5; // Number of admissions allowed per dar
var allPreqDone = false;

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
                var rute = "#e<Boss: Zakum>#i4001899##k#l#n\r\n";
                rute += "Zakum is resurrected. If you leave it as it is, it will erupt a volcano and turn the entire El Nath mountains into hell.\r\n\r\n";
                rute += "#L11##bMove to (Hard Mode).#k  #d"+cm.GetCount(bossname2+"c", limit2)+" Time#k / #r"+limit2+" Times#k \r\n";
                cm.sendSimple(rute);

        }  else if (selection == 11) {
        if(!allPreqDone) // jank boolean rn but hey it works???
        {
            for(var i = 0; i < cm.getParty().getMembers().size(); i++)
            {
                var partyMemberNames = cm.getParty().getMembers().get(i).getName();
                var partyMembers = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(partyMemberNames);
                if(partyMembers.getKeyValue("GreenTierUnlock") == null)
                {
                    cm.sendOk("Make sure all your party members have done the Green Tier Prequest.");
                    return cm.dispose();
                }
                else
                {
                    allPreqDone = true;
                }
            }
        }
        if (cm.getPlayer().getParty() == null) {
            cm.playerMessage(5, "The party does not exist. Create a party and come back.");
            cm.dispose();
            return;
            }
        if(!cm.CountCheck(bossname2+"c", limit2)) {
		cm.sendOk("Per day "+limit2+" Only one time.");
		cm.dispose();
		return;
            }
            if (!cm.allMembersHere()) {
                cm.playerMessage(5, "Party members are not in the same place.");
                cm.dispose();
                return;
            }
            if (!cm.isLeader()) {
                cm.playerMessage(5, "Only party leader can apply for admission.");
                cm.dispose();
                return;
            }
            if (cm.getPlayerCount(280030000) > 0) {
	        cm.sendOk("Already another user #rChaos Zakum#kIs killing.");
	        cm.dispose();
	        return;
            }
	    var it = cm.getClient().getChannelServer().getPartyMembers(cm.getParty()).iterator();
            	var countPass = true;
            	while (it.hasNext()) {
                	var chr = it.next();
                	if (!CC(chr, bossname2+"c", limit2)) {
                    		countPass = false;
                    		break;
                	}
            	}
            	if (!countPass) {
                	cm.sendOk("There are some party members who have no dungeon entry.");
                	cm.dispose();
                	return;
            	} else {
            	var it = cm.getClient().getChannelServer().getPartyMembers(cm.getParty()).iterator();
            	var countPass = true;
            	while (it.hasNext()) {
                	var chr = it.next();
			AC(chr, bossname2+"c");
            	}
	}
	var em = cm.getEventManager("hboss");
	var eim = em.readyInstance();

        
	cm.resetMap(280030000);
	cm.allPartyWarp(280030000,true);
    cm.getMap().spawnChaosZakum(-10, 86);
        
    eim.setProperty("Leader", cm.getPlayer().getParty().getLeader().getName());

	cm.dispose();
        
      }
    }
    function isPartyLeader() {
	if (cm.getPlayer().getParty().getLeader().getId() == cm.getPlayer().getId())
		return true;
	else
		return false;
    }
    function AC(player, boss) {
	player.setDateKey(boss, Integer.parseInt(player.getDateKey(boss, false)) + 1, false);
    }
    function CC(player, boss, limit) {    
        if (player.getDateKey(boss, false) == null)
            player.setDateKey(boss, "0", false);
        return Integer.parseInt(player.getDateKey(boss, false)) < limit;
    }
}