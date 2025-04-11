package wap.starlist.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wap.starlist.user.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
