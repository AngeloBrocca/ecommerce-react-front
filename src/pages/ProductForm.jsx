import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/api";

import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";

export default function ProductForm() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  });

  async function loadCategories() {

    const response = await api.get("/categories/");

    setCategories(response.data);
  }

  async function loadProduct() {

    if (!id) return;

    const response = await api.get(
      `/products/${id}/`
    );

    setProduct(response.data);
  }

  useEffect(() => {
    async function fetchData() {
      await loadCategories();
      await loadProduct();
    }

    fetchData();
  }, [id]);

  async function save() {

    if (id) {

      await api.put(
        `/products/${id}/`,
        product
      );

    } else {

      await api.post(
        "/products/",
        product
      );
    }

    navigate("/products");
  }

  return (
    <Container maxWidth="sm">

      <Typography
        variant="h4"
        mt={4}
        mb={2}
      >
        {id ? "Editar Produto" : "Novo Produto"}
      </Typography>

      <TextField
        fullWidth
        label="Nome"
        margin="normal"
        value={product.name}
        onChange={(e) =>
          setProduct({
            ...product,
            name: e.target.value
          })
        }
      />

      <TextField
        fullWidth
        label="Descrição"
        margin="normal"
        value={product.description}
        onChange={(e) =>
          setProduct({
            ...product,
            description: e.target.value
          })
        }
      />

      <TextField
        fullWidth
        label="Preço"
        margin="normal"
        value={product.price}
        onChange={(e) =>
          setProduct({
            ...product,
            price: e.target.value
          })
        }
      />

      <TextField
        fullWidth
        label="Estoque"
        margin="normal"
        value={product.stock}
        onChange={(e) =>
          setProduct({
            ...product,
            stock: e.target.value
          })
        }
      />

      <TextField
        select
        fullWidth
        label="Categoria"
        margin="normal"
        value={product.category}
        onChange={(e) =>
          setProduct({
            ...product,
            category: e.target.value
          })
        }
      >
        {categories.map(category => (
          <MenuItem
            key={category.id}
            value={category.id}
          >
            {category.name}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        onClick={save}
        sx={{ mt: 2 }}
      >
        Salvar
      </Button>

    </Container>
  );
}