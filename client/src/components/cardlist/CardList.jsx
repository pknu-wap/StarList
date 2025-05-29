import React from "react";

import Toolbar from "./Toolbar";
import CardsContainer from "./CardsContainer";

const CardList = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1520px] flex-col px-4 py-8 sm:px-8 sm:py-10 md:px-12 md:py-16 lg:px-24 lg:py-24 xl:px-32 xl:py-[80px] 2xl:px-[150px] 2xl:py-[150px]">
            <Toolbar />
            <CardsContainer />
        </div>
    );
};

export default CardList;
