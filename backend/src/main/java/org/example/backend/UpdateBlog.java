package org.example.backend;

import java.util.Objects;

public class UpdateBlog {
    private final String description;
    private final String title;

    public UpdateBlog(String description, String title) {
        this.description = Objects.requireNonNull(description, "Description cannot be null");
        this.title = Objects.requireNonNull(title, "Title cannot be null");
    }

    public String getDescription() {
        return description;
    }

    public String getTitle() {
        return title;
    }
}