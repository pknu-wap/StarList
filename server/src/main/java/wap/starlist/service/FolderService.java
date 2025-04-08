package wap.starlist.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import wap.starlist.domain.Folder;
import wap.starlist.repository.FolderRepository;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final FolderRepository folderRepository;

    public Folder createFolder(String title, Long userId) {
        // 필수값 검증(title, userId 존재 여부 확인)
        if (!StringUtils.hasText(title) || userId == null) {
            throw new IllegalArgumentException("[ERROR] 폴더명 혹은 유저 정보가 존재하지 않습니다.");
        }

        Folder folder = Folder.builder()
                .title(title)
                .googleId(userId)
                .build();

        return folderRepository.save(folder);
    }
}