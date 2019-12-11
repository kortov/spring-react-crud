package io.privalou.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="hospitalization_date")
            private String hospitalizationDate;

    private String illness;

    @Column(name="health_state")
    private String healthState;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_id")
    private Person person;

    @OneToOne(mappedBy = "patient")
    private Prescription prescription;
}
