package server.Events;

import client.Character.MapleCharacter;
import client.ItemInventory.Inventory.MapleInventoryType;
import connections.Packets.MainPacketCreator;
import connections.Packets.UIPacket;
import tools.RandomStream.Randomizer;
import tools.Timer;

public class FishingHandler {
    public static int[] Items = {2430996}; //Bait code
    public static int FishingMap = 100000055;  //Map code
    public static int FishingChair = 3010432;  //Chair code
    
    public static void GainFishing(final MapleCharacter chr) {
        chr.getClient().send(UIPacket.showWZEffect("Effect/PvPEff.img/GradeUp", 1));
        int[] itemids = {4001187,4001187,4001187,4001188,4001188,4001188,4001189,4001189,4001189};
        int itemid = itemids[Randomizer.nextInt(itemids.length)];
        if (Randomizer.isSuccess(70)) {
            chr.send(UIPacket.getItemTopMsg(itemid, (itemid == 4001187 ? "Tone" : itemid == 4001188 ? "Body" : "Tooth") + "You've caught fish."));
        chr.gainItem(itemid, (short) 2, false, -1, "Items acquired by fishing");
        chr.gainItem(2430996, (short) -1, false, -1, null);
        } else if (Randomizer.isSuccess(30)) {
                  chr.gainItem(2430996, (short) -1, false, -1, null);
                  chr.getClient().getSession().write(MainPacketCreator.sendHint("I didn't save anything.", 250, 5));
        }
        Randomizer.nextInt(10);
    }
    
    public static void StartFishing(final MapleCharacter chr) {
        if (chr.getInventory(MapleInventoryType.ETC).getNumFreeSlot() < 5) {
           chr.Message("Please clear the space of the other tab more than 5 spaces and try again.");
           return;
        }
        if (!chr.haveItem(2430996)) {
           chr.Message("I didn't buy bait?");
           return;
        }
        chr.setFishing(true);
        chr.send(MainPacketCreator.getClock(15));
        Timer.CloneTimer.getInstance().schedule(() -> {
            if (chr.getChair() == FishingChair && chr.getMapId() == FishingMap) {
                GainFishing(chr);
                StartFishing(chr);
            } else {
                StopFishing(chr);
            }
        }, 15000);
    }

 
    public static void StopFishing(final MapleCharacter chr) {
        Timer.BuffTimer.getInstance().schedule(() -> chr.setFishing(false), 5000);
        chr.send(MainPacketCreator.stopClock());
    }
}
