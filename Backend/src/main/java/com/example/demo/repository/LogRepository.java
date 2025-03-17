package com.example.demo.repository;

import com.example.demo.entity.Logging;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface LogRepository extends JpaRepository<Logging, Long> {
}
