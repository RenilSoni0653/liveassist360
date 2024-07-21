package com.avetti.liveassist360.services;

import com.avetti.liveassist360.models.*;
import com.avetti.liveassist360.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements  UserService {
    private final UserRepository userRepository;

    @Override
    public User authenticateUser(User user) {
        boolean userExists = userRepository.existsByEmailAndProviderId(user.getEmail(), user.getProviderId());
        if(userExists) {
            User existingUser = userRepository.findUserByEmailAndProviderId(user.getEmail(), user.getProviderId()).orElse(null);
            if (existingUser != null) {
                existingUser.setConnectionStatus(ConnectionStatus.ONLINE);
                userRepository.save(existingUser);
                return existingUser;
            } else {
                return null;
            }
        } else {
            if(user.getEmail().equals("rebootcapstone4@gmail.com")) {
                user.setRole(Role.ADMIN);
            } else {
                user.setRole(Role.USER);
            }
            user.setConnectionStatus(ConnectionStatus.ONLINE);
            user.setUserStatus(UserStatus.ACTIVE);
            if(user.getProviderId().equals(Provider.keycloak)) {
                user.setProfilePicture("https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Fuser-avatar&psig=AOvVaw3RaUYf-x92HL-O03GTYYzu&ust=1709914290915000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKD-2KLF4oQDFQAAAAAdAAAAABAE");
            }
            return userRepository.save(user);
        }
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole().equals(Role.USER))
                .collect(Collectors.toList());
    }

    @Override
    public User changeAccountStatusById(int userId, UserStatus userStatus) {
        User userExists = userRepository.findById(userId).orElseThrow();

        if(!userExists.toString().isEmpty()) {
            userExists.setUserStatus(userStatus);
            if(userExists.getUserStatus().equals(UserStatus.INACTIVE)) {
                userExists.setConnectionStatus(ConnectionStatus.OFFLINE);
            } else {
                userExists.setConnectionStatus(ConnectionStatus.ONLINE);
            }
            userRepository.save(userExists);
        }

        return userExists;
    }

    @Override
    public List<User> getOnlineUsers() {
        ConnectionStatus userStatus = ConnectionStatus.ONLINE;
        return userRepository.findUserByConnectionStatus(userStatus);
    }

    @Override
    public Boolean signOutUser(int userId) {
        User user = userRepository.findById(userId).orElse(null);
        if(user != null) {
            user.setConnectionStatus(ConnectionStatus.OFFLINE);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
