// Cubing NPC (Free)
// 9030300
// The Auction dude next to the Jeweler
// @author Brandon aka Not Brandon#9025 aka twitter.com/BratahFGC

importPackage(Packages.constants);
importPackage(Packages.client.items);
importPackage(java.util);
importPackage(Packages.client.ItemInventory.Inventory);
importPackage(Packages.client.ItemInventory);
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
var cubeSelection;
/*
1: Red Cube
2: Bonus Potential Cube
3: Auto Cube
*/

var state = 0;
var bagIndex;
var desiredStatNumber = 0;
var statList = ["None", "Att %", "Matt %", "Drop Rate %", "Luk %", "Dex %", "Int %", "Str %", "All Stat %"]
var proceedSelection = statList.length + 1;
var cubeNormally = proceedSelection + 1;
var statSelected = 0;
var combination;
var isBpot = false;

/* Prices of Auto Cube Per Cube */
var autoCubePriceRed = 450000;
var autoCubePriceBonus = 900000;

var equipment; //cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(bagIndex);	


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

		var itemSel = "This is the #rFree Cubing NPC#k, please select the item you'd like to cube.\r\n#b\r\n"
		cm.sendSimple(itemSel + cm.EquipListVertical(cm.getChar().getClient()));
		
	}		
	if(status == 1)
	{
		bagIndex = selection;
		equipment = cm.getEquipInventory().get(bagIndex);
		
		var cubeSelDiag = "Which cube would you like to use?\r\n#rCOST: 1 Cube\r\n#k";
		cubeSelDiag += "#L500" + "##v" + redCube + " #Red Cube\r\n";
		cubeSelDiag += "#L1000" + "##v" + bonusCube + " #Bonus Potential Cube\r\n\r\n";
		cubeSelDiag += "#L2000##bAuto Cube Lines Selection#l"
		cm.sendSimple(cubeSelDiag);
	}
	else if (status == 2)
	{
		if(selection == 500) // red cube
		{
			cubeSelection = 1;
			if(equipment.getPotential1() == 0 && equipment.getPotential2() == 0 || equipment.getPotential1() < 40000)
			{
				cm.sendOk("Your item does not have a potential, or is not legendary.");
				return cm.dispose();
			}
			else if(cm.getQuantityOfItem(redCube) <= 0)
			{
				cm.sendOk("You do not have any red cubes.");
				return cm.dispose();
			}
			else
			{
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getDPoints() + "#L1\r\n\r\n";
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
		else if(selection == 1000)
		{
			cubeSelection = 2;
			if(equipment.getPotential4() == 0 && equipment.getPotential5() == 0 || equipment.getPotential4() < 40000)
			{
				cm.sendOk("Your item does not have a potential, or is not legendary.");
				return cm.dispose();
			}
			else if(cm.getQuantityOfItem(bonusCube) <= 0)
			{
				cm.sendOk("You do not have any bonus potential cubes.");
				return cm.dispose();
			}
			else
			{
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getDPoints() + "#L2\r\n\r\n";
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
		else if(selection == 2000) // Auto Cube Selection
		{
			combination = "#rCOMBINATION: " + desiredStatNumber + " " + statList[statSelected]
			cubeSelection = 3;
			autoCubeDiag = "Please select the stat you would like to automatically cube for.\r\n#rCOST: \r\n10,000,000 mesos per Red Cube\r\n20,000,000 mesos per Bonus Cube\r\n\r\n";
			
			for(var i = 1; i < statList.length; i++)
			{
				autoCubeDiag += "#L" + i + "##b" + statList[i] + "\r\n";
			}
			autoCubeDiag += "\r\n#L" + cubeNormally + "##b" + "Cube Normally.";
			cm.sendNext(autoCubeDiag);
		}
	}
	else if(status == 3 && cubeSelection == 3) // Auto Cube Lines Selection
	{
		if(selection == cubeNormally)
		{
			cubeSelection = 1;
			cm.sendNext("Press next to use a cube on #i" + equipment.getItemId() + "#\r\n#rCOMBINATION: NONE");
			status--;
		}
		else if(selection == 1) // Att
		{
			statSelected = selection;
			cm.sendGetNumber("How much percent Att would you like to cube for?", 1, 1, 36);
		}
		else if(selection == 2) // Matt
		{
			statSelected = selection;
			cm.sendGetNumber("How much percent Matt would you like to cube for?", 1, 1, 36);
		}
		else if(selection == 3) // Drop Rate
		{
			statSelected = selection;
			cm.sendGetNumber("How much percent Drop Rate would you like to cube for?", 1, 1, 60);
		}
		else if(selection == 4) // Luk
		{
			statSelected = selection;
			cm.sendGetNumber("How much percent Luk would you like to cube for?", 1, 1, 36);
		}
		else if(selection == 5) // Dex
		{
			statSelected = selection;
			cm.sendGetNumber("How much percent Dex would you like to cube for?", 1, 1, 36);
		}
		else if(selection == 6) // Int
		{
			statSelected = selection;
			cm.sendGetNumber("How much percent Int would you like to cube for?", 1, 1, 36);
		}
		else if(selection == 7) // Str
		{
			statSelected = selection;
			cm.sendGetNumber("How much percent Str would you like to cube for?", 1, 1, 36);
		}
		else if(selection == 8) // All Stat
		{
			statSelected = selection;
			cm.sendGetNumber("How much percent All Stat would you like to cube for?", 1, 1, 36);
		}
	}
	else if(status == 4 && cubeSelection == 3)
	{
		desiredStatNumber = selection;
		cm.sendNext("Do you want to cube for atleast #r" + statList[statSelected] + desiredStatNumber + "?\r\n#k#L2000##bYes(#rRed Cube#k 10,000,000 Mesos#b)\r\n#L5000#Yes(#gBonus Potential Cube#k 20,000,000 Mesos#b)\r\n#L4000#No");
	}
	else if(status == 5) // Auto Cubing Section
	{
		if(selection <= 2000 && isBpot == false) // Main Pot Auto Cube
		{
			if(cm.getQuantityOfItem(redCube) == 0)
				{
					cm.sendOk("You do not have enough red cubes.");
					return cm.dispose();
				}
				else if(equipment.getPotential1() < 40000)
				{
					cm.sendOk("Your item is not Legendary or does not have a potential.");
					return cm.dispose();
				}
				else if(cm.getMeso() < autoCubePriceRed)
				{
					cm.sendOk("You do not have enough mesos to cube.");
					return cm.dispose();
				}
				else if(GameConstants.isWeapon(equipment.getItemId()) || GameConstants.isSecondaryWeapon(equipment.getItemId()) || GameConstants.isEmblem(equipment.getItemId())) // Weapon, 2ndry, Emblem
				{
				var wepPrimePotentials = [40001, 40002, 40003, 40004, 40011, 40012, 40041, 40042, 40043, 40044, 40045, 40046,40047,40051,40052, 40070,40081,40086,40291,40292,40601,40602,40603];
				var wepUniquePotentials = [30001, 30002, 30003, 30004, 30011, 30012, 30041, 30042, 30043, 30044, 30045, 30046,30047,30051,30052,30054, 30070,30086,30291,30601,30602,30001, 30002, 30003, 30004, 30011, 30012, 30041, 30042, 30043, 30044, 30045, 30046,30047,30051,30052,30054, 30070,30086,30291,30601,30602,30001, 30002, 30003, 30004, 30011, 30012, 30041, 30042, 30043, 30044, 30045, 30046,30047,30051,30052,30054, 30070,30086,30291,30601,30602, 40001, 40002, 40003, 40004 , 40011, 40012, 40041, 40041, 40042, 40043, 40044, 40045, 40046,40047,40051,40052, 40070,40081,40086,40291,40292,40601,40602,40603];				var randomPot = wepPrimePotentials[Math.floor(Math.random() * wepPrimePotentials.length)]; // Prime Line
				var randomPot2 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)]; // Unique
				var randomPot3 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)]; // Unique
				equipment.setPotential1(randomPot);
				equipment.setPotential2(randomPot2);
				equipment.setPotential3(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(redCube, -1);
				cm.gainMeso(-autoCubePriceRed);
				cm.getChar().dropMessage(5,"You lost 1 red cube");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#rAUTO CUBING: ON#k\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getDPoints() + "\r\n\r\n";
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
				var totalLukPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incLUKr + cm.getPotentialInfoById(basePot[1]).get(19).incLUKr + cm.getPotentialInfoById(basePot[2]).get(19).incLUKr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr;
				var totalStrPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incSTRr + cm.getPotentialInfoById(basePot[1]).get(19).incSTRr + cm.getPotentialInfoById(basePot[2]).get(19).incSTRr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr;
				var totalDexPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incDEXr + cm.getPotentialInfoById(basePot[1]).get(19).incDEXr + cm.getPotentialInfoById(basePot[2]).get(19).incDEXr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr;
				var totalIntPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incINTr + cm.getPotentialInfoById(basePot[1]).get(19).incINTr + cm.getPotentialInfoById(basePot[2]).get(19).incINTr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr;
				var totalAttPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incPADr + cm.getPotentialInfoById(basePot[1]).get(19).incPADr + cm.getPotentialInfoById(basePot[2]).get(19).incPADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr;
				var totalMattPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incMADr + cm.getPotentialInfoById(basePot[1]).get(19).incMADr + cm.getPotentialInfoById(basePot[2]).get(19).incMADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr;
				var totalDropPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(19).incRewardProp : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp;

				if(statSelected == 4 && totalLukPercent >= desiredStatNumber) // Luk %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 1 && totalAttPercent >= desiredStatNumber) // Att %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 2 && totalMattPercent >= desiredStatNumber) // Matt %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 3 && totalDropPercent >= desiredStatNumber) // Drop Rate %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 5 && totalDexPercent >= desiredStatNumber) // Dex %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");					
				}
				else if(statSelected == 6 && totalIntPercent >= desiredStatNumber) // Int %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 7 && totalStrPercent >= desiredStatNumber) // Str %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 8 && totalStrPercent >= desiredStatNumber && totalIntPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber) // All Stat %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else{
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
				}
				else if(GameConstants.getOptionType(equipment.getItemId()) == 54) // Gloves
				{
				var equipPrimePotentials = [40001, 40002, 40003, 40004,40057, 40008, 40009, 40041, 40042, 40043, 40044,40056, 40045, 40046, 40048,   40081, 40086];
				var equipUniquePotentials = [30001, 30002, 30003, 30004, 30008,40057,  30041, 30042,40056, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential1(randomPrimePot);
				equipment.setPotential2(randomPot2);
				equipment.setPotential3(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(redCube, -1);
				cm.gainMeso(-autoCubePriceRed);
				cm.getChar().dropMessage(5,"You lost 1 red cube");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#rAUTO CUBING: ON#k\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getDPoints() + "\r\n\r\n";
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
				var totalLukPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incLUKr + cm.getPotentialInfoById(basePot[1]).get(19).incLUKr + cm.getPotentialInfoById(basePot[2]).get(19).incLUKr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr;
				var totalStrPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incSTRr + cm.getPotentialInfoById(basePot[1]).get(19).incSTRr + cm.getPotentialInfoById(basePot[2]).get(19).incSTRr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr;
				var totalDexPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incDEXr + cm.getPotentialInfoById(basePot[1]).get(19).incDEXr + cm.getPotentialInfoById(basePot[2]).get(19).incDEXr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr;
				var totalIntPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incINTr + cm.getPotentialInfoById(basePot[1]).get(19).incINTr + cm.getPotentialInfoById(basePot[2]).get(19).incINTr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr;
				var totalAttPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incPADr + cm.getPotentialInfoById(basePot[1]).get(19).incPADr + cm.getPotentialInfoById(basePot[2]).get(19).incPADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr;
				var totalMattPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incMADr + cm.getPotentialInfoById(basePot[1]).get(19).incMADr + cm.getPotentialInfoById(basePot[2]).get(19).incMADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr;
				var totalDropPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(19).incRewardProp : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp;

				if(statSelected == 4 && totalLukPercent >= desiredStatNumber) // Luk %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 1 && totalAttPercent >= desiredStatNumber) // Att %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 2 && totalMattPercent >= desiredStatNumber) // Matt %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 3 && totalDropPercent >= desiredStatNumber) // Drop Rate %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 5 && totalDexPercent >= desiredStatNumber) // Dex %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");					
				}
				else if(statSelected == 6 && totalIntPercent >= desiredStatNumber) // Int %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 7 && totalStrPercent >= desiredStatNumber) // Str %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 8 && totalStrPercent >= desiredStatNumber && totalIntPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber) // All Stat %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else
				{
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
				}
				else if(GameConstants.isEquip(equipment.getItemId()) && GameConstants.isAccessory(equipment.getItemId()) == false && GameConstants.isRing(equipment.getItemId()) == false && GameConstants.isEmblem(equipment.getItemId()) == false && GameConstants.getOptionType(equipment.getItemId()) != 54)
				{
				var equipPrimePotentials = [40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086];
				var equipUniquePotentials = [30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential1(randomPrimePot);
				equipment.setPotential2(randomPot2);
				equipment.setPotential3(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(redCube, -1);
				cm.gainMeso(-autoCubePriceRed);
				cm.getChar().dropMessage(5,"You lost 1 red cube");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#rAUTO CUBING: ON#k\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getDPoints() + "\r\n\r\n";
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
				var totalLukPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incLUKr + cm.getPotentialInfoById(basePot[1]).get(19).incLUKr + cm.getPotentialInfoById(basePot[2]).get(19).incLUKr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr;
				var totalStrPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incSTRr + cm.getPotentialInfoById(basePot[1]).get(19).incSTRr + cm.getPotentialInfoById(basePot[2]).get(19).incSTRr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr;
				var totalDexPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incDEXr + cm.getPotentialInfoById(basePot[1]).get(19).incDEXr + cm.getPotentialInfoById(basePot[2]).get(19).incDEXr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr;
				var totalIntPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incINTr + cm.getPotentialInfoById(basePot[1]).get(19).incINTr + cm.getPotentialInfoById(basePot[2]).get(19).incINTr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr;
				var totalAttPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incPADr + cm.getPotentialInfoById(basePot[1]).get(19).incPADr + cm.getPotentialInfoById(basePot[2]).get(19).incPADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr;
				var totalMattPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incMADr + cm.getPotentialInfoById(basePot[1]).get(19).incMADr + cm.getPotentialInfoById(basePot[2]).get(19).incMADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr;
				var totalDropPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(19).incRewardProp : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp;

				if(statSelected == 4 && totalLukPercent >= desiredStatNumber) // Luk %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 1 && totalAttPercent >= desiredStatNumber) // Att %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 2 && totalMattPercent >= desiredStatNumber) // Matt %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 3 && totalDropPercent >= desiredStatNumber) // Drop Rate %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 5 && totalDexPercent >= desiredStatNumber) // Dex %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");					
				}
				else if(statSelected == 6 && totalIntPercent >= desiredStatNumber) // Int %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 7 && totalStrPercent >= desiredStatNumber) // Str %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 8 && totalStrPercent >= desiredStatNumber && totalIntPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber) // All Stat %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else
				{
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
			}
			else if(GameConstants.isAccessory(equipment.getItemId()) || GameConstants.isRing(equipment.getItemId()))
			{
				var equipPrimePotentials = [40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042,40650, 40043, 40044, 40045, 40046, 40048,   40081, 40086,40656];
				var equipUniquePotentials = [30001, 30002, 30003, 30004, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30054,30001, 30002, 30003, 30004, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30054,30001, 30002, 30003, 30004, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30054,40001, 40002, 40003,40650, 40004,40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086,40656];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential1(randomPrimePot);
				equipment.setPotential2(randomPot2);
				equipment.setPotential3(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(redCube, -1);
				cm.gainMeso(-autoCubePriceRed);
				cm.getChar().dropMessage(5,"You lost 1 red cube");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#rAUTO CUBING: ON#k\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getDPoints() + "\r\n\r\n";
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
				var totalLukPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incLUKr + cm.getPotentialInfoById(basePot[1]).get(19).incLUKr + cm.getPotentialInfoById(basePot[2]).get(19).incLUKr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr;
				var totalLukPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incLUKr + cm.getPotentialInfoById(basePot[1]).get(19).incLUKr + cm.getPotentialInfoById(basePot[2]).get(19).incLUKr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr;
				var totalStrPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incSTRr + cm.getPotentialInfoById(basePot[1]).get(19).incSTRr + cm.getPotentialInfoById(basePot[2]).get(19).incSTRr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr;
				var totalDexPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incDEXr + cm.getPotentialInfoById(basePot[1]).get(19).incDEXr + cm.getPotentialInfoById(basePot[2]).get(19).incDEXr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr;
				var totalIntPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incINTr + cm.getPotentialInfoById(basePot[1]).get(19).incINTr + cm.getPotentialInfoById(basePot[2]).get(19).incINTr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr;
				var totalAttPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incPADr + cm.getPotentialInfoById(basePot[1]).get(19).incPADr + cm.getPotentialInfoById(basePot[2]).get(19).incPADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr;
				var totalMattPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incMADr + cm.getPotentialInfoById(basePot[1]).get(19).incMADr + cm.getPotentialInfoById(basePot[2]).get(19).incMADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr;
				var totalDropPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(19).incRewardProp : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp;

				if(statSelected == 4 && totalLukPercent >= desiredStatNumber) // Luk %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 1 && totalAttPercent >= desiredStatNumber) // Att %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 2 && totalMattPercent >= desiredStatNumber) // Matt %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 3 && totalDropPercent >= desiredStatNumber) // Drop Rate %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 5 && totalDexPercent >= desiredStatNumber) // Dex %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");					
				}
				else if(statSelected == 6 && totalIntPercent >= desiredStatNumber) // Int %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 7 && totalStrPercent >= desiredStatNumber) // Str %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 8 && totalStrPercent >= desiredStatNumber && totalIntPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber) // All Stat %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else
				{
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
			}
			else
			{
				cm.sendOk("Please message Brandon if you got to this message.");
				return cm.dispose();
			}
		}
		else if(selection == 5000 || isBpot == true) // BPOT Auto Cube
		{
			isBpot = true;
			if(cm.getQuantityOfItem(bonusCube) == 0)
				{
					cm.sendOk("You do not have enough bonus potential cubes.");
					return cm.dispose();
				}
				else if(equipment.getPotential4() < 40000)
				{
					cm.sendOk("Your item is not Legendary or does not have a potential.");
					return cm.dispose();
				}
				else if(cm.getMeso() < autoCubePriceBonus)
				{
					cm.sendOk("You do not have enough mesos to Auto Cube.");
					return cm.dispose();
				}
				else if(GameConstants.isWeapon(equipment.getItemId()) || GameConstants.isSecondaryWeapon(equipment.getItemId()) || GameConstants.isEmblem(equipment.getItemId()))
				{
				var wepPrimePotentials = [40001, 40002, 40003, 40004, 40011, 40012, 40041, 40042, 40043, 40044, 40045, 40046,40047,40051,40052, 40070,40081,40086,40291,40292,40601,40602,40603];
				var wepUniquePotentials = [30001, 30002, 30003, 30004, 30006, 30011, 30012, 30041, 30042, 30043, 30044, 30045, 30046,30047,30051,30052,30054, 30070,30086,30291,30601,30602,30001, 30002, 30003, 30004, 30006, 30011, 30012, 30041, 30042, 30043, 30044, 30045, 30046,30047,30051,30052,30054, 30070,30086,30291,30601,30602,30001, 30002, 30003, 30004, 30006, 30011, 30012, 30041, 30042, 30043, 30044, 30045, 30046,30047,30051,30052,30054, 30070,30086,30291,30601,30602, 40001, 40002, 40003, 40004, 40011, 40012, 40041, 40041, 40042, 40043, 40044, 40045, 40046,40047,40051,40052, 40070,40081,40086,40291,40292,40601,40602,40603];				var randomPot = wepPrimePotentials[Math.floor(Math.random() * wepPrimePotentials.length)]; // Prime Line
				var randomPot2 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)]; // Unique
				var randomPot3 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)]; // Unique
				equipment.setPotential4(randomPot);
				equipment.setPotential5(randomPot2);
				equipment.setPotential6(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(bonusCube, -1);
				cm.gainMeso(-autoCubePriceBonus);
				cm.getChar().dropMessage(5,"You lost 1 bonus cube");
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#rAUTO CUBING: ON#k\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getDPoints() + "\r\n\r\n";
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
				var totalLukPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incLUKr + cm.getPotentialInfoById(basePot[1]).get(19).incLUKr + cm.getPotentialInfoById(basePot[2]).get(19).incLUKr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr;
				var totalStrPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incSTRr + cm.getPotentialInfoById(basePot[1]).get(19).incSTRr + cm.getPotentialInfoById(basePot[2]).get(19).incSTRr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr;
				var totalDexPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incDEXr + cm.getPotentialInfoById(basePot[1]).get(19).incDEXr + cm.getPotentialInfoById(basePot[2]).get(19).incDEXr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr;
				var totalIntPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incINTr + cm.getPotentialInfoById(basePot[1]).get(19).incINTr + cm.getPotentialInfoById(basePot[2]).get(19).incINTr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr;
				var totalAttPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incPADr + cm.getPotentialInfoById(basePot[1]).get(19).incPADr + cm.getPotentialInfoById(basePot[2]).get(19).incPADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr;
				var totalMattPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incMADr + cm.getPotentialInfoById(basePot[1]).get(19).incMADr + cm.getPotentialInfoById(basePot[2]).get(19).incMADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr;
				var totalDropPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(19).incRewardProp : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp;

				if(statSelected == 4 && totalLukPercent >= desiredStatNumber) // Luk %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 1 && totalAttPercent >= desiredStatNumber) // Att %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 2 && totalMattPercent >= desiredStatNumber) // Matt %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 3 && totalDropPercent >= desiredStatNumber) // Drop Rate %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 5 && totalDexPercent >= desiredStatNumber) // Dex %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");					
				}
				else if(statSelected == 6 && totalIntPercent >= desiredStatNumber) // Int %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 7 && totalStrPercent >= desiredStatNumber) // Str %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 8 && totalStrPercent >= desiredStatNumber && totalIntPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber) // All Stat %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else{
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
				}
				else if(GameConstants.getOptionType(equipment.getItemId()) == 54)
				{
				var equipPrimePotentials = [40001, 40002, 40003, 40004,40057, 40008, 40009, 40041, 40042, 40043, 40044,40056, 40045, 40046, 40048,   40081, 40086];
				var equipUniquePotentials = [30001, 30002, 30003, 30004, 30006, 30008,40057,  30041, 30042,40056, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,40057,  30041, 30042,40056, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,40057,  30041, 30042,40056, 30043, 30044, 30045, 30046,30048,30053,30054,40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential4(randomPrimePot);
				equipment.setPotential5(randomPot2);
				equipment.setPotential6(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(bonusCube, -1);
				cm.gainMeso(-autoCubePriceBonus);
				cm.getChar().dropMessage(5,"You lost 1 bonus cube");
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#rAUTO CUBING: ON#k\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getDPoints() + "\r\n\r\n";
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
				var totalLukPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incLUKr + cm.getPotentialInfoById(basePot[1]).get(19).incLUKr + cm.getPotentialInfoById(basePot[2]).get(19).incLUKr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr;
				var totalStrPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incSTRr + cm.getPotentialInfoById(basePot[1]).get(19).incSTRr + cm.getPotentialInfoById(basePot[2]).get(19).incSTRr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr;
				var totalDexPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incDEXr + cm.getPotentialInfoById(basePot[1]).get(19).incDEXr + cm.getPotentialInfoById(basePot[2]).get(19).incDEXr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr;
				var totalIntPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incINTr + cm.getPotentialInfoById(basePot[1]).get(19).incINTr + cm.getPotentialInfoById(basePot[2]).get(19).incINTr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr;
				var totalAttPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incPADr + cm.getPotentialInfoById(basePot[1]).get(19).incPADr + cm.getPotentialInfoById(basePot[2]).get(19).incPADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr;
				var totalMattPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incMADr + cm.getPotentialInfoById(basePot[1]).get(19).incMADr + cm.getPotentialInfoById(basePot[2]).get(19).incMADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr;
				var totalDropPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(19).incRewardProp : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp;

				if(statSelected == 4 && totalLukPercent >= desiredStatNumber) // Luk %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 1 && totalAttPercent >= desiredStatNumber) // Att %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 2 && totalMattPercent >= desiredStatNumber) // Matt %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 3 && totalDropPercent >= desiredStatNumber) // Drop Rate %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 5 && totalDexPercent >= desiredStatNumber) // Dex %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");					
				}
				else if(statSelected == 6 && totalIntPercent >= desiredStatNumber) // Int %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 7 && totalStrPercent >= desiredStatNumber) // Str %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 8 && totalStrPercent >= desiredStatNumber && totalIntPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber) // All Stat %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else{
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
				}
				else if(GameConstants.isEquip(equipment.getItemId()) && GameConstants.isAccessory(equipment.getItemId()) == false && GameConstants.isRing(equipment.getItemId()) == false && GameConstants.isEmblem(equipment.getItemId()) == false && GameConstants.getOptionType(equipment.getItemId()) != 54)
				{
				var equipPrimePotentials = [40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086];
				var equipUniquePotentials = [30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential4(randomPrimePot);
				equipment.setPotential5(randomPot2);
				equipment.setPotential6(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(bonusCube, -1);
				cm.gainMeso(-autoCubePriceBonus);
				cm.getChar().dropMessage(5,"You lost 1 bonus cube");
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#rAUTO CUBING: ON#k\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getDPoints() + "\r\n\r\n";
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
				var totalLukPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incLUKr + cm.getPotentialInfoById(basePot[1]).get(19).incLUKr + cm.getPotentialInfoById(basePot[2]).get(19).incLUKr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr;
				var totalStrPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incSTRr + cm.getPotentialInfoById(basePot[1]).get(19).incSTRr + cm.getPotentialInfoById(basePot[2]).get(19).incSTRr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr;
				var totalDexPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incDEXr + cm.getPotentialInfoById(basePot[1]).get(19).incDEXr + cm.getPotentialInfoById(basePot[2]).get(19).incDEXr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr;
				var totalIntPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incINTr + cm.getPotentialInfoById(basePot[1]).get(19).incINTr + cm.getPotentialInfoById(basePot[2]).get(19).incINTr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr;
				var totalAttPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incPADr + cm.getPotentialInfoById(basePot[1]).get(19).incPADr + cm.getPotentialInfoById(basePot[2]).get(19).incPADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr;
				var totalMattPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incMADr + cm.getPotentialInfoById(basePot[1]).get(19).incMADr + cm.getPotentialInfoById(basePot[2]).get(19).incMADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr;
				var totalDropPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(19).incRewardProp : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp;

				if(statSelected == 4 && totalLukPercent >= desiredStatNumber) // Luk %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 1 && totalAttPercent >= desiredStatNumber) // Att %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 2 && totalMattPercent >= desiredStatNumber) // Matt %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 3 && totalDropPercent >= desiredStatNumber) // Drop Rate %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 5 && totalDexPercent >= desiredStatNumber) // Dex %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");					
				}
				else if(statSelected == 6 && totalIntPercent >= desiredStatNumber) // Int %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 7 && totalStrPercent >= desiredStatNumber) // Str %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 8 && totalStrPercent >= desiredStatNumber && totalIntPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber) // All Stat %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else{
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
			}
			else if(GameConstants.isAccessory(equipment.getItemId()) || GameConstants.isRing(equipment.getItemId()))
			{
				var equipPrimePotentials = [40001, 40002, 40003, 40004,40650, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086,40656];
				var equipUniquePotentials = [30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,40001, 40002, 40003, 40004, 40656, 40008, 40009, 40041, 40042, 40043,40650, 40044, 40045, 40046, 40048,   40081, 40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential4(randomPrimePot);
				equipment.setPotential5(randomPot2);
				equipment.setPotential6(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(bonusCube, -1);
				cm.gainMeso(-autoCubePriceBonus);
				cm.getChar().dropMessage(5,"You lost 1 bonus cube");
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#rAUTO CUBING: ON#k\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getDPoints() + "\r\n\r\n";
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
				var totalLukPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incLUKr + cm.getPotentialInfoById(basePot[1]).get(19).incLUKr + cm.getPotentialInfoById(basePot[2]).get(19).incLUKr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incLUKr;
				var totalStrPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incSTRr + cm.getPotentialInfoById(basePot[1]).get(19).incSTRr + cm.getPotentialInfoById(basePot[2]).get(19).incSTRr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incSTRr;
				var totalDexPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incDEXr + cm.getPotentialInfoById(basePot[1]).get(19).incDEXr + cm.getPotentialInfoById(basePot[2]).get(19).incDEXr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incDEXr;
				var totalIntPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incINTr + cm.getPotentialInfoById(basePot[1]).get(19).incINTr + cm.getPotentialInfoById(basePot[2]).get(19).incINTr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incINTr;
				var totalAttPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incPADr + cm.getPotentialInfoById(basePot[1]).get(19).incPADr + cm.getPotentialInfoById(basePot[2]).get(19).incPADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incPADr;
				var totalMattPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incMADr + cm.getPotentialInfoById(basePot[1]).get(19).incMADr + cm.getPotentialInfoById(basePot[2]).get(19).incMADr : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incMADr;
				var totalDropPercent = (cm.getReqLevel(equipment.getItemId()) >= 200) ? cm.getPotentialInfoById(basePot[0]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(19).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(19).incRewardProp : cm.getPotentialInfoById(basePot[0]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[1]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp + cm.getPotentialInfoById(basePot[2]).get(cm.getReqLevel(equipment.getItemId()) / 10).incRewardProp;

				if(statSelected == 4 && totalLukPercent >= desiredStatNumber) // Luk %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 1 && totalAttPercent >= desiredStatNumber) // Att %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 2 && totalMattPercent >= desiredStatNumber) // Matt %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 3 && totalDropPercent >= desiredStatNumber) // Drop Rate %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else if(statSelected == 5 && totalDexPercent >= desiredStatNumber) // Dex %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");					
				}
				else if(statSelected == 6 && totalIntPercent >= desiredStatNumber) // Int %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 7 && totalStrPercent >= desiredStatNumber) // Str %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");										
				}
				else if(statSelected == 8 && totalStrPercent >= desiredStatNumber && totalIntPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber && totalDexPercent >= desiredStatNumber) // All Stat %
				{
					cm.sendGetTextNoESC("#rMATCH FOUND!\r\n" + cubingDiag + "#l");
				}
				else{
				cm.sendNext(cubingDiag + "#l");
				status--;
				}
			}
			else
			{
				cm.sendOk("Please message Brandon if you got to this message.");
				return cm.dispose();
			}
		}
		else if(selection == 4000)
		{
			return cm.dispose();
		}
	}
	else if(status == 3 && cubeSelection == 1) // Main Pot
	{
			
				if(cm.getQuantityOfItem(redCube) == 0)
				{
					cm.sendOk("You do not have enough red cubes.");
					return cm.dispose();
				}
				else if(GameConstants.isWeapon(equipment.getItemId()) || GameConstants.isSecondaryWeapon(equipment.getItemId()) || GameConstants.isEmblem(equipment.getItemId())) // Weapon, 2ndry, Emblem
				{
				var wepPrimePotentials = [40001, 40002, 40003, 40004, 40011, 40012, 40041, 40042, 40043, 40044, 40045, 40046,40047,40051,40052, 40070,40081,40086,40291,40292,40601,40602,40603];
				var wepUniquePotentials = [30001, 30002, 30003, 30004, 30011, 30012, 30041, 30042, 30043, 30044, 30045, 30046,30047,30051,30052,30054, 30070,30086,30291,30601,30602,30001, 30002, 30003, 30004, 30011, 30012, 30041, 30042, 30043, 30044, 30045, 30046,30047,30051,30052,30054, 30070,30086,30291,30601,30602,30001, 30002, 30003, 30004, 30011, 30012, 30041, 30042, 30043, 30044, 30045, 30046,30047,30051,30052,30054, 30070,30086,30291,30601,30602, 40001, 40002, 40003, 40004 , 40011, 40012, 40041, 40041, 40042, 40043, 40044, 40045, 40046,40047,40051,40052, 40070,40081,40086,40291,40292,40601,40602,40603];				var randomPot = wepPrimePotentials[Math.floor(Math.random() * wepPrimePotentials.length)]; // Prime Line
				var randomPot2 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)]; // Unique
				var randomPot3 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)]; // Unique
				equipment.setPotential1(randomPot);
				equipment.setPotential2(randomPot2);
				equipment.setPotential3(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(redCube, -1);
				cm.getChar().dropMessage(5,"You lost 1 red cube");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getDPoints() + "#L1\r\n\r\n";
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
				var equipPrimePotentials = [40001, 40002, 40003, 40004,40057, 40008, 40009, 40041, 40042, 40043, 40044,40056, 40045, 40046, 40048,   40081, 40086];
				var equipUniquePotentials = [30001, 30002, 30003, 30004, 30008,40057,  30041, 30042,40056, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential1(randomPrimePot);
				equipment.setPotential2(randomPot2);
				equipment.setPotential3(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(redCube, -1);
				cm.getChar().dropMessage(5,"You lost 1 red cube");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getDPoints() + "#L1\r\n\r\n";
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
				var equipPrimePotentials = [40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086];
				var equipUniquePotentials = [30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential1(randomPrimePot);
				equipment.setPotential2(randomPot2);
				equipment.setPotential3(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(redCube, -1);
				cm.getChar().dropMessage(5,"You lost 1 red cube");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getDPoints() + "#L1\r\n\r\n";
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
				var equipPrimePotentials = [40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042,40650, 40043, 40044, 40045, 40046, 40048,   40081, 40086,40656];
				var equipUniquePotentials = [30001, 30002, 30003, 30004, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30054,30001, 30002, 30003, 30004, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30054,30001, 30002, 30003, 30004, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30054,40001, 40002, 40003,40650, 40004,40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086,40656];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential1(randomPrimePot);
				equipment.setPotential2(randomPot2);
				equipment.setPotential3(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(redCube, -1);
				cm.getChar().dropMessage(5,"You lost 1 red cube");
				var cubingDiag = "These are your potentials, would you like to use a cube?\r\n#v" + redCube +": #" + cm.getQuantityOfItem(redCube) + "\r\nDP: " + cm.getChar().getDPoints() + "#L1\r\n\r\n";
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
	else if(status == 4 && cubeSelection == 2) // BPOT
	{
			
				if(cm.getQuantityOfItem(bonusCube) == 0)
				{
					cm.sendOk("You do not have enough bonus potential cubes.");
					return cm.dispose();
				}
				else if(GameConstants.isWeapon(equipment.getItemId()) || GameConstants.isSecondaryWeapon(equipment.getItemId()) || GameConstants.isEmblem(equipment.getItemId()))
				{
				var wepPrimePotentials = [40001, 40002, 40003, 40004, 40011, 40012, 40041, 40042, 40043, 40044, 40045, 40046,40047,40051,40052, 40070,40081,40086,40291,40292,40601,40602,40603];
				var wepUniquePotentials = [30001, 30002, 30003, 30004, 30006, 30011, 30012, 30041, 30042, 30043, 30044, 30045, 30046,30047,30051,30052,30054, 30070,30086,30291,30601,30602,30001, 30002, 30003, 30004, 30006, 30011, 30012, 30041, 30042, 30043, 30044, 30045, 30046,30047,30051,30052,30054, 30070,30086,30291,30601,30602,30001, 30002, 30003, 30004, 30006, 30011, 30012, 30041, 30042, 30043, 30044, 30045, 30046,30047,30051,30052,30054, 30070,30086,30291,30601,30602, 40001, 40002, 40003, 40004, 40011, 40012, 40041, 40041, 40042, 40043, 40044, 40045, 40046,40047,40051,40052, 40070,40081,40086,40291,40292,40601,40602,40603];				var randomPot = wepPrimePotentials[Math.floor(Math.random() * wepPrimePotentials.length)]; // Prime Line
				var randomPot2 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)]; // Unique
				var randomPot3 = wepUniquePotentials[Math.floor(Math.random() * wepUniquePotentials.length)]; // Unique
				equipment.setPotential4(randomPot);
				equipment.setPotential5(randomPot2);
				equipment.setPotential6(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(bonusCube, -1);
				cm.getChar().dropMessage(5,"You lost 1 bonus cube");
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getDPoints() + "#L2\r\n\r\n";
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
				var equipPrimePotentials = [40001, 40002, 40003, 40004,40057, 40008, 40009, 40041, 40042, 40043, 40044,40056, 40045, 40046, 40048,   40081, 40086];
				var equipUniquePotentials = [30001, 30002, 30003, 30004, 30006, 30008,40057,  30041, 30042,40056, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,40057,  30041, 30042,40056, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,40057,  30041, 30042,40056, 30043, 30044, 30045, 30046,30048,30053,30054,40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential4(randomPrimePot);
				equipment.setPotential5(randomPot2);
				equipment.setPotential6(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(bonusCube, -1);
				cm.getChar().dropMessage(5,"You lost 1 bonus cube");
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getDPoints() + "#L2\r\n\r\n";
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
				var equipPrimePotentials = [40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086];
				var equipUniquePotentials = [30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,40001, 40002, 40003, 40004, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential4(randomPrimePot);
				equipment.setPotential5(randomPot2);
				equipment.setPotential6(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(bonusCube, -1);
				cm.getChar().dropMessage(5,"You lost 1 bonus cube");
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getDPoints() + "#L2\r\n\r\n";
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
				var equipPrimePotentials = [40001, 40002, 40003, 40004,40650, 40008, 40009, 40041, 40042, 40043, 40044, 40045, 40046, 40048,   40081, 40086,40656];
				var equipUniquePotentials = [30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,30001, 30002, 30003, 30004, 30006, 30008,  30041, 30042, 30043, 30044, 30045, 30046,30048,30053,30054,40001, 40002, 40003, 40004, 40656, 40008, 40009, 40041, 40042, 40043,40650, 40044, 40045, 40046, 40048,   40081, 40086];
				var randomPrimePot = equipPrimePotentials[Math.floor(Math.random() * equipPrimePotentials.length)]; // Prime Line
				var randomPot2 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				var randomPot3 = equipUniquePotentials[Math.floor(Math.random() * equipUniquePotentials.length)]; // Unique
				equipment.setPotential4(randomPrimePot);
				equipment.setPotential5(randomPot2);
				equipment.setPotential6(randomPot3);
				cm.getChar().send(MainPacketCreator.updateEquipSlot(equipment));
				cm.gainItem(bonusCube, -1);
				cm.getChar().dropMessage(5,"You lost 1 bonus cube");
				var cubingDiag = "These are your bonus potentials, would you like to use a cube?\r\n#v" + bonusCube +": #" + cm.getQuantityOfItem(bonusCube) + "\r\nDP: " + cm.getChar().getDPoints() + "#L2\r\n\r\n";
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
