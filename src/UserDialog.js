import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from "@reach/router";


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
}));

export default function UserDialog({ user, handleSave }) {
    const classes = useStyles();
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState(user);

    const handleChange = name => event => {
        setUserData({ ...userData, [name]: event.target.value });
    };

    async function handleClose() {
        await navigate(`/users`);
    }

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">User details</DialogTitle>
            <DialogContent>
                <TextField
                    disabled={!editing}
                    label="Name"
                    className={classes.textField}
                    value={userData.name}
                    onChange={handleChange('name')}
                    margin="normal"
                />
                <TextField
                    disabled={!editing}
                    label="Age"
                    className={classes.textField}
                    value={userData.age}
                    onChange={handleChange('age')}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                {!editing &&
                    <Button onClick={() => setEditing(!editing)} color="primary">
                    Edit
                </Button>}
                {editing &&
                    <Button onClick={() => handleSave(userData)} color="primary">
                        Save
                </Button>}
            </DialogActions>
        </Dialog>
    );
}
