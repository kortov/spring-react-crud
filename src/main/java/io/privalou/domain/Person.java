package io.privalou.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "passport_number")
    private Long passportNumber;

    @Column(name = "passport_series")
    private Long passportSeries;

    @Column(name = "birth_date")
    private String birthDate;

    @Column(name = "health_insurance_number")
    private String healthInsuranceNumber;

    @Column(name = "cell_phone")
    private Long cellPhone;

    @OneToOne(mappedBy = "person")
    private Patient patient;
}
