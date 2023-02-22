import { useState } from "react";
import { useDispatch } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//   const dispatch = useDispatch();

  const handleClick = (e: any) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    alert("đăng nhập thành công!")
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin:'0 auto'
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width:100 }}>
        Register
      </button>
    </div>
  );
};

export default Register;
