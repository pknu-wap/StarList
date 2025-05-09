package wap.starlist.bookmark.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import wap.starlist.bookmark.domain.Folder;
import wap.starlist.bookmark.repository.FolderRepository;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final FolderRepository folderRepository;

    public Folder createFolder(String title, Long userId) {
        // 필수값 검증(title, userId 존재 여부 확인)
        if (userId == null) {
            throw new IllegalArgumentException("[ERROR] 유저 정보가 존재하지 않습니다.");
        } else if (!StringUtils.hasText(title)) {
            throw new IllegalArgumentException("[ERROR] 폴더명이 존재하지 않습니다.");
        }

        //TODO: userId와 googleId는 매치되지 않음
        Folder folder = Folder.builder()
                .title(title)
                //.googleId(userId)
                .build();

        return folderRepository.save(folder);
    }

    public Folder getFolder(long id) {
        // id로 폴더 조회
        return folderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("[ERROR] 해당 폴더가 존재하지 않습니다."));
    }

    //폴더 삭제 메서드
    public void deleteFolder(Long id) {
        Folder folder = getFolder(id);
        folderRepository.delete(folder);
    }
}