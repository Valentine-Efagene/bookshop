import Container from "react-bootstrap/Container";
import styles from "./Cart.module.css";
import { useGetAllProductsQuery } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import CartList from "./CartList/CartList";
import { Link } from "react-router-dom";

export default function Cart() {
  const { data: products } = useGetAllProductsQuery();

  return (
    <Container fluid className={`${styles.container} d-grid gap-4`}>
      <div>
        <Link
          style={{ width: "fit-content" }}
          to="/checkout"
          className="btn btn-dark d-flex gap-2 align-items-center"
        >
          <span>Check Out</span>
          <FontAwesomeIcon icon={faMoneyCheckDollar} />
          <span>
            $
            {products?.reduce(
              (acc, curr) => acc + curr?.quantity * curr?.book?.price,
              0
            )}
          </span>
        </Link>
      </div>
      <CartList products={products} />
    </Container>
  );
}
