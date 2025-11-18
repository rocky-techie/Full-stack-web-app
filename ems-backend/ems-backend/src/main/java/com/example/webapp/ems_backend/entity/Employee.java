package com.example.webapp.ems_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//These are Lombok Annotations

@Entity //Marks this class as a JPA Entity (maps to DB table).
@Table(name="employees") //@Table specifies the actual database table name; without it, JPA uses the class name as the table name.

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="first_name")
    private String firstName;
    @Column(name="last_name")
    private String lastName;
    @Column(name="email", nullable = false,unique = true)
    private String email;
    //Four Attributes
}
