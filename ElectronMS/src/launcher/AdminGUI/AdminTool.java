package launcher.AdminGUI;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.List;

import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.SimpleByteBufferAllocator;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;


/**
 *
 * @author SoulGirlJP#7859
 * 
 **/

public class AdminTool {
    public static List<IoSession> session = new ArrayList<>();
    
    public static void InitConfig() {
        int PORT = 9700;
        try {
            /* Start Socket Configuration */
            ByteBuffer.setUseDirectBuffers(false);
            ByteBuffer.setAllocator(new SimpleByteBufferAllocator());

            IoAcceptor acceptor = new SocketAcceptor();
            final SocketAcceptorConfig config = new SocketAcceptorConfig();
            config.getSessionConfig().setTcpNoDelay(true);
            config.setDisconnectOnUnbind(true);
            InetSocketAddress inetSocketadd = new InetSocketAddress(PORT);
            acceptor.bind(inetSocketadd, new AdminToolHandler(), config);
            /* Exit socket setup */
            System.out.println("[Notice] Server Manager " + PORT + " Port Successful Opened. \r\n");
            } catch (IOException e) {
            System.err.println("[Error] Manager Server " + PORT + " Port Failed To Open. \r\n");
            e.printStackTrace();
            }
    }

    public static void broadcastMessage(ByteBuffer buff) {
        for (IoSession se : session) {
            se.write(buff);
        }
    }
}
