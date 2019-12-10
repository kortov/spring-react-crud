package io.privalou.dao;

import io.privalou.domain.Director;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectorRepository extends JpaRepository<Director, Integer> {
}
