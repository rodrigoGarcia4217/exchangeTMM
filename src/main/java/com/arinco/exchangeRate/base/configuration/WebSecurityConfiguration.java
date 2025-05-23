package com.arinco.exchangeRate.base.configuration;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.thymeleaf.extras.springsecurity5.dialect.SpringSecurityDialect;

@Configuration
public class WebSecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Deshabilitar CSRF (ajusta según necesidad)
        http.csrf(csrf -> csrf.disable());

        // Configurar acceso a rutas públicas y protegidas
        http.authorizeRequests(requests -> requests
            // Rutas públicas sin login
            .antMatchers("/login", "/logout", "/resetPassword", "/system/userManagement/updatePassword").permitAll()

            // Rutas para rol MASTER
            .antMatchers("/system/userManagement/getDataTable").hasRole("MASTER")
            .antMatchers("/system/userManagement/getRoleCombo").hasRole("MASTER")
            .antMatchers("/system/userManagement/updateRole").hasRole("MASTER")
            .antMatchers("/comercial/**").hasRole("MASTER")

            // Rutas estáticas permitidas a todos
            .antMatchers("/js/**", "/css/**", "/images/**").permitAll()
            .antMatchers("/exchange/exchangeRate/download").permitAll()

            .anyRequest().authenticated()
        );

        // Configuración del formulario de login
        http.formLogin(login -> login
            .loginProcessingUrl("/j_spring_security_check") // URL para enviar formulario login
            .loginPage("/login")                            // Página del login
            .defaultSuccessUrl("/index", true)              // Página a donde va tras login correcto
            .failureUrl("/login?error=true")                 // Página en caso de error login
            .usernameParameter("username")
            .passwordParameter("password")
            .permitAll()
        );

        // Configuración del logout
        http.logout(logout -> logout
            .invalidateHttpSession(true)
            .clearAuthentication(true)
            .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
            .logoutSuccessUrl("/login?logout")
            .permitAll()
        );

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SpringSecurityDialect springSecurityDialect(){
        return new SpringSecurityDialect();
    }
}
