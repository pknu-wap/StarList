import React from "react";
import useFolderHistoryStore from "../../functions/hooks/useFolderHistoryStore";

const FolderCard = ({ info }) => {
    const push = useFolderHistoryStore(s => s.push);
    
    const onClick = () => {
        push({ id: info.id, title: info.title });
    };

    return (
        <div onClick={onClick}>
            <p>{info.title}</p>
        </div>
    );
}

export default FolderCard;
