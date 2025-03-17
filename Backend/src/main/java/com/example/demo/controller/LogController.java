package com.example.demo.controller;

import com.example.demo.dto.WorkActivity;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.impl.LoggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/log")
public class LogController {

    @Autowired
    private LoggingService logService;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${role.admin}")
    private String roleAdmin;

    @Value("${role.user}")
    private String roleUser;

    @GetMapping("{id}")
    public ResponseEntity<WorkActivity> getLogActivity(@PathVariable("id") Long id){
        WorkActivity workActivity = logService.getLogById(id);
        return ResponseEntity.ok(workActivity);
    }

    @PostMapping
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<WorkActivity> createLogActivity(@RequestBody WorkActivity workActivity){
        WorkActivity newWorkActivity = logService.createLog(workActivity);
        return ResponseEntity.ok(newWorkActivity);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<WorkActivity> updateLogActivity(@PathVariable("id") Long id,@RequestBody WorkActivity workActivity){
        WorkActivity updatedWorkActivity = logService.updateLog(id, workActivity);  // Pass path variable 'id'
        return ResponseEntity.ok(updatedWorkActivity);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<WorkActivity> deleteLogActivity(@PathVariable("id") Long id){
        WorkActivity deletedActivity = logService.deleteLog(id);
        return ResponseEntity.ok(deletedActivity);
    }

    @GetMapping
    public ResponseEntity<List<WorkActivity>> getAllLogs(){
        return ResponseEntity.ok(logService.getAllLogs());
    }
}
