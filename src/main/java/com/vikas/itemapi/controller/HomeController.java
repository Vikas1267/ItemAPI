package com.vikas.itemapi.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
            "message", "Item API is running",
            "endpoints", "/api/items, /api/items/{id}"
        );
    }
}
