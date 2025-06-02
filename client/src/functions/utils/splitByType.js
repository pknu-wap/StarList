// 선택된 카드 리스트에서 북마크, 폴더 리스트로 분류
function splitByType(cards) {
    const folders = [];
    const bookmarks = [];
    cards.forEach((card) => {
        if (card.type === "folder") folders.push(card.id);
        else if (card.type === "bookmark") bookmarks.push(card.id);
    });

    return { folders, bookmarks };
}

export default splitByType;
