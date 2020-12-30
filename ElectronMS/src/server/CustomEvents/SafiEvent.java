package server.CustomEvents;

import connections.Packets.MainPacketCreator;
import launcher.Utility.WorldBroadcasting;
import tools.Timer;

public class SafiEvent {

    public static boolean safi = false;
    private static java.util.Timer safiTime = null;
    public static boolean safiLimit = false;

    public static void Safi() {
        safi = true;
        safiLimit = true;
        safiCancel();
        WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(11, "Experience event started! If you don't go hunting fast, you'll regret it.?"));
    }

    public static void safiCancel() {
        Timer.EtcTimer tMan1 = Timer.EtcTimer.getInstance();
        tMan1.schedule(() -> {
            WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(11, "I'm sorry, but the event is over ... See you next time.~"));
            safiLimit();
            safi = false;
        }, 1800000);
    }

    public static void safiLimit() {
        Timer.EtcTimer tMan1 = Timer.EtcTimer.getInstance();
        tMan1.schedule(() -> safiLimit = false, 1000 * 30 * 15);
    }


}
