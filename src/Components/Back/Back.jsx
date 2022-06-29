import CatsCrud from "./Cats/Crud";
import Nav from "./Nav";
import ProductsCrud from "./Products/Crud";

function Back({ show }) {
  if (show === "admin") {
    return (
      <>
        <Nav></Nav>
        <h1>Back</h1>
      </>
    );
  }

  if (show === "cats") {
    return (
      <>
        <CatsCrud></CatsCrud>
      </>
    );
  }

  if (show === "products") {
    return (
      <>
        <ProductsCrud></ProductsCrud>
      </>
    );
  }
}
export default Back;
