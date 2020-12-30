var status = -1;
// Nodestone boxes 2630282
importPackage(Packages.tools.RandomStream);
importPackage(Packages.client.inventory);
importPackage(java.lang);
importPackage(java.sql);
importPackage(java.util);
importPackage(java.io);
importPackage(Packages.packet.creators);
importPackage(Packages.client.items);
importPackage(Packages.server.items);
importPackage(Packages.launch.world);
importPackage(Packages.main.world);
importPackage(Packages.database);
importPackage(Packages.client);
importPackage(Packages.client.stats);
importPackage(Packages.launch.world);
importPackage(MainPacketCreator);

var totalNodeQuantity = 0;
var totalNodeBoxes;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if(status == 0) {
		totalNodeBoxes = cm.getQuantityOfItem(2630282);
        if (cm.getPlayer().getLevel() >= 200) {
			for(var i = 0; i < totalNodeBoxes; i++)
			{
				var nodeQuantity = Randomizer.rand(50,100);
				totalNodeQuantity += nodeQuantity;
				cm.gainItem(2435719, nodeQuantity);
				cm.gainItem(2630282, -1);
			}
			cm.sendOk("You gained ->#b" + totalNodeQuantity + " Nodestones");
			return cm.dispose();
        } 
		else {
            cm.sendOk("You need to be level 200 or higher to use those.");
            cm.dispose();
        }
	
    }

}