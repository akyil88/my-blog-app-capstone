package org.example.backend;

public record Blog(
        String id,
        String title,
        String description
) {

    public Blog(String title, String description) {
        this(null, title, description);
    }


}
