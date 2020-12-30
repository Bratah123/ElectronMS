// Lucid Boss
// Script : 3003208


importPackage(Packages.server.items);
importPackage(Packages.tools);
importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);
importPackage(java.awt);
importPackage(Packages.server);
importPackage(Packages.tools.packet);
importPackage(Packages.server.LifeEntity.MobEntity);
importPackage(Packages.server.LifeEntity.NpcEntity);
importPackage(Packages.scripting.EventManager);
importPackage(Packages.server.LifeEntity.MobEntity.BossEntity);
importPackage(Packages.server.LifeEntity.MobEntity.MonsterEntity);
importPackage(Packages.launcher.Utility);
importPackage(Packages.connections.Packets);
importPackage(Packages.connections.Packets.PacketUtility);
importPackage(Packages.connections.Packets.BossPacket);
importPackage(Packages.connections.Packets.PacketUtility.WritingPacket);
importPackage(Packages.server.LifeEntity.MobEntity.BossEntity.ButterFly);
importPackage(Packages.server.LifeEntity.MobEntity.BossEntity.FairyDust);


var status = 0;
var enter = "\r\n";
var allPreqDone = false;
var time = 25; // Time limit
var deathcount = 20; // Death Count
var bossname = "Lucid"; // Boss name
var limit = 3; // Entry limit
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status--;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
		var msg = "#fs11##d<#i2591590# :: #rLucid#k>#d"+enter;
            msg += "<Boss Reward : #i4001915# >"+enter;
		    msg += "<Time Limit : #r"+time+" Mins#k #dDaily entries#k #d: #b"+cm.GetCount(bossname+"c", limit)+" Time#k / #r"+limit+" Times#k>#k"+enter;
            msg += "#d<Death Count :#k #r10 Timnes#k>#k"+enter;
		    msg += "#L0##rI'm moving to kill the boss.#k";
        cm.sendSimple(msg);
    } else if (status == 1) {
        if(!allPreqDone) // jank boolean rn but hey it works???
        {
            for(var i = 0; i < cm.getParty().getMembers().size(); i++)
            {
                var partyMemberNames = cm.getParty().getMembers().get(i).getName();
                var partyMembers = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(partyMemberNames);
                if(partyMembers.getKeyValue("PinkTierUnlock") == null)
                {
                    cm.sendOk("Make sure all your party members have done the Pink Tier Prequest.");
                    return cm.dispose();
                }
                else
                {
                    allPreqDone = true;
                }
            }
		}
        if (cm.getPlayerCount(450004150) > 0 || cm.getPlayerCount(450004250) > 0) {
            cm.sendOk("Someone is already challenging Lucid.\r\nPlease try another channel.");
            cm.dispose();
        } else if (cm.getPlayer().getParty() == null) {
            cm.sendOk("This place is dangerous.\r\nPlease try to create a party.");
            cm.dispose();
        } else if (!cm.isLeader()) {
            cm.sendOk("Only the party leader can apply for admission.");
            cm.dispose();
        } else if (!cm.allMembersHere()) {
            cm.sendOk("All party members must gather here to enter.");
            cm.dispose();
        } else {
            	var it = cm.getClient().getChannelServer().getPartyMembers(cm.getParty()).iterator();
            	var countPass = true;
            	while (it.hasNext()) {
                	var chr = it.next();
                	if (!CC(chr, bossname+"c", limit)) {
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
			var msg = cm.getPlayer().getName()+"'S party is challenging Lucid!";
			WorldBroadcasting.broadcastMessage(MainPacketCreator.serverNotice(6, msg));
            		cm.resetMap(450004150);
            		cm.resetMap(450004250);
                    em = cm.getEventManager("Lucid");
                    eim = em.readyInstance();
                    eim.setProperty("Stage", "0");
			eim.setProperty("DeathCount", deathcount);
                    eim.setProperty("nextWarp", "false");
                    eim.setProperty("Global_MinPerson", cm.getParty().getMembers().size());
                	eim.startEventTimer(60000 * time);
                    eim.registerParty(cm.getParty(), cm.getMap());

                    
        }
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

                