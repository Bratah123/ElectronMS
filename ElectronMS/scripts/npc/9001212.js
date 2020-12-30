// Black Cube NPC
// 9001212
// Location in FM Jeweler
// @author Brandon

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
var blackCube = 5062010;
var bonusCube = blackCube;
var bagIndex;
var equip;

var equipPrimePotentials = [40041, 40042, 40043, 40044, 40045,  40048,    40086];
var equipUniquePotentials = [30041, 30042, 30043, 30044,  30046,30048,30052, 40007,   40041, 40042, 40043, 40044, 40045,  40048,    40086];

var wepPrimePotentials = [40013, 40041, 40042, 40043, 40044, 40045, 40047,40051,40052, 40070,40086,40291,40292,40601,40602,40603];
var wepUniquePotentials = [30013, 30041, 30042, 30043, 30044,  30046,30047,30051,30052, 30070,30086,30291,30601,30602,  40007, 40013, 40041, 40041, 40042, 40043, 40044, 40045, 40047,40051,40052, 40070,40086,40291,40292,40601,40602,40603];

var accPrimePotentials = [40041, 40042,40650, 40043, 40044, 40045,  40048,    40086,40656];
var accUniquePotentials = [30041, 30042, 30043, 30044,  30046,30048,40650,40041, 40042, 40043, 40044, 40045,  40048,    40086,40656];

var glovePrimePotentials = [40056, 40057, 40041, 40042, 40043, 40044, 40045,  40048, 40086];
var gloveUniquePotentials = [30041, 30042, 30043, 30044,40056, 30046,40057,30048, 40007,40041, 40042, 40043, 40044, 40045,  40048,    40086];

var accRandomPrimePot = accPrimePotentials[Math.floor(Math.random() * accPrimePotentials.length)]; // Prime Line
var accRandomPot2 = accUniquePotentials[Math.floor(Math.random() * accUniquePotentials.length)]; // Unique
var accRandomPot3 = accUniquePotentials[Math.floor(Math.random() * accUniquePotentials.length)]; // Unique

var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique

var wepRandomPrimePot = wepPrimePotentials[Math.floor(Math.random() * wepPrimePotentials.length)]; // Prime Wep Line
var wepRandomUniquePot = wepUniquePotentials[Math.floor(Math.random()* wepUniquePotentials.length)]; // Unique Wep Line
var wepRandomUniquePot2 = wepUniquePotentials[Math.floor(Math.random()* wepUniquePotentials.length)]; // Unique Wep Line

var gloveRandomPrimePot = glovePrimePotentials[Math.floor(Math.random()* glovePrimePotentials.length)];
var gloveRandomPot2 = gloveUniquePotentials[Math.floor(Math.random()* gloveUniquePotentials.length)];
var gloveRandomPot3 = gloveUniquePotentials[Math.floor(Math.random()* gloveUniquePotentials.length)];

var blackCubeResults = [randomPrimePot, randomPot2, randomPot3];
var wepBlackCubeResults = [wepRandomPrimePot, wepRandomUniquePot, wepRandomUniquePot2];
var accBlackCubeResults = [accRandomPrimePot, accRandomPot2, accRandomPot3];
var gloveBlackCubeResults = [gloveRandomPrimePot, gloveRandomPot2, gloveRandomPot3];

