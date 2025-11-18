package com.example.webapp.ems_backend.service;

import com.example.webapp.ems_backend.dto.EmployeeDto;
import com.example.webapp.ems_backend.entity.Employee;
import com.example.webapp.ems_backend.exception.ResourceNotFoundException;
import com.example.webapp.ems_backend.mapper.EmployeeMapper;
import com.example.webapp.ems_backend.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{


    private EmployeeRepository employeeRepository;

    //For POST (Add) Employee
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee= EmployeeMapper.mapToEmployee(employeeDto);//DTO is converted into entity,
        Employee savedEmployee=employeeRepository.save(employee);//saved in DB through repository

        employeeRepository.save(employee);
//        Takes the entity object (employee).
//        Inserts it into the database (employees table).
//        Returns the saved entity (with generated ID)

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);//Converts saved Employee entity back into EmployeeDto
    }

    //For GET Employee
    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)//fetching records from DB using "findById" or else throws Error
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with given ID: "+ employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee); //Entity converted into Dto
    }

    //For GET All Employees
    @Override
    public List<EmployeeDto> getAllEmplyoees() {
        List<Employee> employees  = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    //For PUT (update) Employee
    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
        Employee employee = employeeRepository.findById(employeeId) //fetching Old records from DB using "findById" or else throws Error
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with given ID: " + employeeId));
        employee.setFirstName(updateEmployee.getFirstName());
        employee.setLastName(updateEmployee.getLastName());
        employee.setEmail(updateEmployee.getEmail());
        //setters .set---> updates existing objects with the new value
        //getters.get----> takes new data from DTO(plain object)

        Employee updatedEmployee = employeeRepository.save(employee); //saves the updated Employee
        //check the Entity name carefully "updatedEmployee"
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);//Entity converted into Dto

    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId) //fetching records from DB using "findById" or else throws Error
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with given ID: " + employeeId));
        employeeRepository.deleteById(employeeId);//deleting employee if given ID exists.
    }
}
