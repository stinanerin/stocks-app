import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StockOverviewPage from "./components/pages/StockOverviewPage";
import StockDetailPage from "./components/pages/StockDetailPage";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
    return (
        <main>
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
        </main>
    );
}

export default App;
