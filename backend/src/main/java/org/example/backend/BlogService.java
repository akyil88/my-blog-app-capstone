package org.example.backend;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

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


    public Blog updateBlog(UpdateBlog blog, String id) {
        Blog blogToUpdate = new Blog(id, blog.description(), blog.title());

        return blogRepo.save(blogToUpdate);
    }

    public void delete(String id) {
        // Delete a blog entry by its ID
        blogRepo.deleteById(id);
    }


}


