package wap.starlist.bookmark.service;

import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import wap.starlist.bookmark.domain.Bookmark;
import wap.starlist.util.ImageScraper;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Transactional
class BookmarkServiceTest {

    @Autowired
    private BookmarkService bookmarkService;

    @Test
    void create() throws Exception {
        //given
//        String title = "EARTH1";
//        String url = "https://www.earth.org";
//
//        //when
//        Bookmark bookmark = bookmarkService.createBookmark("123", title, url);
//
//        //then
//        Bookmark foundBookmark = bookmarkService.getBookmark(bookmark.getId());
//
//        assertEquals(title, foundBookmark.getTitle());
//        assertEquals(url, foundBookmark.getUrl());

        Optional<String> imageUrl = ImageScraper.getImageUrl("https://mindock.github.io/book/computer-structure-and-design-2/");
        System.out.println("imageUrl = " + imageUrl.get());
    }

    @Test
    void get() throws Exception {
        //given
        String title = "EARTH2";
        String url = "https://www.earth.org";

        //when
        Bookmark bookmark = bookmarkService.createBookmark("123", title, url);
        Bookmark found = bookmarkService.getBookmark(bookmark.getId());
        System.out.println("id = " + bookmarkService.getBookmark(3L).getTitle());
        //then
        assertEquals(found.getId(), bookmark.getId());
    }

    @Test
    void throwErrorWhenNullId() throws Exception {
        //given
        Long nullId = null;

        //then
        assertThrows(IllegalArgumentException.class
                , () -> bookmarkService.getBookmark(nullId));
    }

    @Test
    void throwErrorWhenNoBookmark() throws Exception {
        //given
        String title = "EARTH3";
        String url = "https://www.earth.org";

        //when
        Bookmark earth = bookmarkService.createBookmark("123", title, url);

        //then
        assertThrows(IllegalArgumentException.class,
                () -> bookmarkService.getBookmark(earth.getId() + 1L));
    }
}