package org.example.backend;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepo;

    public List<Blog> getAllBlogs() {
        return blogRepo.findAll();
    }

    public Blog postBlog(Blog blog) {

        Blog blogSaved = new Blog(blog.id(), blog.title(), blog.description());

        return blogRepo.save(blogSaved);
    }


    public Blog getBlogById(String id) {
        return blogRepo.findById(id).orElse(null);
    }





}


