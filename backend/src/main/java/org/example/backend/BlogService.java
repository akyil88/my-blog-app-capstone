package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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
        Blog blogSaved = blog.withId(uuid);
        return blogRepo.save(blogSaved);
    }

    public Blog getBlogById(String id) {
        return blogRepo.findById(id).orElse(null);
    }

    public Blog updateBlog(UpdateBlog updateBlog, String id) {
        Optional<Blog> optionalExistingBlog = blogRepo.findById(id);

        if (optionalExistingBlog.isPresent()) {
            Blog existingBlog = optionalExistingBlog.get();
            existingBlog.setTitle(updateBlog.getTitle());
            existingBlog.setDescription(updateBlog.getDescription());


            return blogRepo.save(existingBlog);
        } else {
            throw new RuntimeException("Blog mit ID " + id + " nicht gefunden.");
        }
    }

    public void delete(String id) {
        blogRepo.deleteById(id);
    }

    public Blog postBlogWithImage(String title, String description, MultipartFile imageFile) throws IOException {
        String uuid = uuidService.generateUUID();
        byte[] imageBytes = imageFile.getBytes();
        Blog blog = new Blog(uuid, title, description, imageBytes);
        return blogRepo.save(blog);
    }
    public Optional<Blog> findById(String id) {
        return blogRepo.findById(id);
    }
    public Blog save(Blog blog) {
        return blogRepo.save(blog);
    }



}
