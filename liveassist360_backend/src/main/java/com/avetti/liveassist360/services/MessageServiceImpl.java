package com.avetti.liveassist360.services;

import com.avetti.liveassist360.models.Message;
import com.avetti.liveassist360.repositories.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;

    @Override
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public List<Message> getMessages(String room) {
        return messageRepository.findAllByRoom(room);
    }

    @Override
    public Optional<Message> findMessageByRoom() {
        return messageRepository.findFirstByOrderByRoomAsc();
    }

    @Override
    public List<Message> getChatHistoryByRoomID(String roomId) {
        return messageRepository.findByRoom(roomId);
    }
}
