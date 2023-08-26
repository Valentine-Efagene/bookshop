import Container from "react-bootstrap/Container";
import styles from "./Books.module.css";
import {
  useGetAllBooksQuery,
  useGetAllProductsQuery,
} from "../../services/api";
import BookList from "./BookList/BookList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Books() {
  const { data: books } = useGetAllBooksQuery();
  const { data: products } = useGetAllProductsQuery({});

  return (
    <Container fluid className={`${styles.container} d-grid gap-4`}>
      <div>
        <Link to="/cart" className="btn btn-outline-dark">
          {products?.reduce(
            (acc, curr) => acc + curr.quantity * curr.book.price,
            0
          )}{" "}
          <FontAwesomeIcon icon={faMoneyCheckDollar} />
        </Link>
      </div>
      <BookList books={books} />
    </Container>
  );
}
