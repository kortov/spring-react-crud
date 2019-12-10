package io.privalou.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "actor")
@Table(name = "actor")
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    private int age;

    @OneToMany(targetEntity = Role.class,
            mappedBy = "actor",
            cascade = CascadeType.PERSIST
    )
    private List<Role> roles;
}
