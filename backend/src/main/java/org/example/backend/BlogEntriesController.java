package org.example.backend;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor

public class BlogEntriesController {

    private final BlogService blogService;


    @GetMapping
    List<Blog> getAllBlogs(){
        return blogService.getAllBlogs();
    }


}
