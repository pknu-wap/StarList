import fetchNodesByPath from "../apis/fetchNodesByPath";

async function getNodesBySearch(keyword) {
    // 한글, 특수문자 등은 URL 에서 그대로 쓸 수 없으므로 인코딩
    const query = encodeURIComponent(keyword);
    return await fetchNodesByPath(`/bookmarks/search?query=${query}`);
}

export default getNodesBySearch;
