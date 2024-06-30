package org.example.backend;

import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class BlogServiceTest {
    private final BlogRepository mockBlogRepo = mock(BlogRepository.class);
    private final UuidService uuidService = mock(UuidService.class);
    private final BlogService blogService = new BlogService(mockBlogRepo, uuidService);

    @Test
    void testGetAllBlogs() {
        //GIVEN
        Blog blog1 = new Blog("1", "Title1", "Description1",);
        Blog blog2 = new Blog("2", "Title2", "Description2","null");
        Blog blog3 = new Blog("3", "Title3", "Description3","null");

        List<Blog> expectedBlogs = List.of(blog1, blog2, blog3);

        when(mockBlogRepo.findAll()).thenReturn(List.of(blog1, blog2, blog3));

        //WHEN
        List<Blog> result = blogService.getAllBlogs();

        //THEN
        assertEquals(expectedBlogs, result);
    }

    @Test
    void testPostBlog() {
        //GIVEN
        Blog blog = new Blog(null, "Title1", "Description1");
        String uuid = "generated-uuid";

        Blog savedBlog = new Blog(uuid, blog.title(), blog.description());

        when(uuidService.generateUUID()).thenReturn(uuid);
        when(mockBlogRepo.save(any(Blog.class))).thenReturn(savedBlog);

        //WHEN
        Blog result = blogService.postBlog(blog);

        //THEN
        assertEquals(savedBlog, result);
    }

    @Test
    void testGetBlogById() {
        //GIVEN
        Blog blog = new Blog("1", "Title1", "Description1");
        when(mockBlogRepo.findById("1")).thenReturn(Optional.of(blog));

        //WHEN
        Blog result = blogService.getBlogById("1");

        //THEN
        assertEquals(blog, result);
    }

    @Test
    void testGetBlogByIdNotFound() {
        //GIVEN
        when(mockBlogRepo.findById("1")).thenReturn(Optional.empty());

        //WHEN
        Blog result = blogService.getBlogById("1");

        //THEN
        assertNull(result);
    }

    @Test
    void testUpdateBlog() {
        //GIVEN
        UpdateBlog updateBlog = new UpdateBlog("UpdatedTitle", "UpdatedDescription");
        Blog updatedBlog = new Blog("1", updateBlog.getTitle(), updateBlog.getDescription());

        when(mockBlogRepo.save(any(Blog.class))).thenReturn(updatedBlog);

        //WHEN
        Blog result = blogService.updateBlog(updateBlog, "1");

        //THEN
        assertEquals(updatedBlog, result);
    }

    @Test
    void testDeleteBlog() {
        //GIVEN
        doNothing().when(mockBlogRepo).deleteById("1");

        //WHEN
        blogService.delete("1");

        //THEN
        verify(mockBlogRepo, times(1)).deleteById("1");
    }
}
