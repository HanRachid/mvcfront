import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../App.css";
import Book from "../Components/ProductAdd/Book";
import DVD from "../Components/ProductAdd//DVD";
import Furniture from "../Components/ProductAdd/Furniture";
export default function ProductAdd() {
  const [type, setType] = useState("DVD");
  let [product, setProduct] = useState<any>({
    name: "",
    type: type,
    sku: 0,
    price: 0,
    size: 0,
    weight: 0,
    height: 0,
    width: 0,
    length: 0,
  });
  let MyComponents: { [key: string]: (props: any) => JSX.Element } = {
    DVD: DVD,
    Book: Book,
    Furniture: Furniture,
  };
  function makeid(length: Number) {
    let result = "";
    let characters = "0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  let Component = MyComponents[type];

  function handleChange(e: any) {
    console.log(e.target.value);
    setType(e.target.value);
    setProduct({
      name: "",
      type: e.target.value,

      sku: 0,
      price: 0,
      size: 0,
      weight: 0,
      height: 0,
      width: 0,
      length: 0,
    });
    const inp = document.querySelectorAll("input");
    inp.forEach((input) => {
      input.value = "";
    });
  }
  function handleWrite(e: any) {
    if (isNaN(e.target.value) && e.target.className === "name") {
      setProduct({ ...product, [e.target.className]: e.target.value });
    } else if (!isNaN(e.target.value)) {
      setProduct({ ...product, [e.target.className]: e.target.value });
    } else {
      e.target.value = product[e.target.className];
    }
  }
  let navigate = useNavigate();
  function valid() {
    if (product.name.length === 0 || product.sku === 0) {
      return false;
    } else if (product.type === "DVD" && product.size === 0) {
      return false;
    } else if (
      product.type === "Furniture" &&
      product.length === 0 &&
      product.height === 0 &&
      product.width === 0
    ) {
      return false;
    } else if (product.type === "Book" && product.weight === 0) {
      return false;
    }
    return true;
  }
  async function submit() {
    if (valid()) {
      const submitproducts = await fetch(
        "https://scandiwebassignement.000webhostapp.com/public/index.php/reactadd",
        {
          method: "post",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...product,
            sku: product.sku + makeid(5),
          }),
        }
      );

      const response = await submitproducts.json();
      console.log(response);
    }
  }
  return (
    <div style={{ fontFamily: "Analiza" }}>
      <div
        className="banner"
        style={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "1.7rem",
            fontFamily: "Analiza",
            fontWeight: "bolder",
          }}
        >
          Product Add
        </span>
        <div>
          <button
            onClick={() => {
              submit();
              if (valid()) {
                navigate("/");
              } else {
                window.alert("Please, submit required data");
              }
            }}
            style={{
              marginRight: "1rem",
              padding: "0.4rem",
              fontSize: "0.9rem",
              border: "none",
              boxShadow: "0 0 3px #242424",
              fontFamily: "Analiza",
              fontWeight: "600",

              color: "#242424",
              borderRadius: "0.3rem",
            }}
          >
            Save
          </button>

          <Link to={"/"}>
            <button
              className="cancel"
              style={{
                fontSize: "0.9rem",
                padding: "0.35rem",
                border: "none",
                boxShadow: "0 0 3px #242424",
                fontFamily: "Analiza",
                fontWeight: "600",
                color: "white",
                borderRadius: "0.3rem",
              }}
            >
              Cancel
            </button>{" "}
          </Link>
        </div>
      </div>
      <hr />
      <div
        style={{
          fontSize: "2rem",
          height: "36rem",
          margin: "8rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            minHeight: "16rem",
            margin: "3rem",
            width: "26rem",
          }}
        >
          <form
            id="product_form"
            action=""
            style={{
              color: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              htmlFor=""
            >
              <div>SKU</div>
              <div>
                <input
                  onChange={handleWrite}
                  type="sku"
                  className="sku"
                  id="sku"
                />
              </div>
            </label>

            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              htmlFor=""
            >
              <div> Name</div>
              <div>
                <input
                  id="name"
                  onChange={handleWrite}
                  type="text"
                  className="name"
                />
              </div>
            </label>
            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              htmlFor=""
            >
              <div>Price</div>
              <div>
                <input
                  id="price"
                  onChange={handleWrite}
                  type="text"
                  className="price"
                />
              </div>
            </label>
            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              htmlFor="productType"
            >
              <div>Type Switcher</div>
              <div>
                <select
                  onChange={handleChange}
                  name="productTypes"
                  id="productType"
                  style={{
                    height: "2rem",
                    border: "none",
                    borderRadius: "0.2rem",
                  }}
                >
                  <option value="DVD">DVD</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Book">Book</option>
                </select>
              </div>
            </label>

            <Component handleWrite={handleWrite}></Component>
          </form>
        </div>
      </div>
    </div>
  );
}
