package org.example.backend;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class BlogIntegrationTest {

    @Autowired
    private MockMvc mockMvc;


    @Autowired
    private BlogRepository blogRepository;


    @Test
    void getAllBlogs_whenNoBlogs_returnsEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/blog"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

}
