package com.avetti.liveassist360.repositories;

import com.avetti.liveassist360.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllBySenderIdAndReceiverId(int senderId, int receiverId);
    List<Message> findAllByRoom(String room);
    Optional<Message> findFirstByOrderByRoomAsc();

    List<Message> findByRoom(String roomId);
}
