import styles from "./ProductList.module.css";
import CartCard from "./ProductCard/ProductCard";
import { IProduct } from "../../../types";

export default function ProductList({ products }: { products?: IProduct[] }) {
  return (
    <div className={styles.container}>
      {Array.isArray(products) &&
        products?.map((product) => {
          return <CartCard key={product._id} product={product} />;
        })}
    </div>
  );
}
