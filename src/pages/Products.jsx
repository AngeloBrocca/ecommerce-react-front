import { useEffect, useState } from "react";

import api from "../api/api";

import Navbar from "../components/Navbar";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Products() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  async function loadProducts() {

    const response = await api.get(
      "/products/"
    );

    setProducts(response.data);
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await api.get(
        "/products/"
      );

      setProducts(response.data);
    };
    fetch();
  }, []);

  async function deleteProduct(id) {

    if (!window.confirm("Excluir?"))
      return;

    await api.delete(
      `/products/${id}/`
    );

    loadProducts();
  }

  return (
    <>
      <Navbar />

      <Container>

        <Typography
          variant="h4"
          mt={3}
          mb={3}
        >
          Produtos
        </Typography>

        <Button
          variant="contained"
          onClick={() =>
            navigate("/products/new")
          }
        >
          Novo Produto
        </Button>

        {products.map(product => (

          <Card
            key={product.id}
            sx={{ mt: 2 }}
          >
            <CardContent>

              <Typography variant="h6">
                {product.name}
              </Typography>

              <Typography>
                Categoria: {product.category}
              </Typography>

              <Typography>
                Estoque: {product.stock}
              </Typography>

              <Typography>
                R$ {product.price}
              </Typography>

              <Button
                sx={{ mr: 2 }}
                variant="outlined"
                onClick={() =>
                  navigate(
                    `/products/edit/${product.id}`
                  )
                }
              >
                Editar
              </Button>

              <Button
                color="error"
                variant="contained"
                onClick={() =>
                  deleteProduct(product.id)
                }
              >
                Excluir
              </Button>

            </CardContent>
          </Card>

        ))}

      </Container>
    </>
  );
}