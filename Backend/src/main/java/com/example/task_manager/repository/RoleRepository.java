package com.example.task_manager.repository;

import com.example.task_manager.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository <Role, Long> {

    Optional<Role> findByName(String name);
}
