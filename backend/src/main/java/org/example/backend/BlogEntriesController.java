package org.example.backend;



import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


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
    Blog postBlog(@RequestBody Blog blog) {
        return blogService.postBlog(blog);
    }

    @GetMapping("{id}")
    Blog getBlogById(@PathVariable String id) {
        return blogService.getBlogById(id);
    }
    @PutMapping("{id}")
    public Blog putBlog(@RequestBody UpdateBlog blog, @PathVariable String id) {
        return blogService.updateBlog(blog, id);
    }
}
