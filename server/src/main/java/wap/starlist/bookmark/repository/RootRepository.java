package wap.starlist.bookmark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wap.starlist.bookmark.domain.Root;

@Repository
public interface RootRepository extends JpaRepository<Root, Long> {
}
