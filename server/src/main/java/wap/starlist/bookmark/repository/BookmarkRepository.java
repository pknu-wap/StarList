package wap.starlist.bookmark.repository;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import wap.starlist.bookmark.domain.Bookmark;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByUrl(String url);

    List<Bookmark> findByFolder_Root_IdAndTitleContaining(Long rootId, String title);

    List<Bookmark> findByTitleContaining(String query);

    @Query("""
                    SELECT b
                    FROM Bookmark b
                    WHERE b.dateLastUsed <= :threeMonthsAgo
                    AND b.remindDisabled = false
                    AND (b.lastRemindTime IS NULL OR b.lastRemindTime < :threeMonthsAgo)
            """)
    List<Bookmark> findReminderTargets(@Param("threeMonthsAgo") Long threeMonthsAgo, Pageable pageable);

    @Modifying
    @Transactional
    @Query("DELETE FROM Bookmark b WHERE b.id IN :ids")
    void deleteAllByIds(@Param("ids") List<Long> ids);

    @Modifying
    @Query("UPDATE Bookmark b SET b.folder.id = :folderId WHERE b.id IN :bookmarkIds")
    void moveToFolder(@Param("folderId") Long folderId, @Param("bookmarkIds") List<Long> bookmarkIds);
}
