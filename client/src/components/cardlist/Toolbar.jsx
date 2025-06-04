import React from "react";

import BreadCrumb from "./BreadCrumb";
import AddButton from "../buttons/AddButton";
import SearchBar from "./SearchBar";

const Toolbar = () => {
    return (
        <div className="flex w-full items-center justify-between">
            <BreadCrumb />
            <div className="flex items-center space-x-[21px]">
                <AddButton />
                <SearchBar />
            </div>
        </div>
    );
};

export default Toolbar;
