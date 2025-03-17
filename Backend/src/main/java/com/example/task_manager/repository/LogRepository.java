package com.example.task_manager.repository;

import com.example.task_manager.entity.Logging;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<Logging, Long> {
}
