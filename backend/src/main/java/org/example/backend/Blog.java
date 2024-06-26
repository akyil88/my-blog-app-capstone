package org.example.backend;

import lombok.AllArgsConstructor;
import lombok.Getter;


public record Blog(
        String id,
        String title,
        String description
) {

    public Blog(String title, String description) {
        this(null, title, description);
    }

    public Blog withId(String id) {
        return new Blog(id, title, description);
    }
}
