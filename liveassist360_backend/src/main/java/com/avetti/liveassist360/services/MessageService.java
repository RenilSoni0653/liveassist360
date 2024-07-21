package com.avetti.liveassist360.services;

import com.avetti.liveassist360.models.Message;
import com.avetti.liveassist360.models.MessageType;

import java.util.List;
import java.util.Optional;

public interface MessageService {
    public Message saveMessage(Message message);

    public List<Message> getMessages(String room);
    Optional<Message> findMessageByRoom();

    List<Message> getChatHistoryByRoomID(String roomId);
}
