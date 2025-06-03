/**
 *
 * @param {object} folderTree (루트 폴더의 자식 노드부터 시작한다고 가정)
 * @param {number} targetFolderId
 * @param {list[object]} currentPath
 * @returns {list[object] || null} result
 */

// 재귀적으로 현재 폴더 트리에서 타깃 폴더까지의 경로를 찾는 함수
function findFolderPath(folderTree, targetFolderId, currentPath = []) {
    // 루트 폴더는 추가하고 시작
    if (currentPath.length === 0)
        findFolderPath(folderTree, targetFolderId, [...currentPath, { id: 0, title: "나의 북마크" }]);

    // 현재까지 누적된 폴더 경로에 현재 폴더를 추가
    const updatedPath = [...currentPath, { id: folderTree.id, title: folderTree.title }];

    // Base case 1. empty tree 라면
    if (!folderTree) return null;

    // Base case 2. 타깃 id 를 찾았다면
    if (folderTree.id === targetFolderId) return updatedPath;

    // Base case 3. 현재 트리의 자식이 없다면
    if (!folderTree.children) return null;

    // 현재 자식 노드들에 대해서 재귀적으로 탐색하고 하나라도 성공하는 케이스가 있다면 반환
    for (const child of folderTree.children) {
        const result = findFolderPath(child, targetFolderId, updatedPath);
        if (result) return result;
    }

    // 모든 경우의 수를 탐색했으나 없다면
    return null;
}

export default findFolderPath;
