import { useDispatch, useSelector } from 'react-redux'

const PlayersView = () => {
    const { Players } = useSelector((state) => state.Player)

    const playersGen = () =>{
        const list = [];
        for (const key in Players) {
            if (Object.hasOwnProperty.call(Players, key)) {
                const player = Players[key];
                list.push(
                    <tr key={key}>
                        <td>{player.id}</td>
                        <td>{player.name}</td>
                        <td>{player.team}</td>
                        <td>Edit</td>
                    </tr>
                    )
            }
        }
        return list;
    }
    return(
        <div>
            <h2>This is player view</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {playersGen()}
                </tbody>
            </table>
        </div>
    )
}
export default PlayersView;