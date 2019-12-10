package io.privalou.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "cinema")
@Table(name = "cinema")
public class Cinema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String name;
    @Column
    private String language;
    @Column
    private int runningTime;

    @OneToMany(mappedBy = "cinema")
    private List<Role> roles;

    @ManyToOne
    @JoinColumn(name = "director_id", referencedColumnName = "id")
    private Director director;

    @ManyToOne
    @JoinColumn(name = "cinematographer_id", referencedColumnName = "id")
    private Cinematographer cinematographer;
}
