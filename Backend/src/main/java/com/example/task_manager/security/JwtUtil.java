package com.example.task_manager.security;

import com.example.task_manager.entity.Role;
import com.example.task_manager.entity.User;
import com.example.task_manager.repository.UserRepository;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private static final SecretKey secretKey = Keys.hmacShaKeyFor(new byte[64]); // 512-bit key

    private final long jwtExpirationMs = 86400000; // 24 hours
    private UserRepository userRepository;

    public JwtUtil(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    //Generate Token
// Generate Token with Roles as a List
    public String generateToken(String username){
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        User user = userOptional.get();
        Set<Role> roles = user.getRoles();

        List<String> roleList = roles.stream()
                .map(Role::getName)
                .collect(Collectors.toList()); // ✅ Store roles as a List<String>

        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roleList)  // ✅ Store as List<String>
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(secretKey)
                .compact();
    }


    //Extract Username
    public String extractUsername(String token){
        return Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    //Extract Roles
// Extract Roles from JWT
    public Set<String> extractRoles(String token){
        Object rolesObject = Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("roles");

        if (rolesObject instanceof String) {
            return Set.of((String) rolesObject); // ✅ Single Role Case
        } else if (rolesObject instanceof List) {
            return new HashSet<>((List<String>) rolesObject); // ✅ Multiple Roles Case
        }
        return Set.of(); // Return empty set if no roles found
    }


    //Token Validation
    public boolean tokenValid(String token){
        try {
            Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        }catch (JwtException | IllegalArgumentException e){
            return false;
        }
    }
}
