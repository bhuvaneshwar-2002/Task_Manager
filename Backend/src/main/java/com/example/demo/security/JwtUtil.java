package com.example.demo.security;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.PrivateKey;
import java.util.Date;
import java.util.Optional;
import java.util.Set;
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
    public String generateToken(String username){
        Optional<User> user = userRepository.findByUsername(username);
        Set<Role> roles = user.get().getRoles();

        //Add Roles to the object

        return Jwts.builder().setSubject(username).claim("roles",roles.stream()
                .map(role -> role.getName()).collect(Collectors.joining(",")))
                .setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
                .signWith(secretKey).compact();
    }

    //Extract Username
    public String extractUsername(String token){
        return Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    //Extract Roles
    public Set<String> extractRoles(String token){
        String rolesString = Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token)
                .getBody().get("roles", String.class);
        return Set.of(rolesString);
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
