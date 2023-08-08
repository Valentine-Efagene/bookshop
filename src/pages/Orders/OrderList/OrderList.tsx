import styles from "./OrderList.module.css";
import OrderCard from "./OrderCard/OrderCard";
import { IOrder } from "../../../types";

export default function OrderList({ orders }: { orders?: IOrders[] }) {
  return (
    <div className={styles.container}>
      {Array.isArray(orders) &&
        orders?.map((order) => {
          return <OrderCard key={order._id} order={order} />;
        })}
    </div>
  );
}
