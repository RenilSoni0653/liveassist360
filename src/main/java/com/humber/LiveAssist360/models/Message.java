package com.humber.LiveAssist360.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private int messageID;
    private int historyID;
    private String messageContent;
    private String senderType;
    private int senderID;
    private String receiverID;
    private int receiverType;
}
