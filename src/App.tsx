import {StompViewer} from './StompViewer'
import './App.css'
import React from "react";

const App : React.FC = () => {
    console.log("ENV:", import.meta.env);
    console.log("URL =", import.meta.env.VITE_STOMP_URL);
    console.log("USER =", import.meta.env.VITE_STOMP_USER);
    console.log("PASS =", import.meta.env.VITE_STOMP_PASS);
    console.log("TOPIC =", import.meta.env.VITE_STOMP_TOPIC);
  return (
    <div className="app">

      <StompViewer />
    </div>
  )
}

export default App
