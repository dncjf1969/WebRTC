import React, {Component} from 'react';
import Navbar from '../../common/navbar/navbar'
import styled from 'styled-components';
import Kind from './Kind';
import normal from '../../assets/normal.png'
import pt from '../../assets/pt.png'
import debate from '../../assets/debate.png'
import { Link } from 'react-router-dom'
import './style.css'
<<<<<<< HEAD
import Header from '../../common/Header'; 
import HeroHome from '../../common/HeroHome'; 
import Footer from '../../common/Footer'; 
import FeaturesBlocks from '../../common/FeaturesBlocks'; 
// import FeaturesHome from '../../common/FeaturesHome'; 
import Testimonials from '../../common/Testimonials'; 
import Newsletter from '../../common/Newsletter'; 
=======
import { Card } from 'antd';

const { Meta } = Card;
>>>>>>> 6bb442624f89852349c802d672bd2c42ec83b8df

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
  render(
    
  ) {
    return (
<<<<<<< HEAD
     <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HeroHome />
        {/* <FeaturesHome /> */}
        <FeaturesBlocks />
        <Testimonials />
        <Newsletter />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
=======
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

>>>>>>> 6bb442624f89852349c802d672bd2c42ec83b8df
    );
  }
}


export default Home;

// mapStateToProps 는 컴포넌트에 props로 넣어줄 리덕스 스토어 상태에 관련된 함수
//리덕스 스토어의 상태를 조회해서 어떤 것들을 props 로 넣어줄지 정의
// 현재 리덕스 상태를 파라미터로 받아옴
// mapDispatchToProps 는 컴포넌트에 props로 넣어줄 액션을 디스패치하는 함수들에 관련된 함수
// 액션을 디스패치하는 함수를 만들어서 props로 넣어줌
// dispatch 를 파라미터로 받아옴
// export default Home;