import React, { Component } from "react";
import styled from "styled-components";
import TestUserList from "./TestUserList";

const roleContainer = styled.div``;

class Users extends Component {
  render() {
    const { roles } = this.props;
    const { session } = this.props;

    return roles.map((role, i) => (
      <roleContainer className={`messages__item ${role.chatClass}`} key={i}>
        <TestUserList
          session={session}
          // nowUser={this.state.nowUser}
        />
      </roleContainer>
    ));
  }
}

export default Users;
