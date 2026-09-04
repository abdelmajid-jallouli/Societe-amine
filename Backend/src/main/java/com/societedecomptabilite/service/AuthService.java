package com.societedecomptabilite.service;

import com.societedecomptabilite.dto.AuthResponse;
import com.societedecomptabilite.dto.LoginRequest;
import com.societedecomptabilite.dto.RegisterRequest;
import com.societedecomptabilite.entity.User;
import com.societedecomptabilite.repository.UserRepository;
import com.societedecomptabilite.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.CONFLICT;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = (User) authentication.getPrincipal();
        String token = jwtUtil.generateToken(user);

        return new AuthResponse(token, user.getRole(), user.getFullName());
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Deprecated: kept for backward compatibility if used elsewhere. Still respects provided role.
        userRepository.findByEmail(request.getEmail()).ifPresent(existing -> {
            throw new ResponseStatusException(CONFLICT, "Email already exists");
        });

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setEnabled(true);

        User savedUser = userRepository.save(user);
        return new AuthResponse(null, savedUser.getRole(), savedUser.getFullName());
    }

    @Transactional
    public AuthResponse registerClient(com.societedecomptabilite.dto.RegisterClientRequest request) {
        userRepository.findByEmail(request.getEmail()).ifPresent(existing -> {
            throw new ResponseStatusException(CONFLICT, "Email already exists");
        });

        User user = new User();
        user.setFullName(request.getFirstName() + " " + request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.CLIENT); // enforce client role regardless of input
        user.setEnabled(true);

        User savedUser = userRepository.save(user);
        return new AuthResponse(null, savedUser.getRole(), savedUser.getFullName());
    }
}
