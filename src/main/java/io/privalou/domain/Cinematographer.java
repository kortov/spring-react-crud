package io.privalou.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "cinematographer")
@Table(name = "cinematographer")
public class Cinematographer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String name;

    @OneToMany(mappedBy = "cinematographer")
    private List<Cinema> cinemas;
}
