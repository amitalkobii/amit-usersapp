
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import Table from './table/Table';
import UserDetails from './userdetails/UserDetails'

const Navigation = ({columns, data}) => {
  const renderPage = () => {
    return <UserDetails/>;
  };

  return (
   <Router>
      <Switch>
      <Route exact path="/" render={() => <Table columns={columns} data={data} />}/> 
        <Route path="/user/:UserDetails" render={() => renderPage()}/> 
      </Switch>
    </Router> 
  );
};

export default Navigation;