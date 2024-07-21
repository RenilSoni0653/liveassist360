package com.avetti.liveassist360.repositories;

import com.avetti.liveassist360.models.ConnectionStatus;
import com.avetti.liveassist360.models.Provider;
import com.avetti.liveassist360.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Boolean existsByEmailAndProviderId(String email, Provider providerId);
    Optional<User> findUserByEmailAndProviderId(String email, Provider providerId);

    Optional<User> findUserByEmailAndUsername(String email, String username);
    List<User> findUserByConnectionStatus(ConnectionStatus connectionStatus);
}
