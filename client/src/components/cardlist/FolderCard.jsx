import React from "react";
import { useCurrentPositionStore } from "../../functions/hooks/useCurrentPositionStore";

const FolderCard = ({ info }) => {
    const setCurrentPosition = useCurrentPositionStore(state => state.setCurrentPosition);

    return (
        <div onClick={() => setCurrentPosition(info.id)}>
            <p>{info.title}</p>
        </div>
    )
}

export default FolderCard;
