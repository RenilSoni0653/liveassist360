package com.humber.LiveAssist360.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Table(name = "representatives")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RepresentativeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int representativeID;

    @NotBlank(message = "Firstname should not be empty")
    @Size(min = 3, max = 10)
    private String firstName;

    private String lastName;

    @Email(message = "Enter valid email-id.")
    private String email;

    @NotBlank(message = "Password should not be empty.")
    private String password;

    @NotBlank(message = "Role should not be empty.")
    private String role;

    @NotBlank(message = "Status should not be empty.")
    private int isActive;

    public void setPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(password);
    }
}
