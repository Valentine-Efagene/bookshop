import Container from "react-bootstrap/Container";
import styles from "./Order.module.css";
import { useGetOrderByIdQuery } from "../../services/api";
import ProductList from "./ProductList/ProductList";
import { useParams } from "react-router-dom";

export default function Order() {
  const { id } = useParams();
  const { data: order } = useGetOrderByIdQuery(id ?? "", {});

  return (
    <Container fluid className={`${styles.container} d-grid gap-4`}>
      <div className="fs-4">
        Total: $
        {order?.products?.reduce(
          (acc, curr) => acc + curr?.quantity * curr?.book?.price,
          0
        )}
      </div>
      <ProductList products={order?.products} />
    </Container>
  );
}
