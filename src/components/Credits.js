// src/components/Credits.js

import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';

class Credits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountBalance: this.props.accountBalance,
            addCredit: {
                description: '',
                amount: '',
                date: '',
            },
        }
    }

    addCreditFunction = (e) => {
        e.preventDefault();
        this.props.handleAddCredit(this.state.addCredit);
    };

    handleChange = (e) => {
        const addCredit = { ...this.state.addCredit };
        addCredit[e.target.name] = e.target.value;
        if (e.target.name === "amount") {
            addCredit.amount = e.target.value;
        }
        this.setState({
            addCredit,
        })
    }

    render() {
        let display = (
            this.props.creditArr.map((credit) => {
                return (
                    <div className="CreditHistory">
                        <div>Description: {credit.description}</div>
                        <div>Amount: {credit.amount}</div>
                        <div>Date: {credit.date}</div>
                    </div>
                )
            })
        )
        return (
            <div className="DisplayPage">
                <Link to="/"> Home </Link>
                <h1>CREDIT</h1>
                <AccountBalance accountBalance={this.props.accountBalance} />
                <h5>Credit totals: {this.props.creditAmount} </h5>
                <div>
                    <h3>ADD CREDIT</h3>
                    <label>Enter Description:</label>
                    <input type="text" name="description" onChange={this.handleChange} />
                    <br></br><label>Enter Amount: </label>
                    <input type="number" name="amount" onChange={this.handleChange} />
                    <br></br><label>Enter Date:</label>
                    <input type="text" name="date" onChange={this.handleChange} />
                    <br></br><button onClick={this.addCreditFunction}>Add Credit</button>
                </div>

                <div className="credit">
                    <h3>CREDIT HISTORY</h3>
                    {display}
                </div>
            </div>
        )
    }
}

export default Credits;