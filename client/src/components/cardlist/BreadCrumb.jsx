import React from "react";
import useFolderHistoryStore from "../../functions/hooks/useFolderHistoryStore";

import { ArrowForwardIcon } from "../../assets";

const BreadCrumb = () => {
    const history = useFolderHistoryStore((s) => s.history);
    const currentPosition = history[history.length - 1].id;
    const goBack = useFolderHistoryStore((s) => s.goBack);

    const onClick = (id) => {
        goBack(id);
    };

    return (
        <div className="flex items-center justify-center py-4">
            {history.map(({ id, title }, idx) => (
                <React.Fragment key={id}>
                    {idx !== 0 && <ArrowForwardIcon className="mx-2 h-3 w-5" />}
                    <span
                        onClick={() => onClick(id)}
                        className={`cursor-pointer font-bold hover:text-main-500 sm:text-lg md:text-2xl lg:text-3xl ${id === currentPosition ? "text-black" : "text-gray-300"}`}
                    >
                        {title}
                    </span>
                </React.Fragment>
            ))}
        </div>
    );
};

export default BreadCrumb;
