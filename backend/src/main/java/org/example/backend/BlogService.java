package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepo;
    private final UuidService uuidService;

    public List<Blog> getAllBlogs() {
        return blogRepo.findAll();
    }

    public Blog postBlog(Blog blog) {
        String uuid = uuidService.generateUUID();
        Blog blogSaved = new Blog(uuid, blog.title(), blog.description());

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
        blogRepo.deleteById(id);
    }
}
