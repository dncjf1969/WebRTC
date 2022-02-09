import React, { Component } from 'react';

import imgA from './testImages/rion.PNG';

class Testcharacter extends Component {
    render() {
        const tempStyle={
            display:"inline-block",
            width:"300px",
            height:"300px",
        }

        return (
            <div style={tempStyle}>
        <img src={ imgA }/>
      </div>);
    }
   
}

export default Testcharacter;