package com.societedecomptabilite;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.societedecomptabilite.entity.User;
import com.societedecomptabilite.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    UserRepository userRepository;

    @Test
    void publicRegister_ignoresRoleField_andCreatesClient() throws Exception {
        String email = "testclient@example.com";
        // build payload including a malicious role field
        String payload = "{" +
                "\"firstName\":\"Alice\"," +
                "\"lastName\":\"Client\"," +
                "\"email\":\"" + email + "\"," +
                "\"password\":\"secret123\"," +
                "\"role\":\"ADMIN\"" +
                "}";

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isOk());

        Optional<User> created = userRepository.findByEmail(email);
        Assertions.assertTrue(created.isPresent());
        Assertions.assertEquals(User.Role.CLIENT, created.get().getRole());
    }
}
