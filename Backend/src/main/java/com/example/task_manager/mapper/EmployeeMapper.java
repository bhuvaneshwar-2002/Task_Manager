package com.example.task_manager.mapper;

import com.example.task_manager.dto.EmployeeDto;
import com.example.task_manager.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapTOEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }
}
