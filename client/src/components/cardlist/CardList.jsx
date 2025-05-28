import React from "react";

import Toolbar from "./Toolbar";
import CardsContainer from "./CardsContainer";

const CardList = () => {
    return (
        <div className="max-w-screen-[1520px] mx-auto flex flex-col px-[150px] py-[150px]">
            <Toolbar />
            <CardsContainer />
        </div>
    );
};

export default CardList;
