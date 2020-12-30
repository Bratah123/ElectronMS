package launcher.ServerPortInitialize;

/**
 *
 * @author SoulGirlJP
 *
 * @Discord : SoulGirlJP#7859
 *
 **/

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import client.Character.MapleCharacter;
import client.Community.CommunityHandler;
import client.MapleClient;
import client.Community.MapleBuddy.BuddyList;
import client.Community.MapleBuddy.BuddyList.BuddyOperation;
import client.Community.MapleBuddy.BuddylistEntry;
import client.Community.MapleAlliance.MapleAlliance;
import client.Community.MapleGuild.MapleGuild;
import client.Community.MapleGuild.MapleGuildCharacter;
import client.Community.MapleGuild.MapleGuildContents;
import client.Community.MapleParty.MapleParty;
import client.Community.MapleParty.MaplePartyCharacter;
import client.Community.MapleGuild.MapleSquadLegacy;
import client.Skills.CoolDownValueHolder;
import constants.ServerConstants;
import constants.Data.ServerType;
import connections.Database.MYSQL;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import launcher.LauncherHandlers.ChracterTransfer;
import client.Stats.Buffs.MapleBuffValueHolder;
import client.Stats.Diseases.MapleDiseaseValueHolder;
import handlers.Global.PlayerHandler.MaplePlayerHolder;
import launcher.Utility.netty.MapleNettyDecoder;
import launcher.Utility.netty.MapleNettyEncoder;
import launcher.Utility.netty.MapleNettyHandler;
import connections.Packets.MainPacketCreator;
import launcher.LauncherHandlers.ServerShutdown;
import server.Events.EventManager.EventScriptManager;
import server.Maps.MapleWorldMap.MapleWorldMapProvider;
import server.Systems.PotSystem;
import server.Shops.HiredMerchant;
import tools.Timer;

public class ChannelServer {

    private int expRate, mesoRate, dropRate, flag;
    private short port = (short) ServerConstants.basePorts;
    private int channel, running_MerchantID = 0;
    private String serverMessage, ip, name, recommendedMessage, eventMessage;
    private boolean shutdown = false, finishedShutdown = false, MegaphoneMuteState = false;
    private MaplePlayerHolder players;
    private Properties props = new Properties();
    private final MapleWorldMapProvider mapFactory = new MapleWorldMapProvider();
    private static final Map<Integer, ChannelServer> instances = new HashMap<>();
    private final Map<Integer, MapleGuildContents> gsStore = new HashMap<>();
    private final Map<String, MapleSquadLegacy> mapleSquads = new HashMap<>();
    private final Map<Integer, HiredMerchant> merchants = new HashMap<>();
    private final Lock merchant_mutex = new ReentrantLock();
    private EventScriptManager eventManager;
    private boolean smegaMuted = false;
    public boolean is얼리기 = false;
    private boolean isforce = true;
    private boolean isOp = false;
    private ChannelFuture cf;

