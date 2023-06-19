import React, { useState } from "react";
import { TextField, Button, Typography, Container, Link } from "@mui/material";
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { Link as RouterLink} from "react-router-dom";

const loginContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "100px",
  minHeight: '100vh'
};

const inputStyle = {
  marginBottom: "20px",
};

const buttonStyle = {
  marginTop: "20px",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập tại đây
    login(dispatch, { username, password }, "employee");
  };

  return (
      <Container maxWidth="xs" style={loginContainerStyle}>
        <Typography variant="h4" align="center" gutterBottom>
          Đăng nhập
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tên tài khoản"
            variant="outlined"
            style={inputStyle}
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Mật khẩu"
            variant="outlined"
            style={inputStyle}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button
            variant="contained"
            color="primary"
            style={buttonStyle}
            type="submit"
            fullWidth
          >
            Đăng nhập
          </Button>
          <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
          Bạn chưa có tài khoản?{' '}
          <Link component={RouterLink} to="/register">
            Đăng ký
          </Link>
        </Typography>
        </form>
      </Container>
  );
};

export default Login;
