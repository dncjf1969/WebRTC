import React, {Component} from 'react';
import Navbar from '../../common/navbar/navbar'
import styled from 'styled-components';
import { connect } from 'react-redux';
import Kind from './Kind';
import normal from '../../assets/normal.png'
import pt from '../../assets/pt.png'
import debate from '../../assets/debate.png'
import { Link } from 'react-router-dom'
import './style.css'

const Wrapper = styled.div`
  height: 100vh;
  background-color: rgba(246, 245, 253, 1);
  padding: 100px 0px 0px 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


const StartWrapper = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const interviewKinds = [
  {
    source: normal,
    title: '기본/직무면접',
    link:'/',
  },
  {
    source: pt,
    title: 'PT면접',
    link:'/signup',
  },
  {
    source: debate,
    title: '토론면접',
    link:'/login',
  },
]
// link는 openvidu와 연결된것으로 보임
class Home extends Component {
  // class형 컴포넌트의 state초기화 방식
  constructor(props) {
    super(props);

    this.state = {};
  }
// Link to="/signup"
// 그러나 map으로 다 풀어서 각각에 맞는ㄴ link를 연결 시
  // pathname이라는 변수에 넣어줘야함
  render() {
    return (
      <Wrapper>
        <StartWrapper>
          {interviewKinds.map((kindList) => {
            return (
              <Link key={kindList.title} to={{
                pathname: `${kindList.link}`,
              }} id='nonline'>
                <Kind imgSrc={kindList.source} title={kindList.title}/>
              </Link>
            );
          })}
        </StartWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  // homeSlice
  home: state.home,
});

// slice에 있는 actions(방찾기, 빠른 시작등등)을 사용하고 싶을 때
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // 빠른시작
//     // quickStart는 import { quickStart } from './homeSlice'; 구문을 이용해서 action 가져온 것
//     // doQuickStart: (type) => dispatch(quickStart(type)),
//   };
// };
export default connect(mapStateToProps,)(Home);

// function Home() {
//   return (
//     <div>
//       <Navbar />
//     </div>
//   );
// }
// mapStateToProps 는 컴포넌트에 props로 넣어줄 리덕스 스토어 상태에 관련된 함수
//리덕스 스토어의 상태를 조회해서 어떤 것들을 props 로 넣어줄지 정의
// 현재 리덕스 상태를 파라미터로 받아옴
// mapDispatchToProps 는 컴포넌트에 props로 넣어줄 액션을 디스패치하는 함수들에 관련된 함수
// 액션을 디스패치하는 함수를 만들어서 props로 넣어줌
// dispatch 를 파라미터로 받아옴
// export default Home;