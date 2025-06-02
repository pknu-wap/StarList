package wap.starlist.bookmark.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import wap.starlist.bookmark.domain.Folder;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    List<Folder> findByTitleContaining(String query);

    @Modifying
    @Query("UPDATE Folder f SET f.parent.id = :folderId WHERE f.id IN :folderIds")
    void moveToFolder(@Param("folderId") Long folderId, @Param("folderIds") List<Long> folderIds);
}
