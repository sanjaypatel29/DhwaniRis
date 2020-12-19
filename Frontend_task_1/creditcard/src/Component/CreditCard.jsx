import React from "react"
import Input from "./Input"
import { v4 as uuid } from "uuid"
import PinDisplay from './PinDisplay';

class CreditCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            data: []
        }
    }

    onChange = (value) => {
        this.setState({
            value: value
        })
        console.log(value, typeof (value))
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { value, data } = this.state

        let newValue = {
            id: uuid(),
            value: value
        }
        this.setState({
            data: [...data, newValue]
        })
    }

    handleDelete = (id) => {
        const { data } = this.state;
        const newData = data.filter((item) => item.id !== id);
        this.setState({
            data: newData
        });
    }

    render() {
        const { data } = this.state

        return (
            <div className="App">
                <h2>Enter Credit Card Number Here and Press Enter Key</h2>
                <form onSubmit={this.handleSubmit}>
                    <Input onChange={this.onChange} length={4} /><br />
                    <button style={{ width: "10%", height: "25px" }} disabled={this.state.value.length !== 16} type="submit">Submit</button>
                </form>
                <div><PinDisplay data={data} handleDelete={this.handleDelete} /></div>
            </div>
        )
    }
}

export default CreditCard;