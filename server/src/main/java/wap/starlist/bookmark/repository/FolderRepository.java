package wap.starlist.bookmark.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wap.starlist.bookmark.domain.Folder;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    List<Folder> findByTitleContaining(String query);
}
