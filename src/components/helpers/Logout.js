import history from '../services/history';


 const logout = ()=>{
  
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
console.log("logged out successfully");
history.push('/login');
window.location.reload();
 
};


export default logout;