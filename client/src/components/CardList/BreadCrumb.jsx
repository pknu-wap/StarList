import React from "react";
import useCurrentPositionStore from "../../functions/hooks/useCurrentPositionStore";
import useFolderPathStore from "../../functions/hooks/useFolderPathStore";

import { ArrowForwardIcon } from "../../assets";

const BreadCrumb = () => {
    const setCurrentPosition = useCurrentPositionStore(state => state.setCurrentPosition);
    const stack = useFolderPathStore(state => state.stack);
    const move = useFolderPathStore(state => state.move);
    
    return (
        <div className="flex justify-center space-x-2">
            {stack.map(({ id, title }) => (
                <div key={id} className="flex items-center">
                    <span onClick={() => { move(id); setCurrentPosition(id); }}>{title}</span>
                    {stack.at(stack.length - 1) !== id && <ArrowForwardIcon/>}
                </div>
            ))}
        </div>
    );
}

export default BreadCrumb;