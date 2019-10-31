package io.privalou;

import io.privalou.domain.Cinematographer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinematographerRepository extends JpaRepository<Cinematographer, Integer> {
}