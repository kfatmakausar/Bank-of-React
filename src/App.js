// src/App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import AccountBalance from './components/AccountBalance';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      },
      //Debit info
      debitArr: [],
      debitAmount: 0,
      //Credit info
      creditArr: [],
      creditAmount: 0,
    }
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser }
    newUser.userName = logInInfo.userName
    this.setState({ currentUser: newUser })
  }

  //When mounted, credit and debit information is loaded to the state accountBalance
  componentDidMount() {
    axios.get("https://moj-api.herokuapp.com/debits")
      .then((response) => {
        const data = response.data;
        let newDebitAmount = 0;
        let newDebitAccountBalance = 0;
        //Add the amount on JSON to the debit total and subtract that amount from account balance
        //for...of statement creates loop to iterate once through JSON info
        for (let key of data) {
          newDebitAmount += key.amount;
          newDebitAccountBalance -= key.amount;
        }
        this.setState({
          debitAmount: newDebitAmount,
          accountBalance: newDebitAccountBalance,
          debitArr: data
        });
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get("https://moj-api.herokuapp.com/credits")
      .then((response) => {
        const data = response.data;
        let newCreditAmount = 0;
        let newCreditAccountBalance = this.state.accountBalance;
        //Add the amount on JSON to the credit total and  account balance
        //for...of statement creates loop to iterate once through JSON info
        for (let key of data) {
          newCreditAmount += key.amount;
          newCreditAccountBalance += key.amount;
        }
        this.setState({
          creditAmount: newCreditAmount,
          accountBalance: newCreditAccountBalance,
          creditArr: data
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //When user entering a new debit amount, description, date
  handleAddDebit = (debit) => {
    debit.description = '';
    debit.date = '';
    const newDebitArr = [debit, ...this.state.debitArr];
    let newAccountBalance = (this.state.accountBalance) - debit.amount;
    let newDebitAmount = (this.state.debitAmount) + debit.amount;
    this.setState({
      debitAmount: newDebitAmount,
      accountBalance: newAccountBalance,
      debitArr: newDebitArr
    });
  }

  //When user entering a new debit amount, description, date
  handleAddCredit = (credit) => {
    credit.description = '';
    credit.date = '';
    const newCreditArr = [credit, ...this.state.creditArr];
    let newAccountBalance = (this.state.accountBalance) - credit.amount;
    let newCreditAmount = (this.state.creditAmount) + credit.amount;
    this.setState({
      creditAmount: newCreditAmount,
      accountBalance: newAccountBalance,
      creditArr: newCreditArr
    });
  }

  render() {

    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} accountBalance={this.state.accountBalance} />
    );
    const LogInComponent = () => (
      <Login user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props} />
    );
    const DebitsComponent = () => (
      <Debits accountBalance={this.state.accountBalance} debitAmount={this.state.debitAmount} debitArr={this.state.debitArr} handleAddDebit={this.state.handleAddDebit} />
    );
    const CreditsComponent = () => (
      <Credits accountBalance={this.state.accountBalance} crediAmount={this.state.creditAmount} creditArr={this.state.creditArr} handleAddCredit={this.state.handleAddCredit} />
    );

    return (
      <div className="Bank">
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent} />
            <Route exact path="/userProfile" render={UserProfileComponent} />
            <Route exact path="/login" render={LogInComponent} />
            <Route exact path="/debit" render={DebitsComponent} />
            <Route exact path="/credit" render={CreditsComponent} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
