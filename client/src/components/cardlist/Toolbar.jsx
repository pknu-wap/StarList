import React from "react";

import BreadCrumb from "./BreadCrumb";
import AddButton from "./AddButton";
import SearchBar from "./SearchBar";

const Toolbar = () => {
    return (
        <div className="flex items-center justify-between p-4">
            <BreadCrumb />
            <div className="flex items-center space-x-2">
                <AddButton />
                <SearchBar />
            </div>
        </div>
    );
}

export default Toolbar;
