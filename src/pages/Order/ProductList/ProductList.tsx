import styles from "./ProductList.module.css";
import ProductCard from "./ProductCard/ProductCard";
import { IProduct } from "../../../types";

export default function ProductList({ products }: { products?: IProduct[] }) {
  return (
    <div className={styles.container}>
      {Array.isArray(products) &&
        products?.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
    </div>
  );
}
