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
}
