import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { navigate } from "@reach/router";
import { fetchUsers, updateUsers } from "./UserService";
import UserDialog from "./UserDialog";


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    progress: {
        margin: theme.spacing(2),
    },
}));

export default function UsersTable({ userId }) {
    const classes = useStyles();
    const [users, setUsers] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            let users;
            try {
                users = await fetchUsers();
            } catch (error) {
                console.error(error);
                return;
            }

            if (cancelled) {
                return;
            }

            setUsers(users);
        }

        fetchData();

        return () => {
            cancelled = true;
        }
    }, []);

    async function handleSave(user) {
        const userIndex = users.findIndex(u => u.id === user.id);
        const newUsers = [...users];
        newUsers[userIndex] = user;
        setUsers(newUsers);
        try {
            await updateUsers(newUsers);
        } catch (err) {
            setUsers(users);
        }
        await navigate(`/users`);
    }
    
    if (users === null) {
        return (
            <CircularProgress className={classes.progress} />
        );
    }

    const user = users.find(u => u.id === userId);
    const showUserDialog = userId !== null && userId !== undefined;

    function conditionallyShowUserDialog() {
        return showUserDialog ? <UserDialog user={user} handleSave={handleSave} /> : <></>
    }

    return (
        <>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>User name</TableCell>
                            <TableCell align="right">Age</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(row => (
                            <TableRow
                                key={row.name}
                                onClick={async () => await navigate(`/users/${row.id}`) }
                                hover
                                style={{ cursor: "pointer" }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.age}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            {conditionallyShowUserDialog()}
        </>
    );
}
