package ma.spacebnb.userservice.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration}")
    private long JWT_TOKEN_VALIDITY;

    // Extract username from token
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Extract expiration date from token
    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    // Extract all claims from the token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Generate token with custom claims, including username and userId
    public String generateToken(String username, Long userId, Map<String, Object> additionalClaims) {
        // Merge standard claims with additional custom claims
        Map<String, Object> claims = additionalClaims != null ? additionalClaims : Map.of();
        claims.put("username", username);
        claims.put("userId", userId);

        return Jwts.builder()
                .setClaims(claims) // Set claims
                .setSubject(username) // Set subject (typically username)
                .setIssuedAt(new Date(System.currentTimeMillis())) // Set issued date
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY)) // Set expiration
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes()) // Sign with secret key
                .compact();
    }

    // Overloaded method to generate token with only username
    public String generateToken(String username) {
        return generateToken(username, null, Map.of());
    }

    // Validate token against username and expiration
    public boolean validateToken(String token, String username) {
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }

    // Check if the token has expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
