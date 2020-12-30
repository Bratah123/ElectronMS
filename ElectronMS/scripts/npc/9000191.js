importPackage(Packages.server.named);

var status = 0;
var Event_Trophy = 4000038;


function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
    var intro = "Welcome to the Event Shop!'\r\n";
    intro += "#L0#Emote shop"
    cm.sendSimple(intro);


}
    else if (status == 1) {
    if (selection == 0) {
    cm.dispose();
    cm.openNpc(9000192);
        }
    }
}
