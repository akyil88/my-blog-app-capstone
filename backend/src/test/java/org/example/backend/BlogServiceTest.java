package org.example.backend;

import org.junit.jupiter.api.Test;

import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class BlogServiceTest {

    private final BlogRepository mockBlogRepo = mock(BlogRepository.class); // Korrigierter Variablenname
    private final UuidService mockUuidService = mock(UuidService.class);

    @Test
    void allBlogs() {
        Blog expectedBlog = new Blog("1", "Title", "Description");

        List<Blog> expectedBlogs = List.of(expectedBlog);
        when(mockBlogRepo.findAll()).thenReturn(expectedBlogs); // Korrektur der Klammerung und des Methodennamens

        BlogService blogService = new BlogService(mockBlogRepo, mockUuidService);

        List<Blog> result = blogService.getAllBlogs();
        verify(mockBlogRepo).findAll();
        assertEquals(expectedBlogs, result);
    }
}
