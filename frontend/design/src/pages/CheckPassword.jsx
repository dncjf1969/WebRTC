// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import { makeStyles } from '@material-ui/core';
// import styled from 'styled-components';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import { checkPassword } from '../common/authSlice';
// import logo from '../images/logo.png';
// import { deleteToken } from '../common/JWT-common';

// // style
// const Wrapper = styled.div`
//   height: 100vh;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const LogoWrapper = styled.div`
//   display: flex;
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;

// const Logo = styled.img`
//   cursor: pointer;
//   width: 400px;
//   height: 200px;
// `;

// const Title = styled.div`
//   font-size: 1rem;
//   display: flex;
//   justify-content: center;
//   margin-bottom: 25px;
// `;

// const PasswordContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
// `;

// const CommonTextValidator = styled(TextValidator)`
// `;

// const useStyles = makeStyles({
//   validatorForm: {
//     width: '40%',
//   },
// });

// function CheckPassword() {
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const classes = useStyles();
//   const navigate = useNavigate();




//   const doDeleteUser = () => {
//     handleClose();
//       axios.delete(`/members`)
//       .then(() => {
//         toast.success('😥 회원탈퇴가 완료 되었습니다');
//         deleteToken();
//         navigate.push('/login');
//       })
//       .catch((error) => console.log(error)
//       )};

//   // function
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//       password,
//     };
//     dispatch(checkPassword(data))
//       .unwrap()
//       .then((res) => {
//         const isValid = res.data.check;
//         if (isValid) {
//           navigate.push('/modifyuserinfo');
//         } else {
//           toast.error('😥 비밀번호를 다시 입력해주세요');
//         }
//       })
//       .catch((err) => {
//           toast.error('😥 비밀번호를 다시 입력해주세요');
//         } else if (err.status === 401) {
//           toast.error('😥 로그인을 다시 해주세요!');
//           deleteToken();
//           navigate.push('/login');
//         } else if (err.status === 404) {
//           toast.error('😥 로그인을 다시 해주세요');
//           deleteToken();
//           navigate.push('/login');
//         } else if (err.status === 500) {
//           navigate.push('/error');
//         }
//       });
//   };

//   return (
//     <Wrapper>
//       <LogoWrapper>
//         <Logo
//           src={logo}
//           onClick={() => {
//             navigate.push('/');
//           }}
//         />
//       </LogoWrapper>

//       <PasswordContainer>
//         <ValidatorForm
//           onSubmit={handleSubmit}
//           className={classes.validatorForm}
//         >
//           <Title>비밀번호 확인</Title>
//           <CommonTextValidator
//             label="비밀번호"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             name="password"
//             type="password"
//             validators={['required']}
//             errorMessages={['비밀번호 입력해주세요']}
//             variant="outlined"
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <button yellow="true" type="submit">
//             제출하기
//           </button>
//         </ValidatorForm>
//       </PasswordContainer>
//     </Wrapper>
//   );
// }

// export default CheckPassword;
