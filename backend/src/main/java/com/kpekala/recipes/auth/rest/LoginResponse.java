package com.kpekala.recipes.auth.rest;

public record LoginResponse(String token, Long expiresIn) {
}
