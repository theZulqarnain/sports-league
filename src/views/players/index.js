import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { Card, Form, Row, Col, Button, InputGroup, FormControl, Alert } from 'react-bootstrap'
import { ChevronDown, Plus, X, Trash2 } from 'react-feather'
import ModalComponent from '../../components/ModalComponent';


const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <Row className='w-100'>
        <Col sm='12'>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Player Name"
                    aria-label="Player Name"
                    aria-describedby="basic-addon2"
                    value={filterText} onChange={onFilter}
                />
                <InputGroup.Append onClick={onClear} className="cursor-pointer">
                    <InputGroup.Text id="basic-addon2" >
                        <X size={14} />
                    </InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
        </Col>
    </Row>
);

const PlayersView = () => {
    const { Players } = useSelector((state) => state.Player)
    const { Teams } = useSelector((state) => state.Team);
    const dispatch = useDispatch()

    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [modalState, setModalState] = useState(false)
    const [newPlayer,setNewPlayer] = useState("")

    const advSearchColumns = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
            minWidth: '200px'
        },

        {
            name: 'Team',
            selector: 'teamId',
            sortable: true,
            cell: row => ( row.teamId ? Teams[row.teamId].name: "NA"),
            minWidth: '200px'
        }
    ]
    const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
        <div className="custom-control custom-checkbox">
            <input
                type="checkbox"
                className="custom-control-input"
                ref={ref}
                {...rest}
            />
            <label className="custom-control-label" onClick={onClick} />
        </div>
    ));

    const subHeaderComponent = useMemo((team) => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };
        console.log(team, 'team');
        return (
            <Row className='w-100'>
                <Col sm='7'>

                </Col>
                <Col sm='5'>
                <div className="d-flex align-self-center justify-content-end">
                    <FilterComponent
                                onFilter={e => setFilterText(e.target.value)}
                                onClear={handleClear}
                                filterText={filterText}
                            />
                    {/* <Button className="d-flex align-self-center align-items-center ml-1" variant="primary" onClick={() => setModalState(true)} disabled>
                        <div className="d-flex align-items-center justify-content-center">
                            <Plus size={14} />
                            <p style={{ fontSize: 12, marginLeft: 1, marginBottom: 0 }}>Add Player</p>
                        </div>
                    </Button> */}
                </div>
                </Col>
            </Row>
        );
    }, [filterText, resetPaginationToggle]);
    const PlayerGen = () => {
        const players = []
        for (const key in Teams) {
            if (Object.hasOwnProperty.call(Teams, key)) {
                const team = Teams[key];
                team.players.map((playerId, i) => {
                    if (Players[playerId]) {
                        const player = Players[playerId]
                        player['teamId'] = key
                        players.push(player)
                    }
                })
            }
        }
        return <Card style={{ margin: 10 }}>
            <DataTable
                title="Players List"
                columns={advSearchColumns}
                data={players.filter(
                    item =>
                        JSON.stringify(item)
                            .toLowerCase()
                            .indexOf(filterText.toLowerCase()) !== -1
                )}
                defaultSortField="name"
                pagination
                selectableRows
                subHeader
                selectableRowsComponent={BootyCheckbox}
                highlightOnHover={true}
                pointerOnHover={true}
                subHeaderComponent={subHeaderComponent}
                subHeaderWrap={true}
            />
        </Card>
    }

    const ModalHandler = () =>{
        // dispatch(AddTeamHandler(newTeam))
        setModalState(false)
    }
    return (
        <div>
            {PlayerGen()}
            <ModalComponent
                show={modalState}
                handleClose ={()=>setModalState(!modalState)}
                header="Add Player"
                subBtnText = "Add Player"
                handleSubmit = {ModalHandler}
            >
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="Player Name" value={newPlayer} onChange={(e)=>setNewPlayer(e.target.value)}/>
                    </Form.Group>
                </Form>
            </ModalComponent>
        </div>
    )
}
export default PlayersView;