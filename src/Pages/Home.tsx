import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Book from "../Components/Home/Book";
import DVD from "../Components/Home/DVD";
import Furniture from "../Components/Home/Furniture";
export default function Home() {
  const [products, setProducts] = useState<any>([]);
  const [deleted, setDeleted] = useState(false);
  async function fetchDB() {
    const response = await fetch("http://127.0.0.1:8000/react", {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }
  let navigate = useNavigate();

  async function massDelete() {
    const allproducts = document.querySelectorAll(".Product");
    const arr: any = [];
    allproducts.forEach((product: any) => {
      if (product.children[0].children[0].checked) {
        arr.push(product.children[1].children[0].innerHTML);
      }
    });
    if (arr.length > 0) {
      const remove = await fetch("http://127.0.0.1:8000/reactremove", {
        method: "post",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arr),
      });
      setDeleted(true);
    }
  }
  useEffect(() => {
    setDeleted(false);
    fetchDB();
  }, []);
  useEffect(() => {
    if (deleted) {
      navigate("/delete");
    }
  });
  let MyComponents: { [key: string]: (props: any) => JSX.Element } = {
    DVD: DVD,
    Book: Book,
    Furniture: Furniture,
  };

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
          Product List
        </span>
        <div>
          <Link to={"/addproduct"}>
            <button
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
              ADD
            </button>
          </Link>{" "}
          <button
            onClick={massDelete}
            className="massdelete"
            id=""
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
            MASS DELETE
          </button>
        </div>
      </div>
      <hr />
      <div
        style={{
          margin: "5rem",
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        }}
      >
        {products.map((product: any) => {
          console.log(product.type);

          let Component = MyComponents[product.type];

          return <Component product={product}></Component>;
        })}
      </div>
    </div>
  );
}
