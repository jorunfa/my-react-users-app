import { GoogleLogin } from 'react-google-login';
import React, {  } from 'react';
import { Router, navigate } from "@reach/router";
import UsersTable from './UsersTable';
import './center.css';

function App() {
  return (
    <Router className="center">
      <GoogleLogin path="/"
        clientId="1076638153621-b5stn6dri8r9q0klhp9s4sis6u0g67le.apps.googleusercontent.com"
        onSuccess={async () => await navigate("users")}        
      />
      <UsersTable path="users/" />
      <UsersTable path="users/:userId" />
    </Router>
  );
}

export default App;
