import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllUsersData, getAllUsers} from './userSlice';
import {
    Card,
    Button,
    Nav,
    Container,
    Form,
    Row,
    Col,
    Spinner
} from 'react-bootstrap'
import AddUser from './AddUser'
import {useHistory, Link} from "react-router-dom"

function UserDetail() {
    const values = useSelector(getAllUsers)
    const dispatch = useDispatch();
    const history = useHistory()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        dispatch(getAllUsersData())
    }, [])
    return (<Container>
        <Row className="mr-auto" style={{
                marginTop: '10px'
            }}>
            <Col sm="8">
                <Form.Control type="search" placeholder="Search"/>
            </Col>
            <Col sm="4">
                <Button onClick={() => setShow(true)}>Add User</Button>
            </Col>
        </Row>
        <Container>
            {
                values.loading
                    ? <Spinner animation="border"/>
                    : <Row className="mr-auto" style={{
                                marginTop: '10px',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr'
                            }}>
                            {
                                !values.userDetails.length
                                    ? <p>No Users Found</p>
                                    : null
                            }
                            {
                                values.userDetails.map((elm, i) => {
                                    return (<Col sm="3" key={i} style={{
                                            margin: '10px'
                                        }}>
                                        <Card style={{
                                                width: '18rem'
                                            }}>
                                            <Card.Img variant="top" src={elm.Image} style={{
                                                    height: '150px'
                                                }}/>
                                            <Card.Body>
                                                <Link to={`/userdetail/${elm._id}`}>{elm.name}</Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>)
                                })
                            }
                        </Row>
            }
        </Container>
        <AddUser show={show} handleClose={handleClose} />
    </Container>);
}

export default UserDetail;
