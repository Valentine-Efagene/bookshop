import Container from "react-bootstrap/Container";
import styles from "./Order.module.css";
import {
  useGetOrderByIdQuery,
  useUpdateOrderByIdMutation,
} from "../../services/api";
import ProductList from "./ProductList/ProductList";
import { useParams } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { IOrder } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Controller, useForm } from "react-hook-form";

type IData = Pick<IOrder, "status">;

export default function Order() {
  const { id } = useParams();
  const { data: order } = useGetOrderByIdQuery(id ?? "", {});
  const [updateOrder, { isLoading, isSuccess }] = useUpdateOrderByIdMutation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IData>({
    defaultValues: {
      status: order?.status ?? "pending",
    },
  });

  useEffect(() => {
    reset({
      status: order?.status ?? "pending",
    });
  }, [order, reset]);

  const update = async (data: IData) => {
    try {
      updateOrder({ _id: id, status: data.status });
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
      <Form
        onSubmit={handleSubmit(update)}
        className="d-flex flex-column gap-3"
      >
        <Form.Group>
          <Form.Label htmlFor="status">Status</Form.Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Form.Select {...field} style={{ width: "fit-content" }}>
                <option selected={status === "pending"} value="pending">
                  Pending
                </option>
                <option selected={status === "delivered"} value="delivered">
                  Delivered
                </option>
              </Form.Select>
            )}
          />
        </Form.Group>
        <Button
          className="btn btn-dark"
          type="submit"
          disabled={isLoading || !isDirty}
          style={{ width: "fit-content" }}
        >
          Save Changes {isLoading && <Spinner size="sm" />}
          {isSuccess && <FontAwesomeIcon icon={faCheckCircle} />}
        </Button>
      </Form>
      <ProductList products={order?.products} />
    </Container>
  );
}
