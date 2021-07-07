import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Plus } from 'react-feather'
import { Card, CardHeader, CardBody, CardTitle, Input, Label, FormGroup, Row, Col, Badge, Button, CustomInput } from 'reactstrap'
import { useHistory } from 'react-router';

import styled from "styled-components";

// const Input = styled.input.attrs(props => ({
//   type: "text",
//   size: props.small ? 5 : undefined
// }))`
//   height: 32px;
//   width: 200px;
//   border-radius: 3px;
//   border-top-left-radius: 5px;
//   border-bottom-left-radius: 5px;
//   border-top-right-radius: 0;
//   border-bottom-right-radius: 0;
//   border: 1px solid #e5e5e5;
//   padding: 0 32px 0 16px;
// `;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <Row className='w-100'>
        <Col sm='10'>
            <Input
                id="search"
                type="text"
                placeholder="Filter table data..."
                value={filterText}
                onChange={onFilter}
            />
        </Col>
        <Col sm='2'>
            <ClearButton onClick={onClear}>X</ClearButton>
        </Col>
    </Row>
  );

const TeamsView = () => {
    const { Teams } = useSelector((state) => state.Team);
    const { Players } = useSelector((state) => state.Player)

    const [teamsData, setTeamsData] = useState({})
    const [searchName, setSearchName] = useState("")
    const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(
    false
  );
    // ** Function to toggle sidebar
    useEffect(() => {
        const teamsInfo = {};
        for (const key in Teams) {
            if (Object.hasOwnProperty.call(Teams, key)) {
                const team = Teams[key];
                team.players.map((playerId, i) => {
                    if (Players[playerId]) {
                        if (teamsInfo[team.name]) {
                            teamsInfo[team.name].push(Players[playerId])
                        } else {
                            teamsInfo[team.name] = []
                            teamsInfo[team.name].push(Players[playerId])
                        }
                    }
                })
            }
        }
        if (Object.keys(teamsData).length === 0) {
            setTeamsData(teamsInfo)
        }
    }, [])
    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
          }
        };
    
        return (
            <Row className='w-100'>
                <Col sm='10'>
                    <FilterComponent
                        onFilter={e => setFilterText(e.target.value)}
                        onClear={handleClear}
                        filterText={filterText}
                    />
                </Col>
                <Col sm='2'>
                {/* <Button color="primary">success</Button>{' '} */}
                    <Button className="d-flex align-self-center" color="primary" onClick={()=>{}}>
                        <Plus size={14} />
                        New Player
                    </Button>
                </Col>
            </Row>
        );
    }, [filterText, resetPaginationToggle]);

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
            minWidth: '70px'
        },
        {
            name: "Action",
            button: true,
            cell: row => <button onClick={() => console.log(row.name)}>Delete</button>
          }
    ]

    console.log(teamsData, 'teamsData');
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
    const filteredItems = teamsData['Sunrisers Hyderabad'] && teamsData['Sunrisers Hyderabad'].filter(
        item =>
          JSON.stringify(item)
            .toLowerCase()
            .indexOf(filterText.toLowerCase()) !== -1
      );
    return (
        <Fragment>
            <Card>
                {/* <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Plan Initiatives</CardTitle>
                    <div className="actions">
                        <Button.Ripple className="d-flex align-self-center" color="primary" onClick={() => {

                        }}>
                            <Plus size={14} />
                            New Player
                        </Button.Ripple>
                    </div>
                </CardHeader> */}
                {/* <CardBody>
                    <Row form className='mt-1 mb-50'>
                        <Col lg='4' md='3'>
                            <FormGroup>
                                <Label for='name'>Search by Name:</Label>
                                <Input id='name' placeholder='Enter Player Name' value={searchName}  />
                            </FormGroup>
                        </Col>

                    </Row>
                </CardBody> */}
                <DataTable
                    title="Teams"
                    columns={advSearchColumns}
                    data={filteredItems}
                    defaultSortField="name"
                    pagination
                    selectableRows
                    subHeader
                    selectableRowsComponent={BootyCheckbox}
                    highlightOnHover={true}
                    pointerOnHover={true}
                    subHeaderComponent={subHeaderComponent}
                    className='react-dataTable'
                />
            </Card>
        </Fragment>
    )
}
export default TeamsView;