package wap.starlist.bookmark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wap.starlist.bookmark.domain.Bookmark;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
}