function start()
{
	status = -1;
	action(1,0,0)
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
		var itemSel = "This is a #bDonor Cubing NPC#k, which item would you like to cube?\r\n\r\n#b"
		cm.sendSimple(itemSel + cm.EquipListVertical(cm.getChar().getClient()));
	}	
	else if(status == 1)
	{
		bagIndex = selection;
		equip = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(bagIndex);
		var cubeSelDiag = "Which cube would you like to use?\r\n#rCOST: 1 Cube and 300 DP\r\n#k";
		cubeSelDiag += "#L" + bagIndex + "##v" + blackCube + " #Black Cube\r\n";
		cubeSelDiag += "#L1000" + "##v" + bonusCube + " #Violet Cube#l\r\n";
		cm.sendSimple(cubeSelDiag);
	}
	else if (status == 2)
	{
		if(selection == bagIndex)
		{
			if(equip.getPotential1() == 0 && equip.getPotential2() == 0 || equip.getPotential1() < 40000)
			{
				cm.sendOk("Your item does not have a potential, or is not legendary.");
				return cm.dispose();
			}
			else if(cm.getQuantityOfItem(blackCube) <= 0)
			{
				cm.sendOk("You do not have any black cubes.");
				return cm.dispose();
			}
			else if(cm.getChar().getRC() < 300)
			{
				cm.sendOk("You do not have enough DP.");
				return cm.dispose();
			}
			else
			{
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + blackCube +": #" + cm.getQuantityOfItem(blackCube) + "\r\nDP: " + cm.getChar().getRC() + "\r\n\r\n";
				var basePot = [equip.getPotential1(), equip.getPotential2(),equip.getPotential3()];
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
						if(cm.getReqLevel(equip.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equip.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n"
				}
				cm.sendNext(cubingDiag);
				
			}
		}
		else if(selection == 1000)
		{
			cm.sendOk("Violet Cubes have not been coded yet, message Brandon on discord, or ping SoulGirlJP on discord with no context");
			return cm.dispose();
		}
	}
	else if(status == 3) // Black Cube Main Pot
	{				
				if(selection == 4) // equips change
				{
					equip.setPotential1(blackCubeResults[0]);
					equip.setPotential2(blackCubeResults[1]);
					equip.setPotential3(blackCubeResults[2]);
					cm.getChar().send(MainPacketCreator.updateEquipSlot(equip));
					cm.gainItem(blackCube, 1); // since they picked the new potential they shouldn't lose a cube.
					cm.gainRC(300);
				}
				else if(selection == 3) // equips keep
				{
					var equipPrimePotentials = [40041, 40042, 40043, 40044, 40045,  40048,    40086];
					var equipUniquePotentials = [30041, 30042, 30043, 30044,  30046,30048,30052,40041, 40042, 40043, 40044, 40045,  40048,    40086];
					randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
					randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
					randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
					blackCubeResults = [randomPrimePot, randomPot2, randomPot3];
				}
				else if(selection == 5) // wep keep
				{
					var wepPrimePotentials = [40013, 40041, 40042, 40043, 40044, 40045, 40047,40051,40052, 40070,40086,40291,40292,40601,40602,40603];
					var wepUniquePotentials = [30013, 30041, 30042, 30043, 30044,  30046,30047,30051,30052, 30070,30086,30291,30601,30602,  40007, 40013, 40041, 40041, 40042, 40043, 40044, 40045, 40047,40051,40052, 40070,40086,40291,40292,40601,40602,40603];
					wepRandomPrimePot = wepPrimePotentials[Math.floor(Math.random() * wepPrimePotentials.length)];
					wepRandomUniquePot = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)];
					wepRandomUniquePot2 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)];
					wepBlackCubeResults = [wepRandomPrimePot, wepRandomUniquePot, wepRandomUniquePot2];
				}
				else if(selection == 6) // wep change
				{
					equip.setPotential1(wepBlackCubeResults[0]);
					equip.setPotential2(wepBlackCubeResults[1]);
					equip.setPotential3(wepBlackCubeResults[2]);
					cm.getChar().send(MainPacketCreator.updateEquipSlot(equip));
					cm.gainItem(blackCube, 1); // since they picked the new potential they shouldn't lose a cube.
					cm.gainRC(300);
				}
				else if(selection == 7) // Accessory keep
				{
					var accPrimePotentials = [40041, 40042,40650, 40043, 40044, 40045,  40048,    40086,40656];
					var accUniquePotentials = [30041, 30042, 30043, 30044,  30046,30048,  40650,  40007,    40041, 40042, 40043, 40044, 40045,  40048,    40086,40656];
					accRandomPrimePot = accPrimePotentials[Math.floor(Math.random() * accPrimePotentials.length)];
					accRandomPot2 = accUniquePotentials[Math.floor(Math.random() * accUniquePotentials.length)];
					accRandomPot3 = accUniquePotentials[Math.floor(Math.random() * accUniquePotentials.length)];
					accBlackCubeResults = [accRandomPrimePot, accRandomPot2, accRandomPot3];
				}
				else if(selection == 8) // Accessory change
				{
					equip.setPotential1(accBlackCubeResults[0]);
					equip.setPotential2(accBlackCubeResults[1]);
					equip.setPotential3(accBlackCubeResults[2]);
					cm.getChar().send(MainPacketCreator.updateEquipSlot(equip));
					cm.gainItem(blackCube, 1); // since they picked the new potential they shouldn't lose a cube.
					cm.gainRC(300);
				}
				else if(selection == 9) // Gloves keep
				{
					var glovePrimePotentials = [40056, 40057, 40041, 40042, 40043, 40044, 40045,  40048,40086];
					var gloveUniquePotentials = [30041, 30042, 30043, 30044,40056, 30046,40057,30048,40041, 40042, 40043, 40044, 40045,  40048, 40086];
					gloveRandomPrimePot = glovePrimePotentials[Math.floor(Math.random() * glovePrimePotentials.length)];
					gloveRandomPot2 = gloveUniquePotentials[Math.floor(Math.random() * gloveUniquePotentials.length)];
					gloveRandomPot3 = gloveUniquePotentials[Math.floor(Math.random() * gloveUniquePotentials.length)];
					gloveBlackCubeResults = [gloveRandomPrimePot, gloveRandomPot2, gloveRandomPot3];
				}
				else if(selection == 10) // Gloves change
				{
					equip.setPotential1(gloveBlackCubeResults[0]);
					equip.setPotential2(gloveBlackCubeResults[1]);
					equip.setPotential3(gloveBlackCubeResults[2]);
					cm.getChar().send(MainPacketCreator.updateEquipSlot(equip));
					cm.gainItem(blackCube, 1); // since they picked the new potential they shouldn't lose a cube.
					cm.gainRC(300);
				}
				
				if(cm.getQuantityOfItem(blackCube) == 0)
				{
					cm.sendOk("You do not have enough black cubes.");
					return cm.dispose();
				}
				else if(cm.getChar().getRC() < 300)
				{
					cm.sendOk("You do not have enough DP.");
					return cm.dispose();
				}
				else if(GameConstants.isWeapon(equip.getItemId()) || GameConstants.isSecondaryWeapon(equip.getItemId()) || GameConstants.isEmblem(equip.getItemId()))
				{
				cm.gainItem(blackCube, -1);
				cm.gainRC(-300)
				cm.getChar().dropMessage(5,"You lost 1 black cube and 300 DP");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + blackCube +": #" + cm.getQuantityOfItem(blackCube) + "\r\nDP: " + cm.getChar().getRC() +"\r\nOriginal Potentials:#L5\r\n\r\n";
				var basePot = [equip.getPotential1(), equip.getPotential2(),equip.getPotential3()];
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
						if(cm.getReqLevel(equip.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equip.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cubingDiag += "#l\r\nNew Potentials:#L6#\r\n";
				for(var i = 0; i < wepBlackCubeResults.length; i++)
				{
					if(wepBlackCubeResults[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					else
					{
						var tier = Math.floor(wepBlackCubeResults[i] / 10000)
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
						if(cm.getReqLevel(equip.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(wepBlackCubeResults[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(wepBlackCubeResults[i]).get(cm.getReqLevel(equip.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cm.sendNext(cubingDiag);
				status--;
				}
				else if(GameConstants.isEquip(equip.getItemId()) && GameConstants.isAccessory(equip.getItemId()) == false && GameConstants.isRing(equip.getItemId()) == false && GameConstants.isEmblem(equip.getItemId()) == false && GameConstants.getOptionType(equip.getItemId()) != 54)
				{
				cm.gainItem(blackCube, -1);
				cm.gainRC(-300)
				cm.getChar().dropMessage(5,"You lost 1 black cube and 300 DP");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + blackCube +": #" + cm.getQuantityOfItem(blackCube) + "\r\nDP: " + cm.getChar().getRC() +"\r\nOriginal Potentials:#L3\r\n\r\n";
				var basePot = [equip.getPotential1(), equip.getPotential2(),equip.getPotential3()];
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
						if(cm.getReqLevel(equip.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equip.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cubingDiag += "#l\r\nNew Potentials:#L4#\r\n";
				for(var i = 0; i < blackCubeResults.length; i++)
				{
					if(blackCubeResults[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					else
					{
						var tier = Math.floor(blackCubeResults[i] / 10000)
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
						if(cm.getReqLevel(equip.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(blackCubeResults[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(blackCubeResults[i]).get(cm.getReqLevel(equip.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cm.sendSimple(cubingDiag + "#l");
				status--;
				}
			else if(GameConstants.isAccessory(equip.getItemId()) || GameConstants.isRing(equip.getItemId())) // Accessories
			{
				cm.gainItem(blackCube, -1);
				cm.gainRC(-300)
				cm.getChar().dropMessage(5,"You lost 1 black cube and 300 DP");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + blackCube +": #" + cm.getQuantityOfItem(blackCube) + "\r\nDP: " + cm.getChar().getRC() +"\r\nOriginal Potentials:#L7\r\n\r\n";
				var basePot = [equip.getPotential1(), equip.getPotential2(),equip.getPotential3()];
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
						if(cm.getReqLevel(equip.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equip.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cubingDiag += "#l\r\nNew Potentials:#L8#\r\n";
				for(var i = 0; i < accBlackCubeResults.length; i++)
				{
					if(accBlackCubeResults[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					else
					{
						var tier = Math.floor(accBlackCubeResults[i] / 10000)
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
						if(cm.getReqLevel(equip.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(accBlackCubeResults[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(accBlackCubeResults[i]).get(cm.getReqLevel(equip.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cm.sendNext(cubingDiag);
				status--;
			}
			else if(GameConstants.getOptionType(equip.getItemId()) == 54)
			{
				cm.gainItem(blackCube, -1);
				cm.gainRC(-300)
				cm.getChar().dropMessage(5,"You lost 1 black cube and 300 DP");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + blackCube +": #" + cm.getQuantityOfItem(blackCube) + "\r\nDP: " + cm.getChar().getRC() +"\r\nOriginal Potentials:#L9\r\n\r\n";
				var basePot = [equip.getPotential1(), equip.getPotential2(),equip.getPotential3()];
				for(var i = 0; i < basePot.length; i++)
				{
					if(basePot[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					else if(basePot[i] == 40056 || basePot[i] == 40057)
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
						if(cm.getReqLevel(equip.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(basePot[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(basePot[i]).get(cm.getReqLevel(equip.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cubingDiag += "#l\r\nNew Potentials:#L10#\r\n";
				for(var i = 0; i < gloveBlackCubeResults.length; i++)
				{
					if(gloveBlackCubeResults[i] == 0)
					{
							cubingDiag += "(None) ";
					}
					else if(gloveBlackCubeResults[i] == 40056 || gloveBlackCubeResults[i] == 40057)
					{
						cubingDiag += "#g(Legendary)#k Critical Damage 8%";
					}
					else
					{
						var tier = Math.floor(gloveBlackCubeResults[i] / 10000)
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
						if(cm.getReqLevel(equip.getItemId()) >= 200)
						{
							potInfo = cm.getPotentialInfoById(gloveBlackCubeResults[i]).get(19);
							cubingDiag += potInfo;
						}
						else{
						potInfo = cm.getPotentialInfoById(gloveBlackCubeResults[i]).get(cm.getReqLevel(equip.getItemId()) / 10);
						cubingDiag += potInfo;
						}
					}
				
					cubingDiag += "\r\n";
				}
				cm.sendNext(cubingDiag);
				status--;
			}

	}
	/*else
	{
		cm.sendOk("Please message Brandon if you got to this message.");
		return cm.dispose();
	}*/
}