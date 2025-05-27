package wap.starlist.bookmark.dto.response;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wap.starlist.bookmark.domain.Folder;
import wap.starlist.bookmark.domain.Root;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FolderTreeNode {

    private Long id;
    private Long googleId;
    private String title;
    private Integer position;
    private String folderType;
    private Long dateAdded;
    private Long dataGroupModified;
    private List<FolderTreeNode> children;

    public static FolderTreeNode from(Root root) {
        return FolderTreeNode.builder()
                .id(root.getId())
                .googleId(root.getGoogleId())
                .children(new ArrayList<>())
                .build();
    }

    public static FolderTreeNode from(Folder folder) {
        return FolderTreeNode.builder()
                .id(folder.getId())
                .googleId(Long.valueOf(folder.getGoogleId()))
                .title(folder.getTitle())
                .position(folder.getPosition())
                .folderType(folder.getFolderType())
                .dateAdded(folder.getDateAdded())
                .dataGroupModified(folder.getDateGroupModified())
                .children(new ArrayList<>())
                .build();
    }

    public boolean addChild(FolderTreeNode node) {
        if (node == null) return false;
        return this.children.add(node);
    }
}
