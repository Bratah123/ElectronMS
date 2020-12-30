importPackage(Packages.packet.creators);
importPackage(Packages.handler.channel);
importPackage(Packages.constants);
importPackage(Packages.server);
importPackage(Packages.tools.packet);
importPackage(Packages.tools);
importPackage(java.util);

var status;

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;

                if(status == 0) {
                        cm.sendYesNo("Are you sure you want to the leave the map?.");
                }
                else if (status == 1) {
                cm.warp(970060000);
                cm.dispose();
                }
        }
}