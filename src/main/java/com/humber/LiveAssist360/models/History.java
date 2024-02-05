package com.humber.LiveAssist360.models;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class History {
    private int historyID;
    private int representativeID;
    private int customerID;
    private String startTime;
    private String endTime;
}
