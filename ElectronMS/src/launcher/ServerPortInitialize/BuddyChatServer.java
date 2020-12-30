package launcher.ServerPortInitialize;

import java.io.IOException;
import java.net.InetSocketAddress;

import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.SimpleByteBufferAllocator;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;

import constants.ServerConstants;
import handlers.Chat.ChatCodeFactory;
import handlers.Chat.ChatServerHandler;

public class BuddyChatServer {

    private static final int PORT = ServerConstants.BuddyChatPort;
    private static final BuddyChatServer Instance = new BuddyChatServer();

    public static BuddyChatServer getInstance() {
        return Instance;
    }

    public final void InitConfig() {
        try {
            /* Start Socket Configuration */
            ByteBuffer.setUseDirectBuffers(false);
            ByteBuffer.setAllocator(new SimpleByteBufferAllocator());

            IoAcceptor acceptor = new SocketAcceptor();
            final SocketAcceptorConfig cfg = new SocketAcceptorConfig();
            cfg.getSessionConfig().setTcpNoDelay(true);
            cfg.setDisconnectOnUnbind(true);
            cfg.getFilterChain().addLast("codec", new ProtocolCodecFilter(new ChatCodeFactory()));
            InetSocketAddress inetSocketadd = new InetSocketAddress(PORT);
            acceptor.bind(inetSocketadd, new ChatServerHandler(), cfg);
            /* Exit socket setup */
            System.out.println("[Notification] Friend Chat Server " + PORT + " Successfully opened port.");
        } catch (IOException e) {
            System.err.println("[Error] Friend Chat Server " + PORT + " Failed to open port.");
            e.printStackTrace();
        }
    }
}
