import { useSelector } from 'react-redux'

const TeamsView = () => {
    const { Teams } = useSelector((state) => state.Team);

    return(
        <h2>This is Team view</h2>
    )
}
export default TeamsView;