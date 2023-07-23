import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./Books.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useGetAllBooksQuery } from "../../services/api";

export default function Books() {
  const { data: books } = useGetAllBooksQuery(undefined, {});

  return (
    <Container fluid className={styles.container}>
      {Array.isArray(books) &&
        books?.map((book) => {
          const { thumbnail, title, _id, author } = book;

          return (
            <Card key={_id}>
              <Card.Img
                src={`${import.meta.env.VITE_API_BASE_URL}/${thumbnail}`}
                className="card-img-top object-fit-cover"
                style={{ aspectRatio: "16/9" }}
                alt="..."
              />
              <Card.Body>
                <Card.Title className="card-title">{title}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="dark">
                  Add to cart <FontAwesomeIcon icon={faShoppingCart} />
                </Button>
              </Card.Body>
              {author && (
                <Card.Footer className="text-muted">By {author}</Card.Footer>
              )}
            </Card>
          );
        })}
    </Container>
  );
}
