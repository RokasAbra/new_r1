import { useState, useEffect } from "react";
import axios from 'axios';
import BackContext from "./BackContext";
import CatsCrud from "./Cats/Crud";
import Nav from "./Nav";
import ProductsCrud from "./Products/Crud";

function Back({ show }) {
    const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createCat, setCreateCat] = useState(null);
  const [cats, setCats] = useState(null);

  //Read
  useEffect(() => {
    axios.get('http://localhost:3003/admin/cats')
      .then(res => setCats(res.data));
  }, [lastUpdate]);

  // Create
  useEffect(() => {
    if (null === createCat) return;
    axios
      .post("http://localhost:3003/admin/cats", createCat)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      })
     
  }, [createCat]);

    const showMessage = () => {}

  return (
    <BackContext.Provider value={{
        setCreateCat,
        cats
    }}>
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
