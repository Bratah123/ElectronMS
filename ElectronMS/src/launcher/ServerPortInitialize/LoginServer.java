package launcher.ServerPortInitialize;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import connections.Database.MYSQL;
import constants.Data.ServerType;
import constants.ServerConstants;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.timeout.IdleStateHandler;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import launcher.LauncherHandlers.MapleLoginHelper;
import launcher.LauncherHandlers.MapleRankingWorker;
import launcher.Utility.netty.MapleNettyDecoder;
import launcher.Utility.netty.MapleNettyEncoder;
import launcher.Utility.netty.MapleNettyHandler;
import tools.Timer.WorldTimer;

public class LoginServer {

    public static int PORT = ServerConstants.LoginPort;
    private String serverName, eventMessage;
    private byte flag;
    private int userLimit;
    private static final LoginServer instance = new LoginServer();
    public static boolean Running = false;

    public List<String> ip = new ArrayList<>();

    public static LoginServer getInstance() {
        return instance;
    }

    public void InitConfig() {
        try {
            userLimit = ServerConstants.defaultMaxChannelLoad;
            serverName = ServerConstants.serverName;
            eventMessage = ServerConstants.eventMessage;
            flag = ServerConstants.defaultFlag;
            try {
                Connection con = MYSQL.getConnection();
                PreparedStatement ps = con.prepareStatement("UPDATE accounts SET loggedin = 0");
                ps.executeUpdate();
                ps.close();
                con.close();
            } catch (SQLException ex) {
                throw new RuntimeException("[Error] Failed to close all characters. Please make sure the database connection is correct.");
            }
        } catch (Exception re) {
            System.err.println("[Error] An error occurred while running the login server.");
            if (!ServerConstants.realese) {
                re.printStackTrace();
            }
        }

        WorldTimer.getInstance().start();
        WorldTimer.getInstance().register(new MapleRankingWorker(), 1000 * 60 * 60);
        MapleLoginHelper.getInstance();
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
                            ch.pipeline().addLast("idleStateHandler", new IdleStateHandler(600, 300, 0));
                            ch.pipeline().addLast("readTimeoutHandler", new ReadTimeoutHandler(30000));
                            ch.pipeline().addLast("writeTimeoutHandler", new WriteTimeoutHandler(30000));
                            ch.pipeline().addLast("handler", new MapleNettyHandler(ServerType.LOGIN, -1));
                        }
                    }).option(ChannelOption.SO_BACKLOG, 128).childOption(ChannelOption.SO_KEEPALIVE, true);
            ChannelFuture f = bootstrap.bind(PORT).sync(); // (7)
            /* Exit socket setup */
            System.out.println("[Notification] The login server " + PORT + " Successfully opened port.");
        } catch (InterruptedException e) {
            System.err.println("[Error] Login server " + PORT + " Failed to open port.");
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public void shutdown() {
        System.out.println("[End] Shut down the server..");
        WorldTimer.getInstance().stop();
        Running = false;
    }

    public String getServerName() {
        return serverName;
    }

    public String getEventMessage() {
        return eventMessage;
    }

    public byte getFlag() {
        return flag;
    }

    public void setEventMessage(String newMessage) {
        this.eventMessage = newMessage;
    }

    public void setFlag(byte newflag) {
        flag = newflag;
    }

    public int getUserLimit() {
        return userLimit;
    }

    public void setUserLimit(int newLimit) {
        userLimit = newLimit;
    }
}
