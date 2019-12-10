package io.privalou.dao;

import io.privalou.domain.UserRole;
import io.privalou.domain.UserRoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    Optional<UserRole> findByName(UserRoleType roleType);
}
