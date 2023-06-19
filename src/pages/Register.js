import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link  } from 'react-router-dom';
import { register } from '../redux/apiCalls';
import { Button, TextField, Typography, Container, Grid, Box, Input, InputLabel } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { username, name, password, role, age, phone, email }, 'employee');
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Đăng ký
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên đăng nhập"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mật khẩu"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Số điện thoại"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          <InputLabel htmlFor="age-input">Tuổi</InputLabel>
            <Input
            id="age-input"
            name="age"
            type="number"
            onChange={(e) => setAge(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Chuyên môn"
              variant="outlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ảnh"
              variant="outlined"
              type="file"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button onClick={handleClick} variant="contained" color="primary" sx={{ mt: 2, width: '100%' }}>
          Đăng ký
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Đã có tài khoản?{' '}
          <Link to="/login">
            Đăng nhập
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
