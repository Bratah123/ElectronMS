// Cubing NPC
// 3003500
// NPC next to the cat lady in lobby
// @author Brandon aka Not Brandon#9025 aka twitter.com/BratahFGC

importPackage(Packages.constants);
importPackage(Packages.client.items);
importPackage(java.util);
importPackage(Packages.client.ItemInventory.Inventory);
importPackage(Packages.client);
importPackage(Packages.server.Items);
importPackage(Packages.constants);
importPackage(Packages.LauncherHandlers);
importPackage(Packages.connections.Packets);
importPackage(Packages.tools);
importPackage(Packages.tools.RandomStream);
importPackage(Packages.constants);

var status = -1;
var redCube = 5062009;
var bonusCube = 5062500;
var state = 0;
var bagIndex;
var equipment;


function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) 
{

    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }

    if (status == 0) {
		var itemSel = "This is the #bDonor Cubing NPC#k, please select the item you would like to cube.\r\n\r\n#b"
		cm.sendSimple(itemSel + cm.EquipListVertical(cm.getChar().getClient()));
	}		
	if(status == 1)
	{
		bagIndex = selection;
		equipment = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(bagIndex);
		var cubeSelDiag = "Which cube would you like to use?\r\n#rCOST: 1 Cube and 150(RED CUBE)/300(BONUS CUBE) DP\r\n#k";
		cubeSelDiag += "#L" + bagIndex + "##v" + redCube + " #Red Cube\r\n";
		cubeSelDiag += "#L1000" + "##v" + bonusCube + " #Bonus Potential Cube#l\r\n";
		cm.sendSimple(cubeSelDiag);
	}
	else if (status == 2)
	{
		if(selection == bagIndex) // red cube
		{
			if(equipment.getPotential1() == 0 && equipment.getPotential2() == 0 || equipment.getPotential1() < 40000)
			{
				cm.sendOk("Your item does not have a potential, or is not legendary.");
				return cm.dispose();
			}
			else if(cm.getChar().getRC() <= 149)
			{
				cm.sendOk("You do not have enough DP.");
				return cm.dispose();
			}
			else if(cm.getQuantityOfItem(redCube) <= 0)
			{
				cm.sendOk("You do not have any red cubes.");
				return cm.dispose();
			}
			else
			{
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getRC() + "#L1\r\n\r\n";
				var basePot = [equipment.getPotential1(), equipment.getPotential2(),equipment.getPotential3()];
				for(var i = 0; i < basePot.length; i++)
				{
					if(basePot[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					if(basePot[i] == 40056 || basePot[i] == 40057)
					{
						cubingDiag += "#g(Legendary)#k Critical Damage 8%";
					}
					else
					{
						var tier = Math.floor(basePot[i] / 10000)
							if(tier <= 1)
							{
								cubingDiag += "#b(Rare) #k";
							}
							else if(tier == 2)
							{
								cubingDiag += "#d(Epic) #k";
							}
							else if(tier == 3)
							{
								cubingDiag += "#r(Unique) #k";
							}
							else
							{
								cubingDiag += "#g(Legendary) #k";
							}
						if(cm.getReqLevel(equipment.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equipment.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n"
				}
				cm.sendNext(cubingDiag + "#l");
				
			}
		}
		if(selection == 1000)
		{
			if(equipment.getPotential4() == 0 && equipment.getPotential5() == 0 || equipment.getPotential4() < 40000)
			{
				cm.sendOk("Your item does not have a potential, or is not legendary.");
				return cm.dispose();
			}
			else if(cm.getChar().getRC() <= 299)
			{
				cm.sendOk("You do not have enough DP.");
				return cm.dispose();
			}
			else if(cm.getQuantityOfItem(bonusCube) <= 0)
			{
				cm.sendOk("You do not have any bonus potential cubes.");
				return cm.dispose();
			}
			else
			{
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getRC() + "#L2\r\n\r\n";
				var bonusPot = [equipment.getPotential4(), equipment.getPotential5(),equipment.getPotential6()];
				for(var i = 0; i < bonusPot.length; i++)
				{
					if(bonusPot[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					else
					{
						var tier = Math.floor(bonusPot[i] / 10000)
							if(tier <= 1)
							{
								cubingDiag += "#b(Rare) #k";
							}
							else if(tier == 2)
							{
								cubingDiag += "#d(Epic) #k";
							}
							else if(tier == 3)
							{
								cubingDiag += "#r(Unique) #k";
							}
							else
							{
								cubingDiag += "#g(Legendary) #k";
							}
						if(cm.getReqLevel(equipment.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(bonusPot[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(bonusPot[i]).get(cm.getReqLevel(equipment.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n"
				}
				cm.sendNext(cubingDiag + "#l");
				status++;
			}
		}
	}
	else if(status == 3) // Main Pot
	{
			
				if(cm.getQuantityOfItem(redCube) == 0)
				{
					cm.sendOk("You do not have enough red cubes.");
					return cm.dispose();
				}
				else if(cm.getChar().getRC() <= 149)
				{
				cm.sendOk("You do not have enough DP.");
				return cm.dispose();
				}
				else if(GameConstants.isWeapon(equipment.getItemId()) || GameConstants.isSecondaryWeapon(equipment.getItemId()) || GameConstants.isEmblem(equipment.getItemId())) // Weapon, 2ndry, Emblem
				{
				var wepPrimePotentials = [40051,40052, 40041, 40042, 40043, 40044,40041, 40042, 40043, 40044,40045, 40047,40051,40052, 40070,40086,40291,40292,40601,40602,40603];
				var wepUniquePotentials = [30041,40051,40052, 30042, 30043, 30044, 30045,30047,30041, 30042, 30043, 30044,30051,30052, 30070,30086,30291,30601,30602,40041, 40042, 40043, 40044, 40041, 40041, 40042, 40043, 40044, 40045, 40047,40051,40052, 40070,40086,40291,40292,40601,40602,40603];				var randomPot = wepPrimePotentials[Math.floor(Math.random() * wepPrimePotentials.length)]; // Prime Line
				var randomPot2 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)]; // Unique
				var randomPot3 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)]; // Unique
				equipment.setPotential1(randomPot);
				equipment.setPotential2(randomPot2);
				equipment.setPotential3(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(redCube, -1);
				cm.gainRC(-150);
				cm.getChar().dropMessage(5,"You lost 1 red cube and 150 DP");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getRC() + "#L1\r\n\r\n";
				var basePot = [equipment.getPotential1(), equipment.getPotential2(),equipment.getPotential3()];
				for(var i = 0; i < basePot.length; i++)
				{
					if(basePot[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					else
					{
						var tier = Math.floor(basePot[i] / 10000)
							if(tier <= 1)
							{
								cubingDiag += "#b(Rare) #k";
							}
							else if(tier == 2)
							{
								cubingDiag += "#d(Epic) #k";
							}
							else if(tier == 3)
							{
								cubingDiag += "#r(Unique) #k";
							}
							else
							{
								cubingDiag += "#g(Legendary) #k";
							}
						if(cm.getReqLevel(equipment.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equipment.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
				else if(GameConstants.getOptionType(equipment.getItemId()) == 54) // Gloves
				{
				var equipPrimePotentials = [40057, 40008, 40009, 40041, 40042, 40043, 40044,40041, 40042, 40043, 40044,40056, 40045,  40048,    40086];
				var equipUniquePotentials = [ 30008,40057,  30041, 30042,40056, 30043, 30044, 30045, 30046,30048,30041, 30042,30041, 30042, 30043, 30044, 30043, 30044,40041, 40042, 40043, 40044, 40008, 40009, 40041, 40042, 40043, 40044, 40045,  40048,    40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential1(randomPrimePot);
				equipment.setPotential2(randomPot2);
				equipment.setPotential3(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(redCube, -1);
				cm.gainRC(-150);
				cm.getChar().dropMessage(5,"You lost 1 red cube and 150 DP");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getRC() + "#L1\r\n\r\n";
				var basePot = [equipment.getPotential1(), equipment.getPotential2(),equipment.getPotential3()];
				for(var i = 0; i < basePot.length; i++)
				{
					if(basePot[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					if(basePot[i] == 40056 || basePot[i] == 40057)
					{
						cubingDiag += "#g(Legendary)#k Critical Damage 8%";
					}
					else
					{
						var tier = Math.floor(basePot[i] / 10000)
							if(tier <= 1)
							{
								cubingDiag += "#b(Rare) #k";
							}
							else if(tier == 2)
							{
								cubingDiag += "#d(Epic) #k";
							}
							else if(tier == 3)
							{
								cubingDiag += "#r(Unique) #k";
							}
							else
							{
								cubingDiag += "#g(Legendary) #k";
							}
						if(cm.getReqLevel(equipment.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equipment.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
				else if(GameConstants.isEquip(equipment.getItemId()) && GameConstants.isAccessory(equipment.getItemId()) == false && GameConstants.isRing(equipment.getItemId()) == false && GameConstants.isEmblem(equipment.getItemId()) == false && GameConstants.getOptionType(equipment.getItemId()) != 54)
				{
				var equipPrimePotentials = [ 40008,40041, 40042, 40043, 40044, 40009, 40041, 40042, 40043, 40044, 40045,  40048,    40086];
				var equipUniquePotentials = [ 30006, 30008,40041, 40042, 40043, 40044,  30041, 30042, 30043, 30044,30041, 30042, 30043,30041, 30042, 30043, 30044, 30044, 30045, 30046,30048, 40008, 40009, 40041, 40042, 40043, 40044, 40045,  40048,    40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential1(randomPrimePot);
				equipment.setPotential2(randomPot2);
				equipment.setPotential3(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(redCube, -1);
				cm.gainRC(-150);
				cm.getChar().dropMessage(5,"You lost 1 red cube and 150 DP");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getRC() + "#L1\r\n\r\n";
				var basePot = [equipment.getPotential1(), equipment.getPotential2(),equipment.getPotential3()];
				for(var i = 0; i < basePot.length; i++)
				{
					if(basePot[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					else
					{
						var tier = Math.floor(basePot[i] / 10000)
							if(tier <= 1)
							{
								cubingDiag += "#b(Rare) #k";
							}
							else if(tier == 2)
							{
								cubingDiag += "#d(Epic) #k";
							}
							else if(tier == 3)
							{
								cubingDiag += "#r(Unique) #k";
							}
							else
							{
								cubingDiag += "#g(Legendary) #k";
							}
						if(cm.getReqLevel(equipment.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equipment.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
			else if(GameConstants.isAccessory(equipment.getItemId()) || GameConstants.isRing(equipment.getItemId()))
			{
				var equipPrimePotentials = [40041, 40042, 40043, 40044, 40041, 40042,40650, 40043, 40044, 40045,  40048,    40086,40656];
				var equipUniquePotentials = [40041, 40042, 40043, 40044,  30041, 30042, 30043, 30044, 30045,30041, 30042, 30043, 30044,30041, 30042, 30043, 30044, 30046,30048,40650, 40041, 40042, 40043, 40044, 40045,  40048,  40086,40656];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential1(randomPrimePot);
				equipment.setPotential2(randomPot2);
				equipment.setPotential3(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(redCube, -1);
				cm.gainRC(-150);
				cm.getChar().dropMessage(5,"You lost 1 red cube and 150 DP");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getRC() + "#L1\r\n\r\n";
				var basePot = [equipment.getPotential1(), equipment.getPotential2(),equipment.getPotential3()];
				for(var i = 0; i < basePot.length; i++)
				{
					if(basePot[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					else
					{
						var tier = Math.floor(basePot[i] / 10000)
							if(tier <= 1)
							{
								cubingDiag += "#b(Rare) #k";
							}
							else if(tier == 2)
							{
								cubingDiag += "#d(Epic) #k";
							}
							else if(tier == 3)
							{
								cubingDiag += "#r(Unique) #k";
							}
							else
							{
								cubingDiag += "#g(Legendary) #k";
							}
						if(cm.getReqLevel(equipment.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equipment.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cm.sendNext(cubingDiag + "#l");
				status--;
			}
			else
			{
				cm.sendOk("Please message Brandon if you got to this message.");
				return cm.dispose();
			}
			
	}
	else if(status == 4) // BPOT
	{
			
				if(cm.getQuantityOfItem(bonusCube) == 0)
				{
					cm.sendOk("You do not have enough bonus potential cubes.");
					return cm.dispose();
				}
				else if(cm.getChar().getRC() <= 299)
				{
					cm.sendOk("You do not have enough DP.");
					return cm.dispose();
				}
				else if(GameConstants.isWeapon(equipment.getItemId()) || GameConstants.isSecondaryWeapon(equipment.getItemId()) || GameConstants.isEmblem(equipment.getItemId()))
				{
				var wepPrimePotentials = [,40041, 40042, 40043, 40044,40051,40052, 40041, 40042, 40043, 40044, 40045, 40047,40051,40052, 40070,40086,40291,40292,40601,40602,40603];
				var wepUniquePotentials = [ 30006,40041, 40042, 40043,30041, 30042, 30043, 30044, 40044, 30011, 30012, 30041, 30042, 30043,30041, 30042, 30043, 30044, 30044, 30045, 30046,30047,30051,30052, 30070,30086,30291,30601,30602, 40041, 40041, 40042, 40043, 40044, 40045, 40047,40051,40052, 40070,40086,40291,40292,40601,40602,40603];				var randomPot = wepPrimePotentials[Math.floor(Math.random() * wepPrimePotentials.length)]; // Prime Line
				var randomPot2 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)]; // Unique
				var randomPot3 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)]; // Unique
				equipment.setPotential4(randomPot);
				equipment.setPotential5(randomPot2);
				equipment.setPotential6(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(bonusCube, -1);
				cm.gainRC(-300);
				cm.getChar().dropMessage(5,"You lost 1 bonus cube and 300 DP");
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getRC() + "#L2\r\n\r\n";
				var basePot = [equipment.getPotential4(), equipment.getPotential5(),equipment.getPotential6()];
				for(var i = 0; i < basePot.length; i++)
				{
					if(basePot[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					else
					{
						var tier = Math.floor(basePot[i] / 10000)
							if(tier <= 1)
							{
								cubingDiag += "#b(Rare) #k";
							}
							else if(tier == 2)
							{
								cubingDiag += "#d(Epic) #k";
							}
							else if(tier == 3)
							{
								cubingDiag += "#r(Unique) #k";
							}
							else
							{
								cubingDiag += "#g(Legendary) #k";
							}
						if(cm.getReqLevel(equipment.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(8);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equipment.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
				else if(GameConstants.getOptionType(equipment.getItemId()) == 54)
				{
				var equipPrimePotentials = [40057,40041, 40042, 40043, 40044, 40008, 40009, 40041, 40042, 40043, 40044,40056, 40045, 40056, 40048,    40086];
				var equipUniquePotentials = [ 30006,40041, 40042, 40043,30041, 30042, 30043, 30044, 40044, 30008,40057,  30041, 30042,40056,30041, 30042, 30043, 30044, 30043, 30044,40056, 30045, 30046,30048, 40008, 40009, 40041, 40042, 40043, 40044, 40045,  40048,    40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential4(randomPrimePot);
				equipment.setPotential5(randomPot2);
				equipment.setPotential6(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(bonusCube, -1);
				cm.gainRC(-300);
				cm.getChar().dropMessage(5,"You lost 1 bonus cube and 300 DP");
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getRC() + "#L2\r\n\r\n";
				var basePot = [equipment.getPotential4(), equipment.getPotential5(),equipment.getPotential6()];
				for(var i = 0; i < basePot.length; i++)
				{
					if(basePot[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					if(basePot[i] == 40056 || basePot[i] == 40057)
					{
						cubingDiag += "#g(Legendary)#k Critical Damage 8%";
					}
					else
					{
						var tier = Math.floor(basePot[i] / 10000)
							if(tier <= 1)
							{
								cubingDiag += "#b(Rare) #k";
							}
							else if(tier == 2)
							{
								cubingDiag += "#d(Epic) #k";
							}
							else if(tier == 3)
							{
								cubingDiag += "#r(Unique) #k";
							}
							else
							{
								cubingDiag += "#g(Legendary) #k";
							}
						if(cm.getReqLevel(equipment.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equipment.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
				else if(GameConstants.isEquip(equipment.getItemId()) && GameConstants.isAccessory(equipment.getItemId()) == false && GameConstants.isRing(equipment.getItemId()) == false && GameConstants.isEmblem(equipment.getItemId()) == false && GameConstants.getOptionType(equipment.getItemId()) != 54)
				{
				var equipPrimePotentials = [ 40008,40041, 40042, 40043, 40044, 40009, 40041, 40042, 40043, 40044, 40045,  40048,    40086];
				var equipUniquePotentials = [ 30006,40041, 40042, 40043,30041, 30042, 30043, 30044, 40044, 30008,  30041, 30042, 30043, 30044,30041, 30042, 30043, 30044, 30045, 30046,30048, 40008, 40009, 40041, 40042, 40043, 40044, 40045,  40048,    40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential4(randomPrimePot);
				equipment.setPotential5(randomPot2);
				equipment.setPotential6(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(bonusCube, -1);
				cm.gainRC(-300);
				cm.getChar().dropMessage(5,"You lost 1 bonus cube and 300 DP");
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getRC() + "#L2\r\n\r\n";
				var basePot = [equipment.getPotential4(), equipment.getPotential5(),equipment.getPotential6()];
				for(var i = 0; i < basePot.length; i++)
				{
					if(basePot[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					else
					{
						var tier = Math.floor(basePot[i] / 10000)
							if(tier <= 1)
							{
								cubingDiag += "#b(Rare) #k";
							}
							else if(tier == 2)
							{
								cubingDiag += "#d(Epic) #k";
							}
							else if(tier == 3)
							{
								cubingDiag += "#r(Unique) #k";
							}
							else
							{
								cubingDiag += "#g(Legendary) #k";
							}
						if(cm.getReqLevel(equipment.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(8);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equipment.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cm.sendNext(cubingDiag);
				status--;
			}
			else if(GameConstants.isAccessory(equipment.getItemId()) || GameConstants.isRing(equipment.getItemId()))
			{
				var equipPrimePotentials = [40650,40041, 40042, 40043, 40044, 40008, 40009, 40041, 40042, 40043, 40044, 40045,  40048,    40086,40656];
				var equipUniquePotentials = [ 30006,40041, 40042, 40043,30041, 30042, 30043, 30044, 40044, 30008,  30041, 30042, 30043, 30044,30041, 30042, 30043, 30044, 30045, 30046,30048, 40656, 40008, 40009, 40041, 40042, 40043,40650, 40044, 40045,  40048,    40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential4(randomPrimePot);
				equipment.setPotential5(randomPot2);
				equipment.setPotential6(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(bonusCube, -1);
				cm.gainRC(-300);
				cm.getChar().dropMessage(5,"You lost 1 bonus cube and 300 DP");
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getRC() + "#L2\r\n\r\n";
				var basePot = [equipment.getPotential4(), equipment.getPotential5(),equipment.getPotential6()];
				for(var i = 0; i < basePot.length; i++)
				{
					if(basePot[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					else
					{
						var tier = Math.floor(basePot[i] / 10000)
							if(tier <= 1)
							{
								cubingDiag += "#b(Rare) #k";
							}
							else if(tier == 2)
							{
								cubingDiag += "#d(Epic) #k";
							}
							else if(tier == 3)
							{
								cubingDiag += "#r(Unique) #k";
							}
							else
							{
								cubingDiag += "#g(Legendary) #k";
							}
						if(cm.getReqLevel(equipment.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(8);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equipment.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cm.sendNext(cubingDiag + "#l");
				status--;
			}
			else
			{
				cm.sendOk("Please message Brandon if you got to this message.");
				return cm.dispose();
			}
	}
}
