import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../../store';

//connect의 첫번째 인자
function mapStateToProps(state) {
  // console.log(states)
  return { token: state }
}

//connect의 두번째 인자
function mapDispatchToProps(dispatch, ownProps) {
  return {
    saveToken: (token) => dispatch(actionCreators.saveToken(token)) // 만들어서 컴포넌트에서사용
  }
}

function Test() {
  // saveToken('~~')
  // const token = window.localStorage.getItem('ovToken');
  return (
    <div>
      <h1>hi</h1>
      
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);