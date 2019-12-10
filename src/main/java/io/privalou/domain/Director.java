package io.privalou.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "director")
@Table(name = "director")
public class Director {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @OneToMany(mappedBy = "director")
    private List<Cinema> cinemas;
}
