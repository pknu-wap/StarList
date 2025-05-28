package wap.starlist.bookmark.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wap.starlist.bookmark.domain.Bookmark;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findByUrl(String url);

    List<Bookmark> findByFolder_Root_IdAndTitleContaining(Long rootId, String title);

    List<Bookmark> findByTitleContaining(String query);
}
