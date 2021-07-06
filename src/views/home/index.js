import PlayersView from "../players";
import TeamsView from "../teams";

const Home = () => {
  return (
    <div>
      <h2>Sports League Roaster</h2>
      <PlayersView/>
      <TeamsView/>
    </div>
  );
}

export default Home;
