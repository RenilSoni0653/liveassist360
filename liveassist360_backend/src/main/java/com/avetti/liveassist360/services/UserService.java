package com.avetti.liveassist360.services;

import com.avetti.liveassist360.models.UserStatus;
import com.avetti.liveassist360.models.User;
import java.util.List;


public interface UserService {
    public User authenticateUser(User user);

    public List<User> findAllUsers();

    public User changeAccountStatusById(int id, UserStatus userStatus);

    public List<User> getOnlineUsers();

    public Boolean signOutUser(int userId);
}
