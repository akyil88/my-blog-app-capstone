package org.example.backend;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogEntriesController {

    private final BlogService blogService;

    public BlogEntriesController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @PostMapping
    public Blog postBlog(@RequestBody @Valid NewBlogDTO blog) {
        return blogService.postBlog(new Blog(blog.getTitle(), blog.getDescription()));
    }

    @GetMapping("{id}")
    public Blog getBlogById(@PathVariable String id) {
        return blogService.getBlogById(id);
    }

    @PutMapping("{id}")
    public Blog putBlog(@RequestBody UpdateBlog blog, @PathVariable String id) {
        return blogService.updateBlog(blog, id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        blogService.delete(id);
    }

    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public Blog postBlogWithImage(@RequestParam("title") String title,
                                  @RequestParam("description") String description,
                                  @RequestParam("image") MultipartFile imageFile) throws IOException {
        return blogService.postBlogWithImage(title, description, imageFile);
    }
}
