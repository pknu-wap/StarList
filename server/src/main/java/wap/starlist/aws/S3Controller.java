package wap.starlist.aws;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import wap.starlist.aws.service.S3Uploader;

@RestController
@RequestMapping("/apit")
@RequiredArgsConstructor
public class S3Controller {

    private final S3Uploader s3Uploader;

    @PostMapping("/upload")
    public ResponseEntity<?> create(@RequestParam("file")MultipartFile file) {
        try {
            String uploadedUrl = s3Uploader.upload(file, "test-uploads");
            System.out.println("uploadedUrl = " + uploadedUrl);
            return ResponseEntity.ok(uploadedUrl);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("업로드 실패: " + e.getMessage());
        }
    }
}
