package com.humber.LiveAssist360.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "customers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int customerID;

    @NotBlank(message = "Firstname should not be empty")
    @Size(min = 3, max = 10)
    private String firstName;

    private String lastName;

    @Email(message = "Enter valid email-id.")
    private String email;

    @NotBlank(message = "Enter valid postal code.")
    @Size(min = 3, max = 6)
    private String postalCode;

    @NotBlank(message = "Enter status.")
    private int isActive;
}
