import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import './App.css'
import app from "./firebase/firebase.config";
import { useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState(null)
  // console.log(userInfo)


  const auth = getAuth(app);
  const provider1 = new GoogleAuthProvider();
  const provider2 = new GithubAuthProvider()
  // create sign-in user 
  const handleGoogleSign = () => {
    signInWithPopup(auth, provider1)
      .then(result => {
        console.log(result.user)
        setUserInfo(result.user)
      })
      .catch(error => {
        console.error(error.message)
      })
  }

  const handleGitHubSign = () => {
    signInWithPopup(auth, provider2)
    .then((result) => {
      console.log(result.user)
      setUserInfo(result.user)
    })
    .catch((error) => console.error(error))
  }

  // create sign user sign-out 
  const handleSignOut = () => {
    signOut(auth)
      .then(result => {
        console.log(result)
        setUserInfo(null)
      })
      .catch(error => { console.log(error) })
  }

  return (
    <>
      <h1>Simple-Firebase-practice-1</h1>
      {
        userInfo ? <button onClick={handleSignOut}>Sign Out</button> : <>
          <button onClick={handleGoogleSign}>Google</button>
          <button onClick={handleGitHubSign}>GitHub</button>
        </>
      }
      {
        userInfo && <>
          <h1>{userInfo.displayName}</h1>
        </>
      }
    </>
  )
}

export default App
