package wap.starlist.bookmark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wap.starlist.bookmark.domain.Folder;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {
}
