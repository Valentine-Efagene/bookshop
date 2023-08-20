import Container from "react-bootstrap/Container";
import styles from "./Order.module.css";
import {
  useGetOrderByIdQuery,
  useUpdateOrderByIdMutation,
} from "../../services/api";
import ProductList from "./ProductList/ProductList";
import { useParams } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { IOrderStatus } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Order() {
  const { id } = useParams();
  const { data: order } = useGetOrderByIdQuery(id ?? "", {});
  const [updateOrder, { isLoading, isSuccess }] = useUpdateOrderByIdMutation();
  const [status, setStatus] = useState<IOrderStatus>(
    order?.status ?? "pending"
  );

  const update = async () => {
    if (!status) return;

    try {
      updateOrder({ _id: id, status });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className={`${styles.container} d-grid gap-4`}>
      <div className="fs-4">
        Total: $
        {order?.products?.reduce(
          (acc, curr) => acc + curr?.quantity * curr?.book?.price,
          0
        )}
      </div>
      <Form.Select
        onChange={(e) => setStatus(e.target.value as IOrderStatus)}
        style={{ width: "fit-content" }}
        name="status"
        id=""
      >
        <option selected={status === "pending"} value="pending">
          Pending
        </option>
        <option selected={status === "delivered"} value="delivered">
          Delivered
        </option>
      </Form.Select>
      <Button onClick={update} style={{ width: "fit-content" }}>
        Save {isLoading && <Spinner size="sm" />}
        {isSuccess && <FontAwesomeIcon icon={faCheckCircle} />}
      </Button>
      <ProductList products={order?.products} />
    </Container>
  );
}
