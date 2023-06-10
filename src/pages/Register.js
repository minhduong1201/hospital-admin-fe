import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../redux/apiCalls";

const Register = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, {username,name, password, role, phone, email}, "employee");
    // alert("đăng nhập thành công!")
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
        placeholder="Nhập tên"
        onChange={(e) => setName(e.target.value)}
      />
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
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="Số điện thoại"
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="Chuyên môn"
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20, marginLeft: 90 }}
        type="file"
        placeholder="Ảnh"
        // onChange={(e) => setPassword(e.target.value)
        // }
      />
      <button onClick={handleClick} style={{ padding: 10, width:100 }}>
        Register
      </button>
      <Link to="/login">Return to Login</Link>
    </div>
  );
};

export default Register;
