// Chaos Horntail
// Script : 9000325


importPackage(Packages.client.items);
importPackage(Packages.constants);
importPackage(Packages.server.items);
importPackage(Packages.tools);
importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);
importPackage(java.awt);
importPackage(Packages.server);
importPackage(Packages.tools.packet);
importPackage(Packages.server.life);

var status = -1;
var bossname = "Chaos Horntail"; // Boss name
var startmap2 = 240060201;// Chaos Horntail Map
var x = 71;// x position
var y = 260;// y position
var limit1 = 5;
var enter = "\r\n";
var allPreqDone = false;

function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

 	if (status == 0) {
		var msg = "#fs11##d<#i2041200# :: #r Horntail #k>#d"+enter;
        msg += "<Boss Reward : #i4001897#>"+enter;
        msg += "#d<Death Count :#k #r10 Times#k>#k"+enter;
		msg += "#L1#<Chaos> I'm moving to kill the boss. #b<"+cm.GetCount(bossname+"c", limit1)+"#k/#r"+limit1+"#k>#k\r\n";
		cm.sendSimple(msg);
	} else if (status == 1) {
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
			cm.sendOk("Have a party and challenge.");
			cm.dispose();
			return;
		}
		if (!isPartyLeader()) {
			cm.sendOk("You cannot apply if you are not the party leader.");
			cm.dispose();
			return;
		}
            	if (!cm.allMembersHere()) {
                	cm.sendOk("All party members should be here.");
			cm.dispose();
                	return;
            	}
		if (selection == 1) {
		if(!cm.CountCheck(bossname+"c", limit1)) {
			cm.sendOk("Per day "+limit1+"Only one time.");
			cm.dispose();
			return;
		}
		if (cm.getPlayerCount(startmap2) > 0) {
            		cm.sendOk("Someone is already challenging.\r\n#bPlease try another channel.#k");
            		cm.dispose();
			return;
        	}
            	var it = cm.getClient().getChannelServer().getPartyMembers(cm.getParty()).iterator();
            	var countPass = true;
            	while (it.hasNext()) {
                	var chr = it.next();
                	if (!CC(chr, bossname+"c", limit1)) {
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
			AC(chr, bossname+"c");
            	}
		}
			cm.resetMap(startmap2);
			cm.allPartyWarp(startmap2,true);
 			cm.spawnMob(8810122,x,y);
 			cm.spawnMob(8810102,x,y);
 			cm.spawnMob(8810103,x,y);
 			cm.spawnMob(8810104,x,y);
 			cm.spawnMob(8810105,x,y);
 			cm.spawnMob(8810106,x,y);
 			cm.spawnMob(8810107,x,y);
 			cm.spawnMob(8810108,x,y);
			cm.spawnMob(8810109,x,y);
		}
 		cm.changeMusic("Bgm14/HonTale");
 		cm.dispose();
}

}

function AC(player, boss) {
	player.setDateKey(boss, Integer.parseInt(player.getDateKey(boss, false)) + 1, false);
}

function CC(player, boss, limit) {
    if (player.getDateKey(boss, false) == null)
      player.setDateKey(boss, "0", false);
    return Integer.parseInt(player.getDateKey(boss, false)) < limit;
}
function isPartyLeader() {
	if (cm.getPlayer().getParty().getLeader().getId() == cm.getPlayer().getId())
		return true;
	else
		return false;
}