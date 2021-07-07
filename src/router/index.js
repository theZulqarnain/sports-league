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
import { Navbar,Nav } from 'react-bootstrap'

const Router = () => {

    return (
        <AppRouter>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand to="/">Sports League Roaster</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to={TeamsRoute}>Teams</Nav.Link>
                    <Nav.Link as={Link} to={PlayersRoute}>Players</Nav.Link>
                </Nav>
            </Navbar>
            <div>
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