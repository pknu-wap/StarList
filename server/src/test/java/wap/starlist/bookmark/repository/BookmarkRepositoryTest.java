package wap.starlist.bookmark.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import wap.starlist.bookmark.domain.Bookmark;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class BookmarkRepositoryTest {

    @Autowired
    private BookmarkRepository bookmarkRepository;
    @PersistenceContext
    private EntityManager entityManager;
    private JpaEntityInformation<Bookmark, ?> entityInformation;

    @BeforeEach
    void setUp() {
        entityInformation = JpaEntityInformationSupport
                .getEntityInformation(Bookmark.class, entityManager);
    }

    @Test
    void save() throws Exception {
        //given
        Bookmark earth = new Bookmark();

        //when
        Bookmark saved = bookmarkRepository.save(earth); // 반환된 값은 영속 상태임

        //then
        assertThat(saved).isEqualTo(earth);
    }

    @Test
    void find() throws Exception {
        //when
        Bookmark saved = bookmarkRepository.save(new Bookmark());
        Optional<Bookmark> found = bookmarkRepository.findById(saved.getId());

        //then
        assertThat(found).hasValue(saved);
    }

    @Test
    void delete() throws Exception {
        //given
        Bookmark earth = bookmarkRepository.save(new Bookmark());
        Long earthId = earth.getId();

        //when
        bookmarkRepository.deleteById(earthId);

        //then
        assertAll(
                () -> assertFalse(entityManager.contains(earth)), // earth는 영속 상태가 아님
                () -> assertEquals(earthId, entityInformation.getId(earth)), // earth는 상제상태라서 id는 존재
                () -> assertDoesNotThrow(() -> bookmarkRepository.findById(earthId)), // 조회는 성공하지만 (NoSuchElement 없이 Optional 반환)
                () -> assertThat(bookmarkRepository.findById(earthId)).isNotPresent() // 값은 가져올 수 없음
        );

    }
}