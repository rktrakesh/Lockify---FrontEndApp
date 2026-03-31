import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="pt-10 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Welcome to Lockify</h1>
    </div>
  );
}

export default App;
