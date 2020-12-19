import React from "react"

export default class PinDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { data, handleDelete } = this.props
        return (
            <>
                {data && data.map(item =>
                    <ol style={{ listStyleType: "none" }} key={item.id}>
                        <li> <span style={{ fontSize: "30px" }}>{item.value}</span>
                            <button style={{ padding: "8px", marginLeft: "10%", width: "150px", backgroundColor: "red", color: "white", border: "none", outline: "none" }} onClick={() => handleDelete(item.id)}>Delete</button></li>
                    </ol>
                )}
            </>
        )
    }
}