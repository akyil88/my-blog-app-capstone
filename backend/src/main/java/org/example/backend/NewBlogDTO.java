package org.example.backend;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NewBlogDTO(
        @NotBlank
        @Size(min = 3, max = 50)
        String description,

        @NotBlank
        @Size(min = 3, max = 50)
        String title
) {

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
