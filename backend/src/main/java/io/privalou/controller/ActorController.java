package io.privalou.controller;

import io.privalou.dao.ActorRepository;
import io.privalou.domain.Actor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/api/actors")
public class ActorController {

    private final ActorRepository actorRepository;

    public ActorController(ActorRepository actorRepository) {
        this.actorRepository = actorRepository;
    }

    @Secured("ROLE_ADMIN")
    @GetMapping()
    public List<Actor> getActors() {
        return actorRepository.findAll();
    }
}
