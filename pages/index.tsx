import React from 'react'
import { authApi } from '../api-client'
import useAuth from '../hooks/use-auth';
const Login: React.FC = () => {
  const {profile, login, logout} = useAuth({
    // thuộc tính revalidateOnMount này khi để = false thì khi mới vào (vào page lần đầu tiên) sẽ không call api (API ở đây VD là: profile)
    revalidateOnMount: false});
  const handleLogin = async () => {
    try {
      // const res = await authApi.login({ username: '', password: '' })
      await login();
      // sau đó redirect to dashboard
    } catch (error) {
      console.log('error: ', error)
    }
  }
  // const handleGetProfile = () => {}
  const handleLogout = async () => {
    try {
       // const res = await authApi.login({ username: '', password: '' })
       await logout();
       // sau đó redirect to login
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
      {/* <button onClick={handleGetProfile}>Get Profile</button> */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
export default Login