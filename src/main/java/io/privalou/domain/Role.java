package io.privalou.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "role")
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name = "cinema_id", referencedColumnName = "id")
    private Cinema cinema;

    @ManyToOne
    @JoinColumn(name = "actor_id")
    private Actor actor;

}
