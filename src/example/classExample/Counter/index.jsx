import React, {Component} from 'react';



class Counter extends Component {


    constructor(props) {
        super(props);
        console.log("constructor")
    }

    state = {
        n: 0,
        count: 0,
        count2: 0
    }


    componentDidMount() {
        console.log("componentDidMount")
    }

    componentWillUnmount() {
        console.log("componentWillUnmount")
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate")

        if (this.props.main_nn !== this.state.n){
            this.setState({
                n : this.props.main_nn
            })
        }
    }


    render() {
        const {count, count2, n} = this.state
        const v = this.props.visible
        console.log("render")


        return (
            v ?
                    <div>
                        <h3>Main nn is {n}</h3>
                        <h3>Count is {count}</h3>
                        <h3>Count2 is {count2}</h3>
                        <button onClick={() => {this.setState({
                            n: n + 1
                        })}}>plus main n</button>
                        <button onClick={() => {this.setState({
                            count: count + 1
                        })}}>plus count 1</button>
                        <button onClick={() => {this.setState({
                            count2: count2 + 1
                        })}}>plus count 2</button>
                    </div>
                : null
        );
    }
}


export default Counter;