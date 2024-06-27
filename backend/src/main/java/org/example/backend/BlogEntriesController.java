package org.example.backend;



import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@RestController
@RequestMapping("/api/blog")


public class BlogEntriesController {

    private final BlogService blogService;



    BlogEntriesController(BlogService blogService) {
        this.blogService = blogService;
    }


    @GetMapping
    List<Blog> getAllBlogs(){
        return blogService.getAllBlogs();}


    @PostMapping
    Blog postBlog(@RequestBody @Valid NewBlogDTO blog) {
        return blogService.postBlog(new Blog(blog.description(), blog.title()));
    }

    @GetMapping("{id}")
    Blog getBlogById(@PathVariable String id) {
        return blogService.getBlogById(id);
    }
    @PutMapping("{id}")
    public Blog putBlog(@RequestBody UpdateBlog blog, @PathVariable String id) {
        return blogService.updateBlog(blog, id);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable String id) {
        blogService.delete(id);
    }
}