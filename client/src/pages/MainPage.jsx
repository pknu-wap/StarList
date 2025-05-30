import React from "react";
import Header from "../components/header/Header";
import CardList from "../components/cardlist/CardList";
import RemindCarousel from "../components/remainder/RemindCarousel";
import ScrollToTopButton from "../components/cardlist/ScrollToTopButton";

const MainPage = () => {
    return (
        <div className="grid grid-rows-[1fr_3fr_6fr] gap-y-6 px-4 py-2">
            <Header />
            <RemindCarousel />
            <CardList />
            <ScrollToTopButton />
        </div>
    );
};

export default MainPage;
