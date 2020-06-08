// src/components/Debits.js
import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';

class Debits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountBalance: this.props.accountBalance,
            addDebit: {
                description: '',
                amount: '',
                date: '',
            },
        }
    }

    addDebitFunction = (e) => {
        e.preventDefault();
        this.props.handleAddDebit(this.state.addDebit);
    };

    handleChange = (e) => {
        const addDebit = { ...this.state.addDebit };
        addDebit[e.target.name] = e.target.value;
        this.setState({
            addDebit,
        })
    }

    render() {
        let display = (
            this.props.debitArr.map((debit) => {
                return (
                    <div className="DebitHistory">
                        <div>Description: {debit.description}</div>
                        <div>Amount: {debit.amount}</div>
                        <div>Date: {debit.date}</div>
                    </div>
                )
            })
        )
        return (
            <div className="DisplayPage">
                <Link to= "/"> Home </Link>
                <h1>DEBIT</h1>
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <h5>Debit totals: {this.props.debitAmount} </h5>
                <div>
                    <h3>ADD DEBIT</h3>
                    <label>Enter Description: </label>
                    <input type="text" name="description" onChange={this.handleChange}/>
                    <br></br> <label>Enter Amount:    </label>
                    <input type="number" name="amount" onChange={this.handleChange}/>
                    <br></br><label>Enter Date: </label>
                    <input type="text" name="date" onChange={this.handleChange}/>
                    <br></br><button onClick={this.addDebitFunction}>Submit</button>
                </div>

                <div className="debit">
                    <h3>DEBIT HISTORY</h3>
                    {display}
                </div>
            </div>
        )
    }
}

export default Debits;