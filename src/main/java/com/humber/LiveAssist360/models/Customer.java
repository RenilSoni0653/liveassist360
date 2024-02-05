package com.humber.LiveAssist360.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    private int customerID;
    private String firstName;
    private String lastName;
    private String email;
    private String postalCode;
    private int isActive;
}
