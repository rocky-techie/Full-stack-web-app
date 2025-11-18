package com.example.webapp.ems_backend.service;

import com.example.webapp.ems_backend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);//Create(POST) Employee

    EmployeeDto getEmployeeById(Long employeeId); //GET Employee

    List<EmployeeDto> getAllEmplyoees(); //GET All Employees

    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee); //PUT (update) Employee

    void deleteEmployee(Long employeeId); //DELETE Employee
}
