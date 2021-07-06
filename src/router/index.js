import {
    BrowserRouter as AppRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "../views/home";
import PlayersView from "../views/players";
import TeamsView from "../views/teams";
import { HomeRoute, TeamsRoute, PlayersRoute} from "./Routes"

const Router = () => {

    return (
        <AppRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to={TeamsRoute}>Teams</Link>
                        </li>
                        <li>
                            <Link to={PlayersRoute}>Players</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path={TeamsRoute}>
                        <TeamsView />
                    </Route>
                    <Route path={PlayersRoute}>
                        <PlayersView />
                    </Route>
                    <Route path={HomeRoute}>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </AppRouter>
    )
}
export default Router