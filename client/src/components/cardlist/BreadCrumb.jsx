import React from "react";
import useFolderHistoryStore from "../../functions/hooks/useFolderHistoryStore";

import { ArrowForwardIcon } from "../../assets";

const BreadCrumb = () => {
    const history = useFolderHistoryStore((s) => s.history);
    const move = useFolderHistoryStore((s) => s.move);

    const onClick = (id) => {
        move(id);
    };

    return (
        <div className="flex items-center justify-center py-2">
            {history.map(({ id, title }, idx) => (
                <React.Fragment key={id}>
                    {idx !== 0 && <ArrowForwardIcon className="mx-2 h-5 w-5" />}
                    <span
                        onClick={() => onClick(id)}
                        className="cursor-pointer text-base hover:text-main-500 sm:text-lg"
                    >
                        {title}
                    </span>
                </React.Fragment>
            ))}
        </div>
    );
};

export default BreadCrumb;
