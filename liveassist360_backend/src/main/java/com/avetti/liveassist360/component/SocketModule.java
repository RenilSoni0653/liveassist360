package com.avetti.liveassist360.component;

import com.avetti.liveassist360.constants.Constants;
import com.avetti.liveassist360.models.Message;
import com.avetti.liveassist360.services.SocketService;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
@Slf4j
public class SocketModule {
    private final SocketIOServer server;
    private final SocketService socketService;
    private final Map<String, Boolean> userJoinedMap = new ConcurrentHashMap<>();

    public SocketModule(SocketIOServer server, SocketService socketService) {
        this.server = server;
        this.socketService = socketService;
        server.addConnectListener(onConnected());
        server.addDisconnectListener(onDisconnected());
        server.addEventListener("send_message", Message.class, onChatReceived());
    }

    private DataListener<Message> onChatReceived() {
        return (senderClient, data, ackSender) -> {
            log.info(data.toString());
            socketService.saveMessage(senderClient, data);
        };
    }

    private ConnectListener onConnected() {
        return (client) -> {
            var params = client.getHandshakeData().getUrlParams();
            String room = params.get("room").stream().collect(Collectors.joining());
            String username = params.get("username").stream().collect(Collectors.joining());
            String senderId = "0";
            client.joinRoom(room);

            if (!userJoinedMap.containsKey(client.getSessionId().toString())) {
                socketService.saveInfoMessage(client, String.format(Constants.WELCOME_MESSAGE, username), room, Integer.parseInt(senderId));
                userJoinedMap.put(client.getSessionId().toString(), true);
            }

            log.info("Socket ID[{}] - room[{}] - username [{}]  Connected to chat module through", client.getSessionId().toString(), room, username);
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            var params = client.getHandshakeData().getUrlParams();
            String room = params.get("room").stream().collect(Collectors.joining());
            String username = params.get("username").stream().collect(Collectors.joining());
            String senderId = "0";

            socketService.saveInfoMessage(client, String.format(Constants.DISCONNECT_MESSAGE, username), room, Integer.parseInt(senderId));
            log.info("Socket ID[{}] - room[{}] - username [{}]  disconnected to chat module through", client.getSessionId().toString(), room, username);
        };
    }
}