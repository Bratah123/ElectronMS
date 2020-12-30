importPackage(Packages.server.named);

var status = 0;

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
    var intro = "Welcome Where to?!'\r\n";
    intro += "#L0#To Showa Town\r\n#L1#To Ninja Castle\r\n#L2#To The Mushroom Shrine"
    cm.sendSimple(intro);


}
    else if (status == 1) {
    if (selection == 0) {
    cm.dispose();
    cm.warp(801000000);
    }
    if (selection == 1) {
    cm.dispose();
    cm.warp(800040000);
    }
    if (selection ==2) {
    cm.dispose();
    cm.warp(800000000);
    }
    }

}

