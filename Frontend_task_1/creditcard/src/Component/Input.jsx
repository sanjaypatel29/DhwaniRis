import React from "react"
import "./Input.module.css"

export default class Input extends React.Component {
    constructor(props) {
        super(props)
        this.values = new Array(this.props.length).fill("")
        this.element = []
    }

    handleChange = (e, i) => {
        this.values[i] = e.target.value
        this.props.onChange(this.values.join(""))
        //for forword changes
        if (this.element[i].value.length === 4 && this.element[i + 1]) {
            this.element[i + 1].focus()
        }

        // for backword change or delete
        if (this.element[i].value.length === 0 && this.element[i - 1]) {
            this.element[i - 1].focus()
        }
    }

    // for first time automatic focus on first input box
    componentDidMount() {
        this.element[0].focus()
    }

    // for paste data functionality
    handlePaste = (e, i) => {
        var val = e.clipboardData.getData('Text')
        var arr = [val.slice(0, 4), val.slice(4, 8), val.slice(8, 12), val.slice(12, 16)]
        console.log(typeof (val))
        if (val.length > 16 || val.length < 16) {
            alert(`You pasted ${val.length} digit numbers ${val},
Please Paste exact 16 digit number`)
            window.location.reload()
        } else if (val.length === 16) {
            arr.forEach((item, i) => {
                console.log(item, i)
                this.element[i].value = arr[i];
                this.values[i] = arr[i];
            });
        }
        this.props.onChange(this.values.join(""));
    }

    render() {
        return (
            <>
                {this.values.map((item, i) =>
                    <input key={i}
                        onChange={(e) => this.handleChange(e, i)}
                        ref={(element) => this.element[i] = element}
                        maxLength="4"
                        pattern="[0-9]{4}"
                        title="Enter only numeric digit"
                        onPaste={this.handlePaste}
                    />)}
            </>
        )
    }
}