import Container from "react-bootstrap/Container";
import styles from "./Orders.module.css";
import { useGetAllOrdersQuery } from "../../services/api";
import OrderList from "./OrderList/OrderList";
import { Link } from "react-router-dom";

export default function Orders() {
  const { data: orders } = useGetAllOrdersQuery();

  return (
    <Container fluid className={`${styles.container} d-grid gap-4`}>
      <div>
        <Link
          style={{ width: "fit-content" }}
          to="/checkout"
          className="btn btn-dark d-flex gap-2 align-items-center"
        >
          <span>View</span>
        </Link>
      </div>
      <OrderList orders={orders} />
    </Container>
  );
}
