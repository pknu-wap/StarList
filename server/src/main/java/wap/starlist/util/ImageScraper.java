package wap.starlist.util;

import java.io.IOException;
import java.util.Optional;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

public class ImageScraper {

    public static Optional<String> getImageUrl(String url) throws IOException {
        if (url == null || url.isEmpty()) {
            return Optional.empty();
        }

        Document doc = Jsoup.connect(url).get();
        Element thumbnail = doc.select("img").first();

        return Optional.ofNullable(thumbnail)
                .map(img -> img.absUrl("src"));
    }

    public static Optional<String> getImageFromOgOrImgTag(String url) throws IOException {
        if (url == null || url.isEmpty()) {
            return Optional.empty();
        }

        Document doc = Jsoup.connect(url).get();

        Element ogImage = doc.select("meta[property=og:image]").first();
        if (ogImage == null) {
            // 없으면 img 태그에서 스크랩
            Element thumbnail = doc.select("img").first();
            return Optional.ofNullable(thumbnail)
                    .map(img -> img.absUrl("src"));
        }

        // og:image 스크랩
        String content = ogImage.attr("content");
        if (content != null && !content.isEmpty()) {
            // 절대경로 보장
            return Optional.of(doc.absUrl("base").isEmpty() ? content : doc.absUrl("base") + content);
        }
        return Optional.empty();
    }
}
