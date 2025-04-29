package wap.starlist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wap.starlist.domain.Folder;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {
}
