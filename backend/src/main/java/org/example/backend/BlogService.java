package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional; // Import java.util.Optional hier verwenden

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

    public Blog updateBlog(UpdateBlog blog, String id) {
        Optional<Blog> optionalExistingBlog = blogRepo.findById(id);

        if (optionalExistingBlog.isPresent()) { // Verwenden Sie isPresent() auf java.util.Optional
            Blog existingBlog = optionalExistingBlog.get(); // Verwenden Sie get() auf java.util.Optional
            // Update logik hier
            Blog updatedBlog = new Blog(id, blog.getTitle(), blog.getDescription(), existingBlog.getImage());
            return blogRepo.save(updatedBlog);
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
}
