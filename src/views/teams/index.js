import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Plus, X, Trash2 } from 'react-feather'
import { Card, Form, Row, Col, Button, Badge,Alert } from 'react-bootstrap'
import Select from "react-select"
import { AddPlayerToTeamHandler, AddTeamHandler, DeletePlayerFromTeamHandler, RemoveTeamHandler } from '../../redux/actions/teamsAction'

import ModalComponent from '../../components/ModalComponent';

const TeamsView = () => {
    const { Teams } = useSelector((state) => state.Team);
    const { Players } = useSelector((state) => state.Player)
    const dispatch = useDispatch()

    const [teamsData, setTeamsData] = useState({})
    const [searchName, setSearchName] = useState("")
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [currentPlayer,setCurrentPlayer] = useState({})
    const [newPlayer,setNewPlayer] = useState("")
    const [currentTeam,setCurrentTeam] = useState({})
    const [newTeam,setNewTeam] = useState("")
    const [modalState, setModalState] = useState(false)
    const [modalType, setModalType] = useState("")
    useEffect(()=>{
        TeamsGen()
    },[Teams])
    const subHeaderComponent = (team) =>{
        return (
            <Row className='w-100'>
                <Col sm='6'>
                </Col>
                <Col sm='6'>
                    <div className="d-flex align-self-center justify-content-end">
                        <Button className="d-flex align-self-center align-items-center mr-1" variant="primary" onClick={()=>ModalStateHandler(team,'add_player')}>
                        <div className="d-flex align-items-center justify-content-center">
                            <Plus size={14} />
                            <p style={{fontSize:12,marginLeft:1,marginBottom:0}}>Add Player</p>
                        </div>
                        </Button>
                        <Button className="d-flex align-self-center align-items-center" variant="danger" onClick={()=>ModalStateHandler(team,'remove_team')}>
                            <div className="d-flex align-items-center justify-content-center">
                                <Trash2 size={14} />
                                <p style={{fontSize:12,marginLeft:1,marginBottom:0}}>Remove Team</p>
                            </div>
                        </Button>
                    </div>
                </Col>
            </Row>
        );
    }

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
            name: "Action",
            button: true,
            minWidth: '100px',
            cell: row => (
                <Badge variant="danger" className="p-1 cusor-pointer" onClick={()=>ModalStateHandler(row,'delete_player')}>
                    <div className="d-flex align-items-center justify-content-center">
                        <Trash2 size={14} />
                        <p style={{fontSize:12,marginLeft:1,marginBottom:0}}>Delete</p>
                    </div>
                </Badge>
                // <Button className="my-2"  variant="danger" onClick={()=>ModalStateHandler(row,'delete_player')}>
                //     <div className="d-flex align-items-center justify-content-center">
                //         <Trash2 size={14} />
                //         <p style={{fontSize:12,marginLeft:1,marginBottom:0}}>Delete</p>
                //     </div>
                // </Button>
            )
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

    const TeamsGen = () => {
        const list = [];
        for (const key in Teams) {
            const players = []
            if (Object.hasOwnProperty.call(Teams, key)) {
                const team = Teams[key];
                team.players.map((playerId, i) => {
                    if (Players[playerId]) {
                        const player = Players[playerId]
                        player['teamId'] = key
                        players.push(player)
                    }
                })
                list.push(
                    <Col sm="6">
                        <Card style={{margin:10}} key={key}>
                        <DataTable
                            title={Teams[key].name}
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
                            subHeaderComponent={subHeaderComponent(Teams[key])}
                            subHeaderWrap={true}
                            className='react-dataTable'
                        />
                    </Card>
                </Col>
                )
            }
        }
        return (
            <Row>
                {list}
            </Row>
        );
    }

    const ModalStateHandler = (data,type) =>{
        if(type === 'delete_player'){
            setCurrentPlayer(data)
            setModalType('delete_player')
        }

        if(type === 'add_player'){
            setCurrentTeam(data)
            setModalType('add_player')
        } else if( type === 'remove_team'){
            setCurrentTeam(data)
            setModalType('remove_team')
        }else if( type === 'add_team'){
            setModalType('add_team')
        }
        setModalState(true)
        
    }
    const ModalHandler = () =>{
        if(modalType === 'delete_player'){
            if(currentPlayer && Object.keys(currentPlayer).length){
                dispatch(DeletePlayerFromTeamHandler(currentPlayer))
                setModalState(false)
                setCurrentPlayer("")
            }
        }else if(modalType === 'add_player'){
            dispatch(AddPlayerToTeamHandler(newPlayer,currentTeam.id))
            setModalState(false)
            setNewPlayer({})
            setCurrentTeam({})
        } else if( modalType ===  'remove_team'){
            dispatch(RemoveTeamHandler(currentTeam.id))
            setModalState(false)
        }else if( modalType === 'add_team'){
            dispatch(AddTeamHandler(newTeam))
            setModalState(false)
            setNewTeam("")
        }
        
    }

    const modalHeaderGen = () =>{
        if(modalType === 'delete_player' || modalType === 'remove_team'){
            return "Confirmation!"
        } else if(modalType === 'add_player'){
            return"Add New Player"
        }else if( modalType === 'add_team'){
            return"Add New Team"
        }
    }
    const modalContentGen = () =>{
        if(modalType === 'delete_player'){
            return(
                <Alert variant="danger">
                    Do you wants to delete {currentPlayer.name} Player
                </Alert>
            )
        } else if(modalType === 'add_player'){
            
            return(
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="Player Name" value={newPlayer} onChange={(e)=>setNewPlayer(e.target.value)}/>
                    </Form.Group>
                </Form>
            )
        }else if(modalType === 'remove_team'){
            return(
                <Alert variant="danger">
                    Do you wants to delete {currentTeam.name} Team
                </Alert>
            )
        } else if( modalType === 'add_team'){
            return(
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="Team Name" value={newTeam} onChange={(e)=>setNewTeam(e.target.value)}/>
                    </Form.Group>
                </Form>
            )
        }
    }

    const modalSubmitTxtGen = () =>{
        if(modalType === 'delete_player'){
            return "Delete"
        } else if(modalType === 'add_player'){
            return"Add Player"
        }else if(modalType === 'remove_team'){
            return"Remove Team"
        } else if( modalType === 'add_team'){
            return"Add Team"
        }
    }
    return (
        <Fragment>
            <div className="d-flex justify-content-end px-3 mt-3">
                <Button className="d-flex align-self-center align-items-center" variant="primary" size="lg" onClick={()=>ModalStateHandler('','add_team')}>
                    <div className="d-flex align-items-center justify-content-center">
                        <Plus size={14} />
                        <p style={{fontSize:14,marginLeft:1,marginBottom:0}}>Add New Team</p>
                    </div>
                </Button>
            </div>
            {TeamsGen()}
            <ModalComponent
                show={modalState}
                handleClose ={()=>setModalState(!modalState)}
                header={modalHeaderGen()}
                subBtnText ={modalSubmitTxtGen()}
                handleSubmit = {ModalHandler}
            >
                {modalContentGen()}
            </ModalComponent>
        </Fragment>
    )
}
export default TeamsView;