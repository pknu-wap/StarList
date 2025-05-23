import React from "react";
import Header from "../components/header/Header";
import CardList from "../components/cardlist/CardList";
import RemindCarousel from "../components/remainder/RemindCarousel";

const MainPage = () => {
    return (
        <div>
            <Header />
            {/* <RemindCarousel /> 이후에 API완성 시 추가 */}
            <CardList />
        </div>
    );
};

export default MainPage;