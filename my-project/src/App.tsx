import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Lending from "./pages/Lending";


function App() {
    return (
        <div className="app">
            <Sidebar />

            <main className="main-content">
                <Lending />
            </main>
        </div>
    );
}

export default App;