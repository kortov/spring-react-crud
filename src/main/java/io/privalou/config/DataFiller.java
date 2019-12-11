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

    private final DoctorRepository doctorRepository;

    private final MedicineRepository medicineRepository;

    private final PatientRepository patientRepository;

    private final PersonRepository personRepository;

    private final PrescriptionRepository prescriptionRepository;

    private final UserRoleRepository userRoleRepository;

    private final UserRepository userRepository;

    public DataFiller(
            DoctorRepository doctorRepository,
            MedicineRepository medicineRepository,
            PatientRepository patientRepository,
            PersonRepository personRepository,
            PrescriptionRepository prescriptionRepository,
            UserRoleRepository userRoleRepository,
            UserRepository userRepository
    ) {
        this.doctorRepository = doctorRepository;
        this.medicineRepository = medicineRepository;
        this.patientRepository = patientRepository;
        this.personRepository = personRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
    }


    @Override
    public void run(ApplicationArguments args) {
        Random random = new Random();

        List<Doctor> doctors = IntStream.range(0, 50)
                .mapToObj(element -> {
                    Doctor doctor = new Doctor();
                    doctor.setFullName("Doctor #" + element);
                    doctor.setCareer("Career #" + element);
                    doctor.setExperience(random.nextInt(80));
                    doctor.setWorkingNumber("random-number" + random.nextInt(80));
                    doctor.setCellPhone(88005553535L);
                    return doctor;
                })
                .collect(Collectors.toList());

        List<Doctor> persistedDoctors = doctorRepository.saveAll(doctors);

        List<Person> people = IntStream.range(0, 50)
                .mapToObj(element -> {
                    Person person = new Person();
                    person.setBirthDate("22.09.1996");
                    person.setCellPhone(88005553536L);
                    person.setFullName("Person #" + element);
                    person.setHealthInsuranceNumber("" + random.nextInt(Integer.MAX_VALUE));
                    person.setPassportSeries(random.nextLong() * 3616L);
                    person.setPassportNumber(random.nextLong() * 999999L);
                    return person;
                })
                .collect(Collectors.toList());
        personRepository.saveAll(people);

//        List<Director> directors = IntStream.range(0, 50)
//                .mapToObj(element -> {
//                    Director director = new Director();
//                    director.setName("Director #" + element);
//                    return director;
//                })
//                .collect(Collectors.toList());
//
//        directors.forEach(
//                directorRepository::save
//        );
//
//        List<Cinematographer> cinematographers = IntStream.range(0, 50)
//                .mapToObj(element -> {
//                    Cinematographer cinematographer = new Cinematographer();
//                    cinematographer.setName("Cinematographer #" + element);
//                    return cinematographer;
//                })
//                .collect(Collectors.toList());
//
//
//        cinematographers.forEach(
//                cinematographerRepository::save
//        );
//
//        List<Actor> actors = IntStream.range(0, 50)
//                .mapToObj(element -> {
//                    Actor actor = new Actor();
//                    actor.setName("Actor #" + element);
//                    actor.setAge(random.nextInt(90));
//                    return actor;
//                })
//                .collect(Collectors.toList());
//
//        actors.forEach(
//                actorRepository::save
//        );
//
//        List<Cinema> cinemas = IntStream.range(0, 500)
//                .mapToObj(element -> {
//                    Cinema cinema = new Cinema();
//                    cinema.setName("Cinema #" + element);
//                    cinema.setLanguage("English");
//                    cinema.setDirector(directors.get(random.nextInt(49)));
//                    cinema.setCinematographer(cinematographers.get(random.nextInt(49)));
//                    cinema.setRunningTime(random.nextInt(240));
//                    return cinema;
//                }).collect(Collectors.toList());
//
//        cinemas.forEach(
//                cinemaRepository::save
//        );
//
//        List<Role> roles = IntStream.range(0, 50)
//                .mapToObj(element -> {
//                    Role role = new Role();
//                    role.setName("Role #" + element);
//                    role.setCinema(cinemas.get(random.nextInt(499)));
//                    role.setActor(actors.get(random.nextInt(49)));
//                    return role;
//                })
//                .collect(Collectors.toList());
//
//        roles.forEach(
//                roleRepository::save
//        );

        UserRole admin = new UserRole();
        admin.setName(UserRoleType.ROLE_ADMIN);
        userRoleRepository.save(admin);

        UserRole user = new UserRole();
        user.setName(UserRoleType.ROLE_USER);
        userRoleRepository.save(user);

        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(admin);
        userRoles.add(user);

        User sokol = new User();
        sokol.setUsername("sokolove");
        // hashed pass 123123
        sokol.setPassword("$2a$10$qistJBEGilidVNFwUFumZuA8R4JZJ15e2kehLqq9D8uHhkrZMOo1a");
        sokol.setName("Ilya Sokolov");
        sokol.setEmail("ilyasokolov@gmail.com");
        sokol.setRoles(userRoles);
        userRepository.save(sokol);
    }
}
