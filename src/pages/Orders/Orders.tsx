import Container from "react-bootstrap/Container";
import styles from "./Orders.module.css";
import { useGetAllOrdersQuery } from "../../services/api";
import OrderList from "./OrderList/OrderList";

export default function Orders() {
  const { data: orders } = useGetAllOrdersQuery();

  return (
    <Container fluid className={`${styles.container} d-grid gap-4`}>
      <OrderList orders={orders} />
    </Container>
  );
}
