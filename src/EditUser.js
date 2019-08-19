import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { fetchUser } from "./UserService";
import { Divider } from '@material-ui/core';

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

export default function EditUser() {
    const classes = useStyles();
    const [values, setValues] = useState({
        id: "alice",
        name: 'Alice',
        age: '42',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <>
        <h2>View user</h2>
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                disabled
                label="Name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
            />
            <TextField
                disabled
                label="Name"
                className={classes.textField}
                value={values.age}
                onChange={handleChange('age')}
                margin="normal"
            />
            
        </form>
        </>
    );
}
