package com.societedecomptabilite.controller;

import com.societedecomptabilite.dto.AuthResponse;
import com.societedecomptabilite.dto.LoginRequest;
import com.societedecomptabilite.dto.RegisterClientRequest;
import com.societedecomptabilite.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/auth/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterClientRequest request) {
        return ResponseEntity.ok(authService.registerClient(request));
    }

    @GetMapping("/admin/ping")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminPing() {
        return ResponseEntity.ok("admin-pong");
    }

    @GetMapping("/client/ping")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> clientPing() {
        return ResponseEntity.ok("client-pong");
    }
}
