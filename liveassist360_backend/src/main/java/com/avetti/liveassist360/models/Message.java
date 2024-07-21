package com.avetti.liveassist360.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private int senderId;
    private int receiverId;
    private String room;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Date createdDateTime;

    private String username;

    @Enumerated(EnumType.STRING)
    private MessageType messageType;
}
