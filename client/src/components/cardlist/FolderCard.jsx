import React from "react";
import useCurrentPositionStore from "../../functions/hooks/useCurrentPositionStore";
import useFolderStackStore from "../../functions/hooks/useFolderPathStore";

const FolderCard = ({ info }) => {
    const setCurrentPosition = useCurrentPositionStore(state => state.setCurrentPosition);
    const push = useFolderStackStore(state => state.push);

    const onClick = () => {
        push({ id: info.id, title: info.title });
        setCurrentPosition(info.id);
    };

    return (
        <div onClick={onClick}>
            <p>{info.title}</p>
        </div>
    );
}

export default FolderCard;
