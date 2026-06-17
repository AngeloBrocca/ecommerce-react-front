import { useState } from "react";

import api from "../api/api";

import {
  Container,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  async function handleLogin() {

    try {

      const response = await api.post(
        "/token/",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.access
      );

      navigate("/products");

    } catch {

      alert("Login inválido");
    }
  }

  return (
    <Container maxWidth="sm">

      <Typography
        variant="h4"
        mt={5}
        mb={3}
      >
        Login
      </Typography>

      <TextField
        fullWidth
        label="Usuário"
        margin="normal"
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <TextField
        fullWidth
        type="password"
        label="Senha"
        margin="normal"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <Button
        variant="contained"
        onClick={handleLogin}
      >
        Entrar
      </Button>

    </Container>
  );
}