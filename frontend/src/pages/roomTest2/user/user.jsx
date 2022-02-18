/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import styled from 'styled-components';



const StreamComponent = styled.div`
  display: flex;
  flex-direction: row;
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
