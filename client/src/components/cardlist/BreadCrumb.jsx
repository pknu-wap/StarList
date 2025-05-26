import React from "react";
import useFolderHistoryStore from "../../functions/hooks/useFolderHistoryStore";

import { ArrowForwardIcon } from "../../assets";

const BreadCrumb = () => {
    const history = useFolderHistoryStore(s => s.history);
    const move = useFolderHistoryStore(s => s.move);
    
    const onClick = (id) => {
        move(id);
    }

    return (
        <div className="flex justify-center space-x-2">
            {history.map(({ id, title }, index) => (
                <div key={id} className="flex items-center">
                    <span onClick={() => onClick(id)}>{title}</span>
                    {index < history.length - 1 && <ArrowForwardIcon/>}
                </div>
            ))}
        </div>
    );
}

export default BreadCrumb;