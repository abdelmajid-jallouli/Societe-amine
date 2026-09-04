package com.societedecomptabilite;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AdminControllerSecurityTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void createAdmin_withoutAuth_isForbidden() throws Exception {
        String payload = "{" +
                "\"firstName\":\"Admin\"," +
                "\"lastName\":\"User\"," +
                "\"email\":\"admincreate@example.com\"," +
                "\"password\":\"secret123\"" +
                "}";

        mockMvc.perform(post("/api/admin/admins")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isForbidden());
    }
}
