import styles from "./CartList.module.css";
import CartCard from "./CartCard/CartCard";
import { IProduct } from "../../../types";

export default function CartList({ products }: { products?: IProduct[] }) {
  return (
    <div className={styles.container}>
      {Array.isArray(products) &&
        products?.map((product) => {
          return <CartCard key={product._id} product={product} />;
        })}
    </div>
  );
}
