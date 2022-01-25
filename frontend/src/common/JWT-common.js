// jwt 토큰을 local storage에서 저장하고 꺼내고 삭제하는 함수들을 각각 만들어 관리
// saveToken : local storage 에 토큰저장
// getToken : local storage 에서 토큰정보 얻기
// deleteToken : local storage 에서 토큰 삭제

export const saveToken = (token) => {
  window.localStorage.setItem('token', token);
};
export const getToken = () => {
  return window.localStorage.getItem('token');
};
export const deleteToken = () => {
  window.localStorage.removeItem('token');
};