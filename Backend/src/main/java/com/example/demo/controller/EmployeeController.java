package com.example.demo.controller;


import com.example.demo.dto.EmployeeDto;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/new")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${role.admin}")
    private String roleAdmin;

    @Value("${role.user}")
    private String roleUser;

    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<EmployeeDto> getEmployee(@PathVariable("id") Long employeeId){
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')") // Restrict this endpoint to ADMIN role
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployee(){
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')") // Restrict this endpoint to ADMIN role
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDto employeeDto){
        employeeDto = employeeService.updateEmployee(id, employeeDto);
        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<EmployeeDto> deleteEmployee(@PathVariable Long id){
        EmployeeDto deletedEmployee = employeeService.deleteEmployee(id);
        return new ResponseEntity<>(deletedEmployee, HttpStatus.OK);
    }
}
