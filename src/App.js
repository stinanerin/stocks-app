import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StockOverviewPage from "./pages/StockOverviewPage";
import StockDetailPage from "./pages/StockDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

import { WatchListContextProvider } from "./components/context/WatchListContext";

function App() {
    return (
        <main>
            <WatchListContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={StockOverviewPage} />
                        <Route
                            exact
                            path="/detail/:symbol"
                            component={StockDetailPage}
                        />
                        <Route path="/*" component={NotFoundPage} />
                    </Switch>
                </Router>
            </WatchListContextProvider>
        </main>
    );
}

export default App;
