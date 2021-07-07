import PlayersView from "../players";
import TeamsView from "../teams";
import Background from '../../assets/images/bg_grnd.jpg';
import { Card } from "react-bootstrap";
import { ArrowDown } from "react-feather";
import { useHistory } from "react-router";

const styles = {
  header: {
    backgroundImage: `url(${Background})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },

  content: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
}
const Home = () => {

  const history = useHistory()
  return (
    <div  style={styles.header}>
      <div style={styles.content} className="d-flex justify-content-center align-items-center">
        <Card
            bg='info'
            text={'info' === 'light' ? 'dark' : 'white'}
            style={{ width: '24rem',cursor:'pointer',boxShadow:50 }}
            className="mb-4 mr-3 "
            onClick={()=>history.push('/teams')}
          >
            <Card.Body>
              <h3> League Teams {<ArrowDown size={25} />} </h3>
              <Card.Text>
               Click here to find our League Teams
              </Card.Text>
            </Card.Body>
          </Card>

          <Card
            bg='info'
            text={'info' === 'light' ? 'dark' : 'white'}
            style={{ width: '24rem',cursor:'pointer',boxShadow:50 }}
            className="mb-4"
            onClick={()=>history.push('/players')}
          >
            <Card.Body>
              <h3> League Players {<ArrowDown size={25} />}</h3>
              <Card.Text>
                Click here to find our League Players
              </Card.Text>
            </Card.Body>
          </Card>
      </div>
      {/* <PlayersView/>
      <TeamsView/> */}
    </div>
  );
}

export default Home;
