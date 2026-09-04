package com.societedecomptabilite.dto;

import com.societedecomptabilite.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminResponse {
    private Long id;
    private String fullName;
    private String email;
    private User.Role role;
}
