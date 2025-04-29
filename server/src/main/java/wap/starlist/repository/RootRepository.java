package wap.starlist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wap.starlist.domain.Root;

@Repository
public interface RootRepository extends JpaRepository<Root, Long> {
}
