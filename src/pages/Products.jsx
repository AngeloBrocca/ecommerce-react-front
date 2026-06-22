import { useEffect, useState } from "react";

import api from "../api/api";

import Navbar from "../components/Navbar";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-created_at");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  async function loadProducts() {
    const response = await api.get(
      `/products/?search=${search}&ordering=${ordering}&page=${page}`
    );

    setProducts(
      response.data.results
    );

    setCount(
      response.data.count
    );
  }

  function handleSearch() {
    setPage(1);
    loadProducts();
  }

  useEffect(() => {
    async function fetchProducts() {
      const response = await api.get(
        `/products/?search=${search}&ordering=${ordering}&page=${page}`
      );

      setProducts(response.data.results);
      setCount(response.data.count);
    }

    fetchProducts();
  }, [page, ordering]);

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

        <TextField
          fullWidth
          label="Buscar produto"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Ordenar por"
          value={ordering}
          onChange={(e) =>
            setOrdering(e.target.value)
          }
          sx={{ mb: 2 }}
        >

          <MenuItem value="-created_at">
            Mais Recentes
          </MenuItem>

          <MenuItem value="name">
            Nome A-Z
          </MenuItem>

          <MenuItem value="price">
            Menor Preço
          </MenuItem>

          <MenuItem value="-price">
            Maior Preço
          </MenuItem>

        </TextField>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSearch}
          >
            Buscar
          </Button>

          <Button
            variant="contained"
            onClick={() =>
              navigate("/products/new")
            }
          >
            Novo Produto
          </Button>
        </Box>

        {products.map(product => (

          <Card
            key={product.id}
            sx={{ mt: 2 }}
          >
            <CardContent>

              <Typography variant="h6">
                {product.name}
              </Typography>

              <Typography color="text.secondary">
                Categoria: {product.category_details?.name}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                Estoque: {product.stock}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                R$ {Number(product.price).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL"
                  }
                )}
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

        <div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 10
          }}
        >

          <Button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
          >
            Anterior
          </Button>

          <Typography>
            Página {page}
          </Typography>

          <Button
            disabled={
              page >=
              Math.ceil(count / 5)
            }
            onClick={() =>
              setPage(page + 1)
            }
          >
            Próxima
          </Button>

        </div>

      </Container>
    </>
  );
}