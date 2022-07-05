import { useState, useEffect } from "react";
import axios from "axios";
import BackContext from "./BackContext";
import CatsCrud from "./Cats/Crud";
import Nav from "./Nav";
import ProductsCrud from "./Products/Crud";
import { v4 as uuidv4 } from "uuid";

function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [messages, setMessages] = useState([]);
  //Categories
  const [createCat, setCreateCat] = useState(null);
  const [cats, setCats] = useState(null);
  const [deleteteCat, setDeleteCat] = useState(null);
  const [editCat, setEditCat] = useState(null);
  const [modalCat, setModalCat] = useState(null);

  //Products
  const [products, setProducts] = useState(null);
  const [createProduct, setCreateProduct] = useState(null)
  const [deleteteProduct, setDeleteteProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);

  //Read
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/cats")
      .then((res) => setCats(res.data));
  }, [lastUpdate]);

  // Create
  useEffect(() => {
    if (null === createCat) return;
    axios
      .post("http://localhost:3003/admin/cats/", createCat)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      });
  }, [createCat]);

  // Delete
  useEffect(() => {
    if (null === deleteteCat) return;
    axios
      .delete("http://localhost:3003/admin/cats/" + deleteteCat.id)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      });
  }, [deleteteCat]);

  //Edit
  useEffect(() => {
    if (null === editCat) return;
    axios
      .put("http://localhost:3003/admin/cats/" + editCat.id, editCat)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      });
  }, [editCat]);
//Products
    // Create
    useEffect(() => {
      if (null === createProduct) return;
      axios
        .post("http://localhost:3003/admin/products/", createProduct)
        .then((res) => {
          showMessage(res.data.msg);
          setLastUpdate(Date.now());
        })
        .catch((error) => {
          showMessage({ text: error.message, type: "danger" });
        });
    }, [createProduct]);

    //Read
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/products")
      .then((res) => setProducts(res.data));
  }, [lastUpdate]);

    // Delete
    useEffect(() => {
      if (null === deleteteProduct) return;
      axios
        .delete("http://localhost:3003/admin/products/" + deleteteProduct.id)
        .then((res) => {
          showMessage(res.data.msg);
          setLastUpdate(Date.now());
        })
        .catch((error) => {
          showMessage({ text: error.message, type: "danger" });
        });
    }, [deleteteProduct]);

     //Edit
  useEffect(() => {
    if (null === editProduct) return;
    axios
      .put("http://localhost:3003/admin/products/" + editProduct.id, editProduct)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      });
  }, [editProduct]);
  const showMessage = (m) => {
    const id = uuidv4();
    m.id = id;
    setMessages((msg) => [...msg, m]);
    setTimeout(() => {
      setMessages((mes) => mes.filter((ms) => ms.id !== id));
    }, 5000);
  };

  return (
    <BackContext.Provider
      value={{
        setCreateCat,
        cats,
        setDeleteCat,
        messages,
        setEditCat,
        setModalCat,
        modalCat,
        setCreateProduct,
        products,
        showMessage,
        setDeleteteProduct,
        setEditProduct,
        setModalProduct,
        modalProduct,
      }}
    >
      {show === "admin" ? (
        <>
          <Nav></Nav>
          <h1>Back</h1>
        </>
      ) : show === "cats" ? (
        <CatsCrud />
      ) : show === "products" ? (
        <ProductsCrud />
      ) : null}
    </BackContext.Provider>
  );

  //   if (show === "admin") {
  //     return (
  //       <>
  //         <Nav></Nav>
  //         <h1>Back</h1>
  //       </>
  //     );
  //   }

  //   if (show === "cats") {
  //     return (
  //       <>
  //         <CatsCrud></CatsCrud>
  //       </>
  //     );
  //   }

  //   if (show === "products") {
  //     return (
  //       <>
  //         <ProductsCrud></ProductsCrud>
  //       </>
  //     );
  //   }
}
export default Back;
