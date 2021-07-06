import { useDispatch, useSelector } from 'react-redux'

const PlayersView = () => {
    const { Players } = useSelector((state) => state.Player)

    return(
        <h2>This is player view</h2>
    )
}
export default PlayersView;