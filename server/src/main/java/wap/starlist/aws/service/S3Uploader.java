package wap.starlist.aws.service;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import wap.starlist.aws.config.AwsS3Properties;

@Service
@RequiredArgsConstructor
public class S3Uploader {

    private final S3Client s3Client;
    private final AwsS3Properties properties;

    /**
     * 멀티파트 파일을 지정된 디렉토리에 고유한 파일명으로 S3에 업로드합니다.
     * @return 업로드된 파일의 전체 URL
     * @throws IOException 파일을 읽거나 전송하는 중 오류가 발생할 경우
     */
    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        String originalFilename = getOriginalFileName(multipartFile);
        String fileName = createTimestampFileName(dirName, originalFilename);

        // S3 업로드
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(properties.getBucket())
                .key(fileName)
                .contentType(multipartFile.getContentType())
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(multipartFile.getBytes()));

        // 업로드된 파일의 URL 반환
        return s3Client.utilities()
                .getUrl(builder -> builder.bucket(properties.getBucket()).key(fileName))
                .toExternalForm();
    }

    private String getOriginalFileName(MultipartFile multipartFile) {
        String originalFilename = multipartFile.getOriginalFilename();
        if (originalFilename == null) throw new IllegalArgumentException("[ERROR] 파일 이름이 없습니다.");

        return originalFilename;
    }

    /**
     * 파일 이름 중복 방지를 위해 랜덤 파일명 생성
     * 원본 파일명 앞에 현재 시간을 붙인다
     * @return: {디렉토리 이름}/{업로드 시간}_{원본 파일명}
     */
    private String createTimestampFileName(String dirName, String originName) {
        return dirName + "/" + System.currentTimeMillis() + "_" + originName;
    }
}
