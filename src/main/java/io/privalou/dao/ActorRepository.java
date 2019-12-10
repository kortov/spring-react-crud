package io.privalou.dao;

import io.privalou.domain.Actor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActorRepository extends JpaRepository<Actor, Integer> {
    List<Actor> findActorByName(String name);
}
