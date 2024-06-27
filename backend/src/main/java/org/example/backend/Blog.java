
package org.example.backend;

public record Blog(
        String id,
        String title,
        String description
) {

    Blog (
            String title,
            String description

    ){
        this(null, description, title);
    }

    public Blog withId(String id) {
        return new Blog(id, title, description);
    }


}
