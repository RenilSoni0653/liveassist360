package com.avetti.liveassist360.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String username;
    private String email;
    @Enumerated(EnumType.STRING)
    private ConnectionStatus connectionStatus;
    private String profilePicture;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;
    private String roomId;
    @Enumerated(EnumType.STRING)
    private Provider providerId;

    @PostPersist
    public void setRoom() {
        if(userId != null) {
            roomId = "Room_" + userId;
        }
    }
}
