import Container from "react-bootstrap/Container";
import styles from "./BookList.module.css";
import { IBook } from "../../../types";
import ProductCard from "./ProductCard/ProductCard";
import { useAppSelector } from "../../../store";
import AdminBookCard from "./AdminBookCard/AdminBookCard";

export default function BookList({ books }: { books?: IBook[] }) {
  const { profile } = useAppSelector((state) => state.auth);

  return (
    <Container fluid className={styles.container}>
      {Array.isArray(books) &&
        books?.map((book) => {
          return profile?.isAdmin ? (
            <AdminBookCard key={book._id} book={book} />
          ) : (
            <ProductCard key={book._id} book={book} />
          );
        })}
    </Container>
  );
}
