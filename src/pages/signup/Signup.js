import { useState } from 'react'
import styles from './Signup.module.css'
import { useSignup } from '../../hooks/useSignup'

export default function Signup(){

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const {error, isPending, signup} = useSignup()

  const handleData = (event) => {
    if(event.target.type === "email"){
      setEmail(event.target.value)
    }
    else if(event.target.type === "password"){
      setPassword(event.target.value)
    }
    else if(event.target.type === "text"){
      setDisplayName(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, displayName)
  }
  
  return (
    <form className={styles.signup_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>회원가입</legend>
        <label htmlFor='myEmail' >email :</label>
        <input type="email" id="myEmail" required value={email} onChange=
        {handleData}/>

        <label htmlFor='myPassword' >password :</label>
        <input type="password" id="myPassword" required value={password}
        onChange={handleData}/>

        <label htmlFor='myNickname' >닉네임 :</label>
        <input type="text" id="myNickname" required value={displayName} onChange=
        {handleData}/>
        <button type='submit' className={styles.btn}>회원가입</button>
      </fieldset>
    </form>
  )
}