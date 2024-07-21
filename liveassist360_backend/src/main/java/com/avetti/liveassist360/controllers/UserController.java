package com.avetti.liveassist360.controllers;

import com.avetti.liveassist360.models.User;
import com.avetti.liveassist360.models.UserStatus;
import com.avetti.liveassist360.services.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final UserServiceImpl userService;

    @QueryMapping
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @MutationMapping
    public User changeAcStatusById(@Argument Integer userId, @Argument UserStatus userStatus) {
        return userService.changeAccountStatusById(userId, userStatus);
    }

    @PostMapping("/registration")
    public ResponseEntity<User> addNewUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.authenticateUser(user));
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> fetchUser() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @GetMapping("/users")
    public ResponseEntity<?> fetchUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @GetMapping("/online-users")
    public ResponseEntity<List<User>> fetchOnlineUsers() {
        return ResponseEntity.ok(userService.getOnlineUsers());
    }

    @PostMapping("/logout")
    public ResponseEntity<Boolean> signOutUser(@RequestBody Map<String, Integer> requestBody) {
        System.out.println("logout " + requestBody.get("userId"));
        return ResponseEntity.ok(userService.signOutUser(requestBody.get("userId")));
    }
}
