import React from "react";
import { useGetNodes } from "../../functions/hooks/useGetNodes";
import BookmarkCard from "../bookmark/BookmarkCard";
import FolderCard from "FolderCard";

const CardList = () => {
    const { data, status, error } = useGetNodes();

    if (status === "error")
        return <p>에러 발생: {error.message}</p>

    return (
        <div className="max-w-screen-[1520px] mx-auto px-[150px] py-[150px]">
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map(item => (
                    item.url === null
                        ? <FolderCard/>
                        : <BookmarkCard/>
                ))}
            </div>
        </div>
    )

}