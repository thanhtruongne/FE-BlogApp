import Cookies from 'js-cookie';

const setTokens = (accessToken, refreshToken) => {
    Cookies.set("accessToken", accessToken, { 
      // secure: true,       
      httpOnly: false,    
      sameSite: "Strict", 
      // expires: 1          
    });
  
    Cookies.set("refreshToken", refreshToken, { 
      // secure: true,
      httpOnly: false,
      sameSite: "Strict",
      // expires: 7 
    });
  };

const getAccessToken = () => Cookies.get("accessToken");
const getRefreshToken = () => Cookies.get("refreshToken");
const getClientID = () => Cookies.get("x-client-id");



const clearTokens = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
};

const clearClientID= () => {
  Cookies.remove("x-client-id");
};

const setClientID = (clientID) => {
  return Cookies.set('x-client-id',clientID,{
    // secure: true,       
    httpOnly: false,    
    sameSite: "Strict",  
  })
}

export { clearClientID, clearTokens, getAccessToken, getClientID, getRefreshToken, setClientID, setTokens };

