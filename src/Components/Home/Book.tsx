import React, { useState } from "react";

export default function Book(props: any) {
  const [product, setProduct] = useState(props.product);
  return (
    <div
      className="Product"
      style={{
        boxShadow: "0 0 3px white",
        display: "flex",
        justifyContent: "center",
        color: "white",
        minHeight: "10rem",
      }}
    >
      <div style={{ position: "relative", left: "8rem" }} className="checkbox">
        <input
          type="checkbox"
          name="delete-checkbox"
          className="delete-checkbox"
        />
      </div>

      <div className="item-properties">
        <h3 className="SKU">{product.SKU}</h3>
        <div className="Name">{product.name}</div>
        <div className="Price">Price : {product.price} $</div>
        <div className="Weight">Weight : {product.weight} KG</div>
      </div>
    </div>
  );
}
