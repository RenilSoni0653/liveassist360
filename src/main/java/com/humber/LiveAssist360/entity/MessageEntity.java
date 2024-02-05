package com.humber.LiveAssist360.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "message")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int messageID;

    @ManyToOne()
    @JoinColumn(name = "historyID", referencedColumnName = "historyID")
    private HistoryEntity historyID;

    @NotBlank(message = "Message should not be empty.")
    private String messageContent;

    private String senderType;

    @ManyToOne()
    @JoinColumn(name = "senderID", referencedColumnName = "representativeID")
    private RepresentativeEntity senderID;

    @ManyToOne()
    @JoinColumn(name = "receiverID", referencedColumnName = "customerID")
    private CustomerEntity receiverID;

    private int receiverType;
}
