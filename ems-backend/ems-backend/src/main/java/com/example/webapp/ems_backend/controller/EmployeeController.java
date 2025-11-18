package com.example.webapp.ems_backend.controller;

import com.example.webapp.ems_backend.dto.EmployeeDto;
import com.example.webapp.ems_backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")            //@CrossOrigin → tells Spring Boot to allow frontend requests from a different port/domain.
                        //Used to fix CORS(cross origin resource sharing) error when frontend and backend run separately.
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees") //All URLs with /api will be handled here
public class EmployeeController {

    //controller depends on service layer to handle "business logic"
    private EmployeeService employeeService;


                                    //build Add (POST) Employee Rest API

    @PostMapping //handles HTTP POST requests
    //@RequestBody - JSON from client (Postman/React) will be converted into EmployeeDto
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){

        //Calls service method → passes DTO → service handles conversion, save to DB, and returns saved DTO
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);

        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
//        Wraps the saved employee inside ResponseEntity.
//        Returns "201 CREATED status" along with the employee data in JSON
    }

                                    //build (GET) Employee Rest API

    @GetMapping("/{id}") //handle HTTP GET requests, ("/{id}") → means this endpoint expects an ID value in the URL path
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId){
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
    }

                                    //build (GET All) Employees Rest API
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
        List<EmployeeDto> employees = employeeService.getAllEmplyoees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

                                    //build Update(PUT) an Employee Rest API

    @PutMapping("/{id}") //handles HTTPS PUT resquets, ("/{id}") → you have to tell which record you wants to update
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, @RequestBody EmployeeDto updatedEmployee){
        EmployeeDto employeeDto = employeeService.updateEmployee(employeeId, updatedEmployee);
        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
    }

                                    //build Update(PUT) an Employee Rest API
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee Deleted Successfully!");
    }

}
