import React from "react";

import Toolbar from "./Toolbar";
import CardsContainer from "./CardsContainer";

const CardList = () => {
    return (
        <div className="my-4 flex w-full flex-col gap-y-10 px-10">
            <Toolbar />
            <CardsContainer />
        </div>
    );
};

export default CardList;
