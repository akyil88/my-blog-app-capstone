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

    @PutMapping(value = "/{id}/upload", consumes = {"multipart/form-data"})
    public Blog putBlogWithImage(@PathVariable String id,
                                 @RequestParam("title") String title,
                                 @RequestParam("description") String description,
                                 @RequestParam(value = "image", required = false) MultipartFile imageFile) throws IOException {
        // Fetch existing blog
        Blog existingBlog = blogService.getBlogById(id);
        if (existingBlog == null) {
            throw new RuntimeException("Blog mit ID " + id + " nicht gefunden.");
        }

        // Update title and description
        existingBlog.setTitle(title);
        existingBlog.setDescription(description);

        // Update image if provided
        if (imageFile != null && !imageFile.isEmpty()) {
            byte[] imageBytes = imageFile.getBytes();
            existingBlog.setImage(imageBytes);
        }

        // Save updated blog
        return blogService.save(existingBlog);
    }


}
