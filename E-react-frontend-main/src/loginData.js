export const readLoginData = () => {
  let loginData = sessionStorage.getItem('loginData');
  if(loginData === null) { loginData = localStorage.getItem('loginData'); }

  if(loginData === null){
    return {
      type: 'NotLoggedIn',
      id: -1,
      name: '',
      email: '',
      startInPage: ''
    };
  }else{
    const parsed = JSON.parse(loginData);
    return {
      type: parsed.type,
      id: parsed.id,
      name: parsed.name,
      email: parsed.email,
      startInPage: parsed.startInPage,
    }
  }
};

export const writeLoginData = (userInfo, persist) => {
  if(persist){
    localStorage.setItem('loginData', JSON.stringify(userInfo));
  } else {
    sessionStorage.setItem('loginData', JSON.stringify(userInfo));
  }
}

export const isTempLogin = () => {
  return sessionStorage.getItem('loginData') !== null;
}

export const clearLoginData = () => {
  localStorage.removeItem('loginData');
  sessionStorage.removeItem('loginData');
}
