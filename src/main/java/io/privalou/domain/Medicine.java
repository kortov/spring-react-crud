package io.privalou.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String rate;

    @OneToOne(mappedBy = "medicine")
    private Prescription prescription;
}
