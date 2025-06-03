import deleteNodes from "./deleteNodes";

// 선택된 폴더 리스트를 삭제하는 함수
// 이 함수는 useQuery 의 queryFn 값으로 쓰임
// queryFn 은 Promise 를 반환하는 비동기 함수이여야 하므로 async 키워드를 사용
async function deleteFolders(folders) {
    const payload = { folderIds: folders };
    return await deleteNodes("/folders/delete", payload);
}

export default deleteFolders;
