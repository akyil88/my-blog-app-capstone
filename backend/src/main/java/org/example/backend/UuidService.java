package org.example.backend;

import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class UuidService {

    public String generateUUID() {
        //Hallo Test
        return UUID.randomUUID().toString();
    }
}
