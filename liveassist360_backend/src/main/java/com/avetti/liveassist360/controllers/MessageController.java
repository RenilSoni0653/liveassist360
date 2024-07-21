package com.avetti.liveassist360.controllers;

import com.avetti.liveassist360.models.Message;
import com.avetti.liveassist360.models.MessageType;
import com.avetti.liveassist360.services.MessageServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class MessageController {
    private final MessageServiceImpl messageService;

    @CrossOrigin
    @GetMapping("/{room}")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String room) {
        return ResponseEntity.ok(messageService.getMessages(room));
    }

    @CrossOrigin
    @GetMapping("/messages/{roomID}")
    public ResponseEntity<List<Message>> getChatHistoryByRoomID(@PathVariable String roomID) {
        List<Message> chatHistory = messageService.getChatHistoryByRoomID(roomID);

        // Filter messages by message type "CLIENT"
        List<Message> clientMessages = chatHistory.stream()
                .filter(message -> message.getMessageType().equals(MessageType.CLIENT))
                .collect(Collectors.toList());

        return ResponseEntity.ok(clientMessages);
    }
}
