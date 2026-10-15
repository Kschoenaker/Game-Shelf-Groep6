import Header from "./Header/Header";
import Banner from "./Banner/Banner";
import Collections from "./Collections/Collections";
import { useState } from "react";

function CollectionsShelves() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    return (
        <>
            <Header title="COLLECTIONS & SHELVES" viewMode={viewMode} setViewMode={setViewMode} />
            <Banner />
            <Collections viewMode={viewMode} />
        </>
    );
}

export default CollectionsShelves;