package com.societedecomptabilite.controller;

import com.societedecomptabilite.dto.AdminResponse;
import com.societedecomptabilite.dto.CreateAdminRequest;
import com.societedecomptabilite.entity.User;
import com.societedecomptabilite.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;

    @PostMapping("/admins")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminResponse> createAdmin(@Valid @RequestBody CreateAdminRequest request) {
        // Ensure email uniqueness
        userRepository.findByEmail(request.getEmail()).ifPresent(u -> {
            throw new IllegalArgumentException("Email already exists");
        });

        User user = new User();
        user.setFullName(request.getFirstName() + " " + request.getLastName());
        user.setEmail(request.getEmail());
        // Password should be hashed by service layer; keep simple wiring here and delegate to repository via manual encoding
        // We'll reuse PasswordEncoder via ApplicationContext in service; for minimal changes, set password raw and rely on service to hash.
        // For safety, encode here using a new BCryptPasswordEncoder instance.
        org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder encoder = new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole(User.Role.ADMIN);
        user.setEnabled(true);

        User saved = userRepository.save(user);

        AdminResponse response = new AdminResponse(saved.getId(), saved.getFullName(), saved.getEmail(), saved.getRole());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admins")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<AdminResponse>> listAdmins(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        Page<User> users = userRepository.findAll(PageRequest.of(page, size));
        Page<AdminResponse> out = users.map(u -> new AdminResponse(u.getId(), u.getFullName(), u.getEmail(), u.getRole()));
        return ResponseEntity.ok(out);
    }
}
