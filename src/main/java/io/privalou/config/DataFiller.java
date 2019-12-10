package io.privalou.config;

import io.privalou.dao.*;
import io.privalou.domain.*;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class DataFiller implements ApplicationRunner {

    private final CinemaRepository cinemaRepository;

    private final ActorRepository actorRepository;

    private final RoleRepository roleRepository;

    private final CinematographerRepository cinematographerRepository;

    private final DirectorRepository directorRepository;

    private final UserRoleRepository userRoleRepository;

    private final UserRepository userRepository;

    public DataFiller(CinemaRepository cinemaRepository,
                      ActorRepository actorRepository,
                      RoleRepository roleRepository,
                      CinematographerRepository cinematographerRepository,
                      DirectorRepository directorRepository, UserRoleRepository userRoleRepository,
                      UserRepository userRepository) {
        this.cinemaRepository = cinemaRepository;
        this.actorRepository = actorRepository;
        this.roleRepository = roleRepository;
        this.cinematographerRepository = cinematographerRepository;
        this.directorRepository = directorRepository;
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
    }


    @Override
    public void run(ApplicationArguments args) {
        Random random = new Random();
        List<Director> directors = IntStream.range(0, 50)
                .mapToObj(element -> {
                    Director director = new Director();
                    director.setName("Director #" + element);
                    return director;
                })
                .collect(Collectors.toList());

        directors.forEach(
                directorRepository::save
        );

        List<Cinematographer> cinematographers = IntStream.range(0, 50)
                .mapToObj(element -> {
                    Cinematographer cinematographer = new Cinematographer();
                    cinematographer.setName("Cinematographer #" + element);
                    return cinematographer;
                })
                .collect(Collectors.toList());


        cinematographers.forEach(
                cinematographerRepository::save
        );

        List<Actor> actors = IntStream.range(0, 50)
                .mapToObj(element -> {
                    Actor actor = new Actor();
                    actor.setName("Actor #" + element);
                    actor.setAge(random.nextInt(90));
                    return actor;
                })
                .collect(Collectors.toList());

        actors.forEach(
                actorRepository::save
        );

        List<Cinema> cinemas = IntStream.range(0, 500)
                .mapToObj(element -> {
                    Cinema cinema = new Cinema();
                    cinema.setName("Cinema #" + element);
                    cinema.setLanguage("English");
                    cinema.setDirector(directors.get(random.nextInt(49)));
                    cinema.setCinematographer(cinematographers.get(random.nextInt(49)));
                    cinema.setRunningTime(random.nextInt(240));
                    return cinema;
                }).collect(Collectors.toList());

        cinemas.forEach(
                cinemaRepository::save
        );

        List<Role> roles = IntStream.range(0, 50)
                .mapToObj(element -> {
                    Role role = new Role();
                    role.setName("Role #" + element);
                    role.setCinema(cinemas.get(random.nextInt(499)));
                    role.setActor(actors.get(random.nextInt(49)));
                    return role;
                })
                .collect(Collectors.toList());

        roles.forEach(
                roleRepository::save
        );

        UserRole admin = new UserRole();
        admin.setName(UserRoleType.ROLE_ADMIN);
        userRoleRepository.save(admin);

        UserRole user = new UserRole();
        user.setName(UserRoleType.ROLE_USER);
        userRoleRepository.save(user);

        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(admin);
        userRoles.add(user);

        User privalove = new User();
        privalove.setUsername("privalove");
        // hashed pass 123123
        privalove.setPassword("$2a$10$qistJBEGilidVNFwUFumZuA8R4JZJ15e2kehLqq9D8uHhkrZMOo1a");
        privalove.setName("Artem Privalov");
        privalove.setEmail("privalov.dev@gmail.com");
        privalove.setRoles(userRoles);
        userRepository.save(privalove);
    }
}
