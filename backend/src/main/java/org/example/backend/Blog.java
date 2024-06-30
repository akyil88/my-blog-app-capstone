package org.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "blogs")
public class Blog {
    @Id
    private String id;
    private String title;
    private String description;
    private byte[] image;

    public Blog(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public Blog withId(String id) {
        return new Blog(id, this.title, this.description, this.image);
    }
}
