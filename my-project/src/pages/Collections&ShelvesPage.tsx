import Header from "../components/Collections&Shelves/Header/Header";
import Banner from "../components/Collections&Shelves/Banner/Banner";
import Collections from "../components/Collections&Shelves/Collections/Collections";

import { useState } from "react";

function CollectionsShelves() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    return (
        <div className="collections-shelves-page">
            <Header title="COLLECTIONS & SHELVES" viewMode={viewMode} setViewMode={setViewMode} />
            <Banner />
            <Collections viewMode={viewMode} />
        </div>
    );
}

export default CollectionsShelves;