    public ChannelServer serverStart(int channelid) {
        this.channel = channelid;
        expRate = ServerConstants.defaultExpRate;
        mesoRate = ServerConstants.defaultMesoRate;
        dropRate = ServerConstants.defaultDropRate;
        serverMessage = ServerConstants.serverMessage;
        eventManager = new EventScriptManager(this, ServerConstants.events.split(" "));
        name = ServerConstants.serverName;
        recommendedMessage = ServerConstants.recommendMessage;
        eventMessage = ServerConstants.eventMessage;
        flag = ServerConstants.defaultFlag;

        port = (short) (ServerConstants.basePorts + getChannel());

        players = new MaplePlayerHolder();
        mapFactory.setChannel(this.channel);

        EventLoopGroup bossGroup = new NioEventLoopGroup();
        EventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            ServerBootstrap bootstrap = new ServerBootstrap();
            bootstrap.group(bossGroup, workerGroup).channel(NioServerSocketChannel.class)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        public void initChannel(SocketChannel ch) {
                            ch.pipeline().addLast("decoder", new MapleNettyDecoder());
                            ch.pipeline().addLast("encoder", new MapleNettyEncoder());
                            ch.pipeline().addLast("readTimeoutHandler", new ReadTimeoutHandler(5000));
                            ch.pipeline().addLast("writeTimeoutHandler", new WriteTimeoutHandler(5000));
                            ch.pipeline().addLast("handler", new MapleNettyHandler(ServerType.CHANNEL, channel));
                        }
                    }).childOption(ChannelOption.SO_KEEPALIVE, true).childOption(ChannelOption.SO_KEEPALIVE, true);
            cf = bootstrap.bind(port).sync(); // (7)

            System.out.println("[Notification] channel " + (getChannel() == 0 ? 1 : getChannel() == 1 ? "20세이상" : getChannel())
                    + " The server " + port + " Successfully opened port.");
            // eventManager.init();
        } catch (InterruptedException e) {
            System.out.println("[Error] Channel server " + port + " Failed to open port.");
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
        Runtime.getRuntime().addShutdownHook(new Thread(new ShutDownListener()));
        return this;
    }

    public final void shutdown() {
        shutdown = true;
        System.out.println("[Notification] " + channel + " Channel server starts to shut down.");
        closeAllMerchant();
        PotSystem.SaveToDB();
        players.disconnectAll();
        finishedShutdown = true;
        cf = null;
    }

    public final boolean hasFinishedShutdown() {
        return finishedShutdown;
    }

    public final MapleWorldMapProvider getMapFactory(int world) {
        return mapFactory;
    }

    public final MapleWorldMapProvider getMapFactory() {
        return mapFactory;
    }

    public static ChannelServer getInstance(final int channel) {
        return instances.get(channel);
    }

    public final void addPlayer(final MapleCharacter chr) {
        players.registerPlayer(chr);
    }

    public final MaplePlayerHolder getPlayerStorage() {
        return players;
    }

    public final void removePlayer(final MapleCharacter chr) {
        if (chr != null) {
            players.deregisterPlayer(chr);
        }
    }

    public final String getServerMessage() {
        return serverMessage;
    }

    public final void setServerMessage(final String newMessage) {
        serverMessage = newMessage;
        broadcastPacket(MainPacketCreator.serverMessage(serverMessage));
    }

    public final void broadcastPacket(final byte[] data) {
        players.broadcastPacket(data);
    }

    public final void broadcastSmegaPacket(final byte[] data) {
        players.broadcastSmegaPacket(data);
    }

    public final void broadcastGMPacket(final byte[] data) {
        players.broadcastGMPacket(data);
    }

    public final int getExpRate() {
        return expRate;
    }

    public final void setExpRate(final int expRate) {
        this.expRate = expRate;
    }

    public final int getChannel() {
        return channel;
    }

    public final void setChannel(final int channel) {
        instances.remove(channel);

        instances.put(channel, this);
        this.channel = channel;
        mapFactory.setChannel(channel);
    }

    public static Collection<ChannelServer> getAllInstances() {
        return Collections.unmodifiableCollection(instances.values());
    }

    public final String getIP() {
        return ip;
    }

    public final String getProperty(final String name) {
        return props.getProperty(name);
    }

    public final boolean isShutdown() {
        return shutdown;
    }

    public final int getLoadedMaps(int world) {
        return getMapFactory(world).getLoadedMaps();
    }

    public final EventScriptManager getEventSM() {
        return eventManager;
    }

    public final void reloadEvents() {
        eventManager.cancel();
        eventManager = new EventScriptManager(this, ServerConstants.events.split(" "));
        eventManager.init();

    }

    public final int getMesoRate() {
        return mesoRate;
    }

    public final void setMesoRate(final int mesoRate) {
        this.mesoRate = mesoRate;
    }

    public final int getDropRate() {
        return dropRate;
    }

    public final void setDropRate(final int dropRate) {
        this.dropRate = dropRate;
    }

    public final MapleGuild getGuild(final MapleGuildCharacter mgc) {
        final int gid = mgc.getGuildId();
        MapleGuild g;
        g = CommunityHandler.getInstance().getGuild(gid);
        if (gsStore.get(gid) == null) {
            assert g != null;
            gsStore.put(gid, new MapleGuildContents(g));
        }
        return g;
    }

    public final MapleGuildContents getGuildSummary(final int gid) {
        if (gsStore.containsKey(gid)) {
            return gsStore.get(gid);
        }
        // this shouldn't happen much, if ever, but if we're caught
        // without the summary, we'll have to do a worldop
        final MapleGuild g = CommunityHandler.getInstance().getGuild(gid);
        if (g != null) {
            gsStore.put(gid, new MapleGuildContents(g));
        }
        return gsStore.get(gid); // if g is null, we will end up returning null
    }

    public final void updateGuildSummary(final int gid, final MapleGuildContents mgs) {
        gsStore.put(gid, mgs);
    }

    
    public static void InitChannels() {
        
        try {
            for (int i = 0; i < ServerConstants.ChannelCount; i++) {
                instances.put(i, new ChannelServer().serverStart(i));
                instances.get(i).eventManager.init();
            }
        } catch (Exception e) {
            System.out.println("[Error] Channel server open failed. startServer()");
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public final List<HiredMerchant> searchMerchant(final int itemSearch) {
        final List<HiredMerchant> list = new LinkedList<>();
        merchant_mutex.lock();
        try {
            for (HiredMerchant hm : merchants.values()) {
                if (hm.searchItem(itemSearch).size() > 0) {
                    list.add(hm);
                }
            }
        } finally {
            merchant_mutex.unlock();
        }
        return list;
    }

    private final class ShutDownListener implements Runnable {

        @Override
        public void run() {
            closeAllMerchant();
            players.disconnectAll();
            finishedShutdown = true;
        }
    }

    public final MapleSquadLegacy getMapleSquad(final String type) {
        return mapleSquads.get(type);
    }

    public final boolean addMapleSquad(final MapleSquadLegacy squad, final String type) {
        if (mapleSquads.get(type) == null) {
            mapleSquads.remove(type);
            mapleSquads.put(type, squad);
            return true;
        }
        return false;
    }

    public final void removeMapleSquad(final String type) {
        mapleSquads.remove(type);
    }

    public final void saveAllMerchant() {
        for (HiredMerchant merch : merchants.values()) {
            merch.saveItems(merch);
        }
    }

    public final void closeAllMerchant() {
        final Iterator<HiredMerchant> merchants_ = merchants.values().iterator();
        while (merchants_.hasNext()) {
            merchants_.next().closeShop(true, false);
            merchants_.remove();
        }
    }

    public final int addMerchant(final HiredMerchant hMerchant) {
        merchant_mutex.lock();

        int runningmer;
        try {
            runningmer = running_MerchantID;
            merchants.put(running_MerchantID, hMerchant);
            running_MerchantID++;
        } finally {
            merchant_mutex.unlock();
        }
        return runningmer;
    }

    public final void removeMerchant(final HiredMerchant hMerchant) {
        merchant_mutex.lock();

        try {
            merchants.remove(hMerchant.getStoreId());
        } finally {
            merchant_mutex.unlock();
        }
    }

    public final boolean constainsMerchant(final int accid) {
        boolean contains = false;

        merchant_mutex.lock();
        try {

            for (HiredMerchant hiredMerchant : merchants.values()) {
                if (hiredMerchant.getOwnerAccId() == accid) {
                    contains = true;
                    break;
                }
            }
        } finally {
            merchant_mutex.unlock();
        }
        return contains;
    }

    public final int getMapMerchant(final int accid) {
        int map = -1;

        merchant_mutex.lock();
        try {

            for (HiredMerchant d : merchants.values()) {
                if ((d).getOwnerAccId() == accid) {
                    map = d.getMap().getId();
                    break;
                }
            }
        } finally {
            merchant_mutex.unlock();
        }
        return map;
    }

    public final void toggleMegaponeMuteState() {
        this.MegaphoneMuteState = !this.MegaphoneMuteState;
    }

    public final boolean getMegaphoneMuteState() {
        return MegaphoneMuteState;
    }

    public final List<MapleCharacter> getPartyMembers(final MapleParty party) {
        List<MapleCharacter> partym = new LinkedList<>();
        for (final MaplePartyCharacter partychar : party.getMembers()) {
            if (partychar.getChannel() == getChannel()) { // Make sure the thing doesn't get duplicate plays due to ccing bug.
                MapleCharacter chr = getPlayerStorage().getCharacterByName(partychar.getName());
                if (chr != null) {
                    partym.add(chr);
                }
            }
        }
        return partym;
    }

    public void whisper(String sender, String target, int channel, String message) {

        if (isMyChannelConnected(target)) {
            getPlayerStorage().getCharacterByName(target).getClient().getSession()
                    .writeAndFlush(MainPacketCreator.getWhisper(sender, channel, message));
        }

    }

    public boolean isMyChannelConnected(String charName) {
        return getPlayerStorage().getCharacterByName(charName) != null;
    }

    public boolean isMyChannelConnected(int id) {
        return getPlayerStorage().getCharacterById(id) != null;
    }

    public boolean isMyChannelCharacterListConnected(List<String> charName) {
        for (final String c : charName) {
            if (getPlayerStorage().getCharacterByName(c) != null) {
                return true;
            }
        }
        return false;
    }

    public static boolean isCharacterListConnected(List<String> charName, boolean isLogin) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            for (final String c : charName) {
                if (cserv.getPlayerStorage().getCharacterByName(c) != null) {
                    if (isLogin) {
                        cserv.getPlayerStorage().getCharacterByName(c).getClient().disconnect(true, false);
                    }
                    return false;
                }
            }
        }
        return false;
    }

    public static boolean isConnected(int cid) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            if (cserv.getPlayerStorage().getCharacterById(cid) != null) {
                return true;
            }
        }
        return false;
    }

    public static void allToggleMegaphoneMuteState() {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.toggleMegaphoneMuteState();
        }
    }

    public void toggleMegaphoneMuteState() {
        smegaMuted = !smegaMuted;
    }

    public void shutdownLogin() {
        LoginServer.getInstance().shutdown();
    }

    public void updateBuddies(int characterId, int channel, int[] buddies, boolean offline) {
        final MaplePlayerHolder playerStorage = getPlayerStorage();
        for (int buddy : buddies) {
            final MapleCharacter chr = playerStorage.getCharacterById(buddy);
            if (chr != null) {
                final BuddylistEntry ble = chr.getBuddylist().get(characterId);
                if (ble != null && ble.isVisible()) {
                    int mcChannel;
                    if (offline) {
                        ble.setChannel(-1);
                        mcChannel = -1;
                    } else {
                        ble.setChannel(channel);
                        mcChannel = channel;
                    }
                    chr.getBuddylist().put(ble);
                    chr.getClient().getSession().writeAndFlush(MainPacketCreator
                            .updateBuddyChannel(ble.getCharacterId(), mcChannel, ble.getName(), ble.isVisible()));
                }
            }
        }
    }

    public void buddyChanged(int cid, int cidFrom, String name, int channel, BuddyOperation operation, int level,
            int job) {
        final MapleCharacter addChar = getPlayerStorage().getCharacterById(cid);
        if (addChar != null) {
            final BuddyList buddylist = addChar.getBuddylist();
            switch (operation) {
                case ADDED:
                    if (buddylist.contains(cidFrom)) {
                        buddylist.put(new BuddylistEntry(name, cidFrom, "Group not specified", channel, true, level, job));
                        addChar.getClient().getSession()
                                .writeAndFlush(MainPacketCreator.updateBuddyChannel(cidFrom, channel, name, true));
                    }
                    break;
                case DELETED:
                    if (buddylist.contains(cidFrom)) {
                        buddylist.put(new BuddylistEntry(name, cidFrom, "Group not specified", -1, buddylist.get(cidFrom).isVisible(),
                                level, job));
                        addChar.getClient().getSession().writeAndFlush(MainPacketCreator.updateBuddyChannel(cidFrom, -1,
                                name, buddylist.get(cidFrom).isVisible()));
                    }
                    break;
            }
        }
    }

    public int[] multiBuddyFindMain(int charIdFrom, int[] characterIds) {
        List<Integer> ret = new ArrayList<>(characterIds.length);
        final MaplePlayerHolder playerStorage = getPlayerStorage();
        for (int characterId : characterIds) {
            MapleCharacter chr = playerStorage.getCharacterById(characterId);
            if (chr != null) {
                if (chr.getBuddylist().containsVisible(charIdFrom)) {
                    ret.add(characterId);
                }
            }
        }
        int[] retArr = new int[ret.size()];
        int pos = 0;
        for (Integer i : ret) {
            retArr[pos++] = i;
        }
        return retArr;
    }

    public boolean isAvailable() {
        return true;
    }

    public static void sendPacket(List<Integer> targetIds, byte[] packet, int exception) {
        MapleCharacter c;
        for (int i : targetIds) {
            if (i == exception) {
                continue;
            }
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                c = cserv.getPlayerStorage().getCharacterById(i);
                if (c != null) {
                    c.getClient().getSession().writeAndFlush(packet);
                }
            }
        }
    }

    public static void sendGuildInfoPacket(List<Integer> targetIds) {
        MapleCharacter c;
        for (int i : targetIds) {
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                c = cserv.getPlayerStorage().getCharacterById(i);
                if (c != null) {
                    c.getClient().getSession().writeAndFlush(MainPacketCreator.showGuildInfo(c));
                }
            }
        }
    }

    public static void setGuildAndRank(List<Integer> cids, int guildid, int rank, int exception) {
        for (int cid : cids) {
            if (cid != exception) {
                setGuildAndRank(cid, guildid, rank, -1);
            }
        }
    }

    public static void setGuildAndRank(int cid, int guildid, int rank, int alliancerank) {
        MapleCharacter mc = null;
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            mc = cserv.getPlayerStorage().getCharacterById(cid);
            if (mc != null) {
                break;
            }
        }
        if (mc == null) {
            return;
        }
        boolean bDifferentGuild;
        if (guildid == -1 && rank == -1) { // just need a respawn
            bDifferentGuild = true;
        } else {
            bDifferentGuild = guildid != mc.getGuildId();
            mc.setGuildId(guildid);
            mc.setGuildRank(rank);
            mc.setAllianceRank(alliancerank);
            mc.saveGuildStatus();
        }
        if (bDifferentGuild) {
            mc.getMap().broadcastMessage(mc, MainPacketCreator.removePlayerFromMap(cid), false);
            mc.getMap().broadcastMessage(mc, MainPacketCreator.spawnPlayerMapobject(mc), false);
        }
        mc = null;
    }

    public static void setOfflineGuildStatus(int guildid, byte guildrank, int cid) {
        try {
            java.sql.Connection con = MYSQL.getConnection();
            java.sql.PreparedStatement ps = con
                    .prepareStatement("UPDATE characters SET guildid = ?, guildrank = ? WHERE id = ?");
            ps.setInt(1, guildid);
            ps.setInt(2, guildrank);
            ps.setInt(3, cid);
            ps.execute();
            ps.close();
            con.close();
        } catch (SQLException se) {
            // Sytem.out.println("SQLException: " + se.getLocalizedMessage() + se);
        }
    }

    public static void changeEmblem(int gid, List<Integer> affectedPlayers, MapleGuildContents mgs) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.updateGuildSummary(gid, mgs);
        }
        sendPacket(affectedPlayers, MainPacketCreator.guildEmblemChange(gid, mgs.getLogoBG(), mgs.getLogoBGColor(),
                mgs.getLogo(), mgs.getLogoColor()), -1);
        setGuildAndRank(affectedPlayers, -1, -1, -1); // respawn player
    }

    public static void ChannelChange_Data(ChracterTransfer Data, int characterid, int toChannel) {
        if (toChannel != -10 && toChannel != -20) {
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                if (cserv.getChannel() == toChannel) {
                    ChannelServer.getInstance(toChannel).getPlayerStorage().registerPendingPlayer(Data, characterid);
                }
            }
        } else if (toChannel == -10) {
            CashShopServer.getInstance().ChannelChange_Data(Data, characterid);
        } else {
            AuctionServer.getInstance().ChannelChange_Data(Data, characterid);
        }
    }

    public static MapleGuild getGuild(int id) {
        return CommunityHandler.getInstance().getGuild(id);
    }

    public static void setGuildMemberOnline(MapleGuildCharacter mgc, boolean bOnline, int channel) {
        CommunityHandler.getInstance().setGuildMemberOnline(mgc, bOnline, channel);
    }

    public static int addGuildMember(MapleGuildCharacter mgc, MapleClient c) {
        return CommunityHandler.getInstance().addGuildMember(mgc, c);
    }

    public static void guildChat(int gid, String name, int cid, String msg) {
        CommunityHandler.getInstance().guildChat(gid, name, cid, msg);
    }

    public static void leaveGuild(MapleGuildCharacter mgc) {
        CommunityHandler.getInstance().leaveGuild(mgc);
    }

    public static void changeRank(int gid, int cid, int newRank) {
        CommunityHandler.getInstance().changeRank(gid, cid, newRank);
    }

    public static void expelMember(MapleGuildCharacter initiator, String name, int cid) {
        CommunityHandler.getInstance().expelMember(initiator, name, cid);
    }

    public static void setGuildNotice(int gid, String notice) {
        CommunityHandler.getInstance().setGuildNotice(gid, notice);
    }

    public static void setGuildLeader(int gid, int cid) {
        CommunityHandler.getInstance().setGuildLeader(gid, cid);
    }

    public static int getSkillLevel(int gid, int sid) {
        return CommunityHandler.getInstance().getSkillLevel(gid, sid);
    }

    public static void purchaseSkill(int gid, int sid, String name, int cid, MapleCharacter chr, boolean purchase) {
        CommunityHandler.getInstance().purchaseSkill(gid, sid, name, cid, chr, purchase);
    }

    public static boolean activateSkill(int gid, int sid, String name) {
        return CommunityHandler.getInstance().activateSkill(gid, sid, name);
    }

    public static void memberLevelJobUpdate(MapleGuildCharacter mgc) {
        CommunityHandler.getInstance().memberLevelJobUpdate(mgc);
    }

    public static void changeRankTitle(int gid, String[] ranks) {
        CommunityHandler.getInstance().changeRankTitle(gid, ranks);
    }

    public static int createGuild(int leaderId, String name) {
        return CommunityHandler.getInstance().createGuild(leaderId, name);
    }

    public static void setGuildEmblem(int gid, short bg, byte bgcolor, short logo, byte logocolor) {
        CommunityHandler.getInstance().setGuildEmblem(gid, bg, bgcolor, logo, logocolor);
    }

    public static void disbandGuild(int gid) {
        CommunityHandler.getInstance().disbandGuild(gid);
    }

    public static void increaseGuildCapacity(int gid) {
        CommunityHandler.getInstance().increaseGuildCapacity(gid);
    }

    public static void gainGP(int gid, int amount) {
        CommunityHandler.getInstance().gainGP(gid, amount);
    }

    public static int getInvitedId(final int gid) {
        return CommunityHandler.getInstance().getInvitedId(gid);
    }

    public static void setInvitedId(final int gid, final int inviteid) {
        CommunityHandler.getInstance().setInvitedId(gid, inviteid);
    }

    public static int getGuildLeader(final int guildName) {
        return CommunityHandler.getInstance().getGuildLeader(guildName);
    }

    public static int getGuildLeader(final String guildName) {
        return CommunityHandler.getInstance().getGuildLeader(guildName);
    }

    public static MapleAlliance getAlliance(final int allianceid) {
        return CommunityHandler.getInstance().getAlliance(allianceid);
    }

    public static int getAllianceLeader(final int allianceid) {
        return CommunityHandler.getInstance().getAllianceLeader(allianceid);
    }

    public static void updateAllianceRanks(final int allianceid, final String[] ranks) {
        CommunityHandler.getInstance().updateAllianceRanks(allianceid, ranks);
    }

    public static void updateAllianceNotice(final int allianceid, final String notice) {
        CommunityHandler.getInstance().updateAllianceNotice(allianceid, notice);
    }

    public static boolean canInvite(final int allianceid) {
        return CommunityHandler.getInstance().canInvite(allianceid);
    }

    public static boolean changeAllianceLeader(final int allianceid, final int cid) {
        return CommunityHandler.getInstance().changeAllianceLeader(allianceid, cid);
    }

    public static boolean changeAllianceLeader(final int allianceid, final int cid, final boolean sameGuild) {
        return CommunityHandler.getInstance().changeAllianceLeader(allianceid, cid, sameGuild);
    }

    public static boolean changeAllianceRank(final int allianceid, final int cid, final int change) {
        return CommunityHandler.getInstance().changeAllianceRank(allianceid, cid, change);
    }

    public static boolean changeAllianceCapacity(final int allianceid) {
        return CommunityHandler.getInstance().changeAllianceCapacity(allianceid);
    }

    public static boolean disbandAlliance(final int allianceid) {
        return CommunityHandler.getInstance().disbandAlliance(allianceid);
    }

    public static boolean addGuildToAlliance(final int allianceid, final int gid) {
        return CommunityHandler.getInstance().addGuildToAlliance(allianceid, gid);
    }

    public static boolean removeGuildFromAlliance(final int allianceid, final int gid, final boolean expelled) {
        return CommunityHandler.getInstance().removeGuildFromAlliance(allianceid, gid, expelled);
    }

    public static void sendGuild(final int allianceid) {
        CommunityHandler.getInstance().sendGuild(allianceid);
    }

    public static void sendGuild(final byte[] packet, final int exceptionId, final int allianceid) {
        CommunityHandler.getInstance().sendGuild(packet, exceptionId, allianceid);
    }

    public static List<MapleGuild> findGuild(int world, int minGuildLevel, int maxGuildLevel, int minMemberSize, int maxMemberSize, int minAvgLevel, int maxAvgLevel) {
        return CommunityHandler.getInstance().getGuildForSearch(world, minGuildLevel, maxGuildLevel, minMemberSize, maxMemberSize, minAvgLevel, maxAvgLevel);
    }

    public static List<MapleGuild> findGuild(int worldid, byte mode, String text, boolean likeSearch) {
        return CommunityHandler.getInstance().getGuildForSearch(worldid, mode, text, likeSearch);
    }

    public static boolean createAlliance(final MapleClient client, final String alliancename, final int cid, final int cid2, final int gid, final int gid2) {
        return CommunityHandler.getInstance().createAlliance(client, alliancename, cid, cid2, gid, gid2);
    }

    public static void allianceChat(final int gid, final String name, final int cid, final String msg) {
        CommunityHandler.getInstance().allianceChat(gid, name, cid, msg);
    }

    public static void setNewAlliance(final int gid, final int allianceid) {
        CommunityHandler.getInstance().setNewAlliance(gid, allianceid);
    }

    public static void setOldAlliance(final int gid, final boolean expelled, final int allianceid) {
        CommunityHandler.getInstance().setOldAlliance(gid, expelled, allianceid);
    }

    public static List<byte[]> getAllianceInfo(final int allianceid, final boolean start) {
        return CommunityHandler.getInstance().getAllianceInfo(allianceid, start);
    }

    public static void addBuffsToStorage(int playerId, List<MapleBuffValueHolder> toStore) {
        CommunityHandler.getInstance().getPlayerBuffStorage().addBuffsToStorage(playerId, toStore);
    }

    public static List<MapleBuffValueHolder> getBuffsFromStorage(int playerId) {
        return CommunityHandler.getInstance().getPlayerBuffStorage().getBuffsFromStorage(playerId);
    }

    public static void addCooldownsToStorage(int playerId, List<CoolDownValueHolder> toStore) {
        CommunityHandler.getInstance().getPlayerBuffStorage().addCooldownsToStorage(playerId, toStore);
    }

    public static List<CoolDownValueHolder> getCooldownsFromStorage(int playerId) {
        return CommunityHandler.getInstance().getPlayerBuffStorage().getCooldownsFromStorage(playerId);
    }

    public static void addDiseaseToStorage(int playerId, List<MapleDiseaseValueHolder> toStore) {
        CommunityHandler.getInstance().getPlayerBuffStorage().addDiseaseToStorage(playerId, toStore);
    }

    public static List<MapleDiseaseValueHolder> getDiseaseFromStorage(int playerId) {
        return CommunityHandler.getInstance().getPlayerBuffStorage().getDiseaseFromStorage(playerId);
    }

    public static void shutdown(int time) {
        System.out.println("[Exit] Closing login server.");
        LoginServer.getInstance().shutdown();
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            Timer.WorldTimer.getInstance().schedule(new ServerShutdown(cserv.getChannel()), time);
        }
    }

    public static MapleCharacter getCharByName(String name) {
        Collection<ChannelServer> channels = ChannelServer.getAllInstances();
        for (ChannelServer channel : channels) {
            MapleCharacter player = channel.getPlayerStorage().getCharacterByName(name);
            if(player != null) {
                return player;
            }
        }
        return null;
    }

    public int getChannelCount() {
        return ServerConstants.ChannelCount;
    }

    public String getServerName() {
        return name;
    }

    public String getRecommendedMessage() {
        return recommendedMessage;
    }

    public int getFlag() {
        return flag;
    }

    public String getEventMessage() {
        return this.eventMessage;
    }

    public boolean 얼리기() {
        return this.is얼리기;
    }

    public void 얼리기(boolean a) {
        this.is얼리기 = a;
    }

    public boolean isforce() {
        return isforce;
    }

    public void setforce(boolean a) {
        isforce = a;
    }

    public void setOpen(boolean a) {
        this.isOp = a;
    }

    public boolean getOpen() {
        return isOp;
    }

    public int getConnectedClients() {
        return getPlayerStorage().getConnectedClients();
    }
        public static int getOnlineConnections() {
        int r = 0;
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            r += cserv.getConnectedClients();
        }
        return r;
    }

    public static Map<Integer, Integer> getChannelLoad() {
        Map<Integer, Integer> ret = new HashMap<>();
        for (ChannelServer cs : instances.values()) {
            ret.put(cs.getChannel(), cs.getConnectedClients());
        }
        return ret;
    }
    
    private boolean burn;
    public boolean BurningServer() 
    {
        return burn;
    }
    public void BurningServer(boolean burning) 
    {
        this.burn = burning;
    }
}
