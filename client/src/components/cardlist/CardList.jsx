import React from "react";

import Toolbar from "./Toolbar";
import CardsContainer from "./CardsContainer";

const CardList = () => {
    return (
        <div className="flex flex-col max-w-screen-[1520px] mx-auto px-[150px] py-[150px]">
            <Toolbar/>
            <CardsContainer/>
        </div>
    );
}

export default CardList;