import './App.css';
import React from 'react';
import InvoicePage from './components/InvoicePage';
import Invoices from './components/Invoices';
import Home from './components/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <div className="invoice__headings">
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Route path="/invoice-generator" component={Home} />
            <PrivateRoute path="/invoices" component={Invoices} />
            <PrivateRoute path="/generate" component={InvoicePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
