import React from "react";

import Toolbar from "./Toolbar";
import CardsContainer from "./CardsContainer";

const CardList = () => {
    return (
        <div className="mx-auto flex w-full flex-col px-10">
            <Toolbar />
            <CardsContainer />
        </div>
    );
};

export default CardList;
