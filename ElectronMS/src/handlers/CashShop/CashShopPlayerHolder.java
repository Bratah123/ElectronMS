package handlers.CashShop;

import client.Character.MapleCharacter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import launcher.LauncherHandlers.ChracterTransfer;
import tools.Timer.WorldTimer;

public class CashShopPlayerHolder {

    private final Lock mutex = new ReentrantLock();
    private final Lock mutex2 = new ReentrantLock();
    private final Map<Integer, MapleCharacter> idToChar = new HashMap<>();
    private final Map<Integer, ChracterTransfer> PendingCharacter = new HashMap<>();

    public CashShopPlayerHolder() {
        // Prune once every 15 minutes
        WorldTimer.getInstance().schedule(new PersistingTask(), 900000L);
    }

    public final void registerPlayer(final MapleCharacter chr) {
        mutex.lock();
        try {
            idToChar.put(chr.getId(), chr);
        } finally {
            mutex.unlock();
        }
    }

    public final void registerPendingPlayer(final ChracterTransfer chr, final int playerid) {
        mutex2.lock();
        try {
            PendingCharacter.put(playerid, chr);// new Pair(System.currentTimeMillis(), chr));
        } finally {
            mutex2.unlock();
        }
    }

    public final void deregisterPlayer(final MapleCharacter chr) {
        mutex.lock();
        try {
            idToChar.remove(chr.getId());
        } finally {
            mutex.unlock();
        }
    }

    public final void deregisterPendingPlayer(final int charid) {
        mutex2.lock();
        try {
            PendingCharacter.remove(charid);
        } finally {
            mutex2.unlock();
        }
    }

    public final ChracterTransfer getPendingCharacter(final int charid) {
        final ChracterTransfer toreturn = PendingCharacter.get(charid);// .right;
        if (toreturn != null) {
            deregisterPendingPlayer(charid);
        }
        return toreturn;
    }

    public final boolean isCharacterConnected(final String name) {
        boolean connected = false;

        mutex.lock();
        try {
            for (MapleCharacter mapleCharacter : idToChar.values()) {
                if (mapleCharacter.getName().equals(name)) {
                    connected = true;
                    break;
                }
            }
        } finally {
            mutex.unlock();
        }
        return connected;
    }

    public final void disconnectAll() {
        mutex.lock();
        try {
            final ArrayList<MapleCharacter> dcList = new ArrayList<>();
            final Iterator<MapleCharacter> itr = idToChar.values().iterator();
            MapleCharacter chr;
            while (itr.hasNext()) {
                chr = itr.next();

                chr.getClient().disconnect(false, true);
                // this.deregisterPlayer(chr);
                dcList.add(chr);
                chr.getClient().getSession().close();
            }

            for (final MapleCharacter character : dcList) {
                this.deregisterPlayer(character);
            }
        } finally {
            mutex.unlock();
        }
    }

    public class PersistingTask implements Runnable {

        @Override
        public void run() {
            mutex2.lock();
            try {
                final long currenttime = System.currentTimeMillis();

                // 40 sec
                PendingCharacter.entrySet().removeIf(integerChracterTransferEntry -> currenttime - integerChracterTransferEntry.getValue().TranferTime > 40000);
                WorldTimer.getInstance().schedule(new PersistingTask(), 900000);
            } finally {
                mutex2.unlock();
            }
        }
    }
}
