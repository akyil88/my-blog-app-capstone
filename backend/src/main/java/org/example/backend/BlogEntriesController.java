package org.example.backend;


import lombok.RequiredArgsConstructor;
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

//    @PutMapping(path = {"{id}/update", "{id}"})
//    Blog updateBlog(@PathVariable String id, @RequestBody Blog blog) {
//        if(!blog.id().equals(id)) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Invalid blog id");
//        }
//        return blogService.update(blog);
//    }


//    @DeleteMapping("{id}")
//    void deleteBlog(@PathVariable String id) {
//        blogService.delete(id);
//    }



}
