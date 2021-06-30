import './App.css';
import React from 'react';
import InvoicePage from './components/InvoicePage';
import Invoices from './components/Invoices';
import Home from './components/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <div className="invoice__headings">
        <BrowserRouter>
          <Header />
          <Route path="/frontend-assignment" component={Home} />
          <Route path="/generate" component={InvoicePage} />
          <Route path="/invoices" component={Invoices} />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
