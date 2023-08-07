import Container from "react-bootstrap/Container";
import styles from "./BookList.module.css";
import { IBook } from "../../../types";
import ProductCard from "./ProductCard/ProductCard";

export default function BookList({ books }: { books?: IBook[] }) {
  return (
    <Container fluid className={styles.container}>
      {Array.isArray(books) &&
        books?.map((book) => {
          return <ProductCard key={book._id} book={book} />;
        })}
    </Container>
  );
}
