import React from "react";

import { CardSelectionContextProvider } from "../../context/CardSelectionContext";
import Toolbar from "./Toolbar";
import CardsContainer from "./CardsContainer";

const CardList = () => {
    return (
        <div className="flex flex-col max-w-screen-[1520px] mx-auto px-[150px] py-[150px]">
            <Toolbar/>
            <CardSelectionContextProvider>
                <CardsContainer/>
            </CardSelectionContextProvider>
        </div>
    );
}

export default CardList;