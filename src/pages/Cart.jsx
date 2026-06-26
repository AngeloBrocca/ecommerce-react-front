import { useEffect, useState } from "react";
import api from "../api/api";

export default function Cart() {

  const [items, setItems] =
    useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const response = await api.get("/cart/");
      setItems(response.data.results);
    };

    loadCart();
  }, []);

  const total = items.reduce(
    (acc, item) =>
      acc + Number(item.subtotal),
    0
  );

  return (
    <>
      <h2>Carrinho</h2>
      <h2>
        Total:
        {total.toLocaleString(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL"
          }
        )}
      </h2>

      {items.map(item => (

        <div key={item.id}>

          <h3>
            {item.product_name}
          </h3>

          <p>
            Quantidade:
            {item.quantity}
          </p>

          <p>
            Total:
            R$ {item.subtotal}
          </p>

        </div>

      ))}
    </>
  );
}