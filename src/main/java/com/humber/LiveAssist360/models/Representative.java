package com.humber.LiveAssist360.models;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Representative {
    private int representativeID;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String role;
    private int isActive;
}
