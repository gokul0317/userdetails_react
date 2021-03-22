import
React, {
    useState,
    useEffect
}
from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux';
import {
    addUsersData,
    getAllUsers,
    updateUsersData,
} from './userSlice';
import {
    Modal,
    Button,
    Form
} from 'react-bootstrap'
import {useParams} from "react-router-dom"

export default function AddUser({
    handleClose,
    show
}) {
    const dispatch = useDispatch();
    const { id } = useParams()
    const values = useSelector(getAllUsers)
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    useEffect(() => {
        if (id) {
            setName(values.currentUser.name ?? '')
            setUrl(values.currentUser.Image ?? '')
        }
    }, [values.currentUser, id])
    const saveData = () => {
        if (id) {
            dispatch(updateUsersData({ _id: id, name, Image: url }))
        } else {
          dispatch(addUsersData({name, Image: url}))
        }
        handleClose()
    }

    return ( <
        Modal show = {
            show
        }
        onHide = {
            handleClose
        } >
        <
        Modal.Dialog >
        <
        Modal.Header closeButton >
        <
        Modal.Title > { id ? 'Edit User' : 'Add User'} < /Modal.Title> < /
        Modal.Header >
        <
        Modal.Body >
        <
        Form >
        <
        Form.Group controlId = "name" >
        <
        Form.Label > Name < /Form.Label> <
        Form.Control type = "text"
        placeholder = "Enter name"
        value = {
            name
        }
        onChange = {
            (e) => setName(e.target.value)
        }
        / > <
        Form.Text>
        <
        /Form.Text> < /
        Form.Group >
        <
        Form.Group controlId = "url" >
        <
        Form.Label > URL < /Form.Label> <
        Form.Control type = "text"
        placeholder = "URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        / >
        <
        /Form.Group>  < /
        Form > <
        /
        Modal.Body >

        <
        Modal.Footer >
        <
        Button variant = "secondary"
        onClick = {
            handleClose
        } > Close < /Button> <
        Button variant = "primary" onClick={saveData} > Save changes < /Button> < /
        Modal.Footer > <
        /Modal.Dialog> < /
        Modal >
    )
}
