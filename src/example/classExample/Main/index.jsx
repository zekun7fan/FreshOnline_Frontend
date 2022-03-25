import React, {Component} from 'react';
import Counter from "../Counter";

class Main extends Component {

    state = {
        vv: false,
        n: 0
    }


    render() {
        return (
            <div>
                <h1>Main n is {this.state.n}</h1>
                <button onClick={() => {this.setState({vv: true})}}>show counter</button>
                <button onClick={() => {this.setState({vv: false})}}>hide counter</button>
                <button onClick={() => {this.setState({n: this.state.n+1})}}>plus main n</button>
                <button onClick={() => {this.setState({n: this.state.n-1})}}>minus main n</button>
                <Counter visible={this.state.vv} main_nn={this.state.n}/>
            </div>
        );
    }
}

export default Main;