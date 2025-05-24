import React from "react";
import { useGetNodes } from "../../functions/hooks/useGetNodes";
import useAuthStore from "../../functions/hooks/useAuthStore";

import { CardSelectionContextProvider } from "../../context/CardSelectionContext";
import Toolbar from "./Toolbar";
import CardsContainer from "./CardsContainer";

const CardList = () => {
    const { data = [], status, error } = useGetNodes();
    const logout = useAuthStore(state => state.logout);

    if (status === "error" && error.code === 2002) {
        // 유효하지 않은 토큰이라면
        logout();
        return null;
    }

    return (
        <div className="flex flex-col max-w-screen-[1520px] mx-auto px-[150px] py-[150px]">
            <Toolbar/>
            <CardSelectionContextProvider>
                <CardsContainer
                    nodes={data}
                    status={status}
                    error={error}
                />
            </CardSelectionContextProvider>
        </div>
    );
}

export default CardList;