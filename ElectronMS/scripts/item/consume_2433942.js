var status = -1;

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
        mesoQuantity = Randomizer.rand(50000, 1000000);
        cm.sendOk("You gained ->#b" + mesoQuantity + " Mesos");

        cm.gainMeso(mesoQuantity);
        cm.gainItem(2433942, -1);
        cm.dispose();
        } else {
            cm.sendOk("You need to be level 200 or higher to use those.");
            cm.dispose();
        }


    }