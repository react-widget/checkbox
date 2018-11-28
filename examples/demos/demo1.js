import React, { Component } from 'react';
import Checkbox from '../../src';



export default class DEMO extends Component {

    state = {
        value: 2
    }


    handleChange = (value) => {
        this.setState({
            value
        })

        console.log('changed ', value)
    }

    handleChange2 = (value) => {
        console.log('changed ', value)
    }

    filterMsg = ''

    render() {

        return (
            <div>

            </div >
        );
    }

}
