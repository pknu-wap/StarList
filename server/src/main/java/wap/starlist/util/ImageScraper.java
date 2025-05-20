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
}
