package ma.spacebnb.userservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/auth/authenticate/**", "/api/auth/register/**").permitAll()
                        .requestMatchers("/api/host/**").hasAuthority("HOST")
                        .requestMatchers("/api/guest/**").hasAuthority("GUEST")
                        .anyRequest().authenticated()
                )
                .formLogin(formLogin -> formLogin

                        .permitAll() // Allow unauthenticated access to the login page
                        .successHandler((request, response, authentication) -> {
                            // Handle success redirection based on role
                            String role = authentication.getAuthorities().toString();
                            if (role.contains("HOST")) {
                                response.sendRedirect("https://www.google.com");
                            } else if (role.contains("GUEST")) {
                                response.sendRedirect("https://www.youtube.com");
                            }
                        })
                )
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
