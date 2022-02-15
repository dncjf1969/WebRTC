import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../common/http-common';
import Header from '../partials/Header';

function ResetPassword() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios.get(`/members/findPW?memberEmail=${email}&memberId=${id}`)
    .then((res) => {
      alert("입력하신 이메일로 임시 비밀번호를 보냈습니다.")
      navigate("/login")
    })
    .catch((e) => {
      console.log(e.response)
      switch (e.response.status) {
        case 501:
          alert("회원 정보를 찾지 못하였습니다.")
          break
        case 506:
          alert("이메일을 다시 확인해주세요.")
          break
        default:
          alert("알 수 없는 오류가 발생하였습니다.")
      }
    })
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h2 className="h2 mb-4">비밀번호를 잊어버리셨나요?</h2>
                <p className="text-xl text-gray-600">회원가입시 입력한 정보를 넣어주세요. </p>
                <p className="text-xl text-gray-600">WISH가 당신의 이메일로 임시 비밀번호를 보내드립니다.</p>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="id">찾으려는 아이디 <span className="text-red-600">*</span></label>
                      <input onChange={(e) => setId(e.target.value)} id="id" type="text" className="form-input w-full text-gray-800" placeholder="회원가입시 입력한 아이디" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">이메일 <span className="text-red-600">*</span></label>
                      <input onChange={(e) => setEmail(e.target.value)} id="email" type="email" className="form-input w-full text-gray-800" placeholder="회원가입시 입력한 이메일" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">임시 비밀번호 발급</button>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

export default ResetPassword;