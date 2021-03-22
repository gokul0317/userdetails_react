import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentUser, getAllUsers, setCurrentUser} from './userSlice';
import { useParams } from 'react-router-dom'
import {
    Card,
    Button,
    Container,
    Row,
    Col,
    Spinner
} from 'react-bootstrap'
import AddUser from './AddUser'
import {useHistory, Link} from "react-router-dom"

export default function SingleView() {
    const { id } = useParams()
    const values = useSelector(getAllUsers)
    const dispatch = useDispatch();
    const history = useHistory()
    const [current, setCurrent] = useState({})
    const [notFound, setNotFound] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        dispatch(getCurrentUser(id))
        return () => {
            dispatch(setCurrentUser({}))
        }
    }, [id])

    return (<Container>
        <Row className="mr-auto" style={{
                marginTop: '10px'
            }}>
            <Col sm="4">
                <Button onClick={() => history.push('/')}>Go Back</Button>
            </Col>
        </Row>
        <Container>
            {values.loading ? <Spinner animation="border" />: null}
            {notFound ? <p> No User Found </p> : null}
            <Row className="mr-auto" style={{
                    marginTop: '10px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr'
                }}>
                {
                    <Col sm="3" style={{ margin: '10px' }}>
                            <Card style={{
                                    width: '20rem',
                                }}>
                                <Card.Img variant="top" src={values.currentUser.Image ?? ''} style={{ height: '150px' }}/>
                                <Card.Body>
                                    <div style={{ display: 'flex', justifyContent: "space-around" }}>
                                    <p>{values.currentUser.name ?? ''}</p>
                                    <Button onClick={handleShow}>Edit</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                }
                </Row>
        </Container>
        <AddUser show={show} handleClose={handleClose}/>
    </Container>);
}
