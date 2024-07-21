package com.avetti.liveassist360;

import com.avetti.liveassist360.controllers.UserController;
import com.avetti.liveassist360.models.*;
import com.avetti.liveassist360.services.UserServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @MockBean
    UserServiceImpl userService;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    //Junit to add new user
    @Test
    public void addNewUser() throws Exception {
        User user = User.builder()
                .username("test_user")
                .email("test_user.com")
                .connectionStatus(ConnectionStatus.valueOf("OFFLINE"))
                .profilePicture("profile")
                .role(Role.ADMIN)
                .userStatus(UserStatus.ACTIVE)
                .providerId(Provider.keycloak)
                .roomId("123")
                .build();
        given(userService.authenticateUser(any(User.class)))
                .willAnswer((invocation) -> invocation.getArgument(0));

        // when - action or behaviour that we are going test
        ResultActions response = mockMvc.perform(post("/api/registration")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)));

        // then - verify the result or output using assert statements
        response.andDo(print()).
                andExpect(status().isOk())
                .andExpect(jsonPath("$.username",
                        is(user.getUsername())))
                .andExpect(jsonPath("$.email",
                        is(user.getEmail())))
                .andExpect(jsonPath("$.connectionStatus",
                        is(user.getConnectionStatus().toString())))
                .andExpect(jsonPath("$.providerId", is(user.getProviderId().toString())))
                .andExpect(jsonPath("$.roomId", is(user.getRoomId())));

    }

    // JUnit test for Get All users REST API
    @Test
    public void givenListOfUsers() throws Exception{
        // given - precondition or setup
        List<User> listOfUsers = new ArrayList<>();
        listOfUsers.add(User.builder()
                .username("test_user")
                .email("test_user.com")
                .connectionStatus(ConnectionStatus.valueOf("OFFLINE"))
                .profilePicture("profile")
                .role(Role.ADMIN)
                .userStatus(UserStatus.ACTIVE)
                .providerId(Provider.keycloak)
                .roomId("123")
                .build());
        listOfUsers.add(User.builder()
                .username("test_user2")
                .email("test_user2.com")
                .connectionStatus(ConnectionStatus.valueOf("OFFLINE"))
                .profilePicture("profile_2")
                .role(Role.ADMIN)
                .userStatus(UserStatus.ACTIVE)
                .providerId(Provider.google)
                .roomId("1234")
                .build());
        given(userService.findAllUsers()).willReturn(listOfUsers);

        // when -  action or the behaviour that we are going test
        ResultActions response = mockMvc.perform(get("/api/users"));

        // then - verify the output
        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()",
                        is(listOfUsers.size())));

    }

    // JUnit test for Get All online users REST API
    @Test
    public void givenListOfOnlineUsers() throws Exception{
        // given - precondition or setup
        List<User> listOfUsers = new ArrayList<>();
        listOfUsers.add(User.builder()
                .username("test_user")
                .email("test_user.com")
                .connectionStatus(ConnectionStatus.ONLINE)
                .profilePicture("profile")
                .role(Role.ADMIN)
                .userStatus(UserStatus.ACTIVE)
                .providerId(Provider.keycloak)
                .roomId("123")
                .build());
        listOfUsers.add(User.builder()
                .username("test_user2")
                .email("test_user2.com")
                .connectionStatus(ConnectionStatus.ONLINE)
                .profilePicture("profile_2")
                .role(Role.ADMIN)
                .userStatus(UserStatus.ACTIVE)
                .providerId(Provider.google)
                .roomId("1234")
                .build());
        given(userService.getOnlineUsers()).willReturn(listOfUsers);

        // when -  action or the behaviour that we are going test
        ResultActions response = mockMvc.perform(get("/api/online-users"));

        // then - verify the output
        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()",
                        is(listOfUsers.size())));

    }

}
