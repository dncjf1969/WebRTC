/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import styled from 'styled-components';



const StreamComponent = styled.div`
  display: flex;
  flex-direction: row;
`;

const Nickname = styled.div`
  text-align: center;
  position: absolute;
  width: auto;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
`;

export default class User extends Component {
  // getNicknameTag() {
  //   // Gets the nickName of the user
  //   return JSON.parse(this.props.streamManager.stream.connection.data)
  //     .clientData;
  // }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <StreamComponent className="streamcomponent">
            {/* <Nickname>{this.getNicknameTag()}</Nickname> */}
            <p>{this.props.streamManager}</p>
          </StreamComponent>
        ) : null}
      </div>
    );
  }
}
