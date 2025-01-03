package ma.xproce.springsecurity.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

import static io.jsonwebtoken.Jwts.builder;


@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration}")
    private long JWT_TOKEN_VALIDITY;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, ClaimsResolver<T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.resolve(claims);
    }

    private Claims extractAllClaims(String token) {
        // For versions prior to 0.11.0, use Jwts.parser()
        JwtParser parser = (JwtParser) Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes());

        return parser.parseClaimsJws(token).getBody(); // Parse and get the claims
    }


    public String generateToken(String username, String role, Long guestId) {
        return Jwts.builder()
                .setSubject(username) // Setting the subject as the username
                .claim("role", role)  // Adding role as a claim
                .claim("guestId", guestId)  // Adding guest ID as a claim
                .setIssuedAt(new Date()) // Token issued date
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY)) // Set expiration time
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes()) // Sign with the secret key
                .compact(); // Return the generated token
    }



    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    @FunctionalInterface
    public interface ClaimsResolver<T> {
        T resolve(Claims claims);
    }
}
