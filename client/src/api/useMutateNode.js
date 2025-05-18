import { useMutation, useQueryClient } from "@tanstack/react-query";

// mutationFn 은 Promise 를 반환하는 비동기 함수이여야 하므로 async 키워드를 사용
async function syncBookmarkChanges(eventType, id, info) {
    try {
        const userToken = localStorage.getItem("jwt");

        // 삭제 이벤트만 다르게 처리
        const isRemove = (eventType === "remove");
        const url = isRemove
            ? `${API_BASE_URL}/bookmarks/temp1`
            : `${API_BASE_URL}/bookmarks/temp2`;
            
        // 삭제 이벤트는 DELETE, 나머지는 POST
        const options = {
            method: isRemove ? "DELETE" : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({ eventType, id, info })
        };

        // 토큰과 이벤트를 백엔드 API 로 전송
        const response = await fetch(url, options);

        if (!response.ok) {
            console.log(response);
            throw new Error(`응답 상태: ${response.status}`);
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

function useMutateNode() {
    // QueryClientProvider 가 공급한 동일한 QueryClient 인스턴스를 꺼냄
    // 이를 통해 함수 내부에서 queryClient API 를 호출 가능
    const queryClient = useQueryClient();

    return useMutation({    
        mutationFn: ({ eventType, id, info }) => syncBookmarkChanges(eventType, id, info),

        // Mutate 시작전
        onMutate: ({ folderId }) => {
            console.log("Mutation 시작 전 백업");

            // 먼저 데이터를 백업
            const previous = queryClient.getQueryData(["nodes", folderId]);
            return previous;
        },

        // Mutate 성공시
        onSuccess: ({ folderId }) => {
            console.log("Mutation 성공");

            // 해당 folderId 의 쿼리를 무효화하여 자동 refetch
            queryClient.invalidateQueries({
                querykey: ["nodes", folderId],
                refetchType: "all"
            });
        },

        // Mutate 실패시
        onError: ({folderId}) => {    
            console.log("Mutation 실패");

        }
    });
}

export { useMutateNode };