import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { IBook } from "../../../../types";
import { useDeleteBookByIdMutation } from "../../../../services/api";
import { Spinner } from "react-bootstrap";

export default function AdminBookCard({ book }: { book: IBook }) {
  const { thumbnail, title, _id, author, stock, description } = book;
  const [deleteBook, { isSuccess, isLoading }] = useDeleteBookByIdMutation();

  const handleDeleteBook = async () => {
    if (!_id) return;

    try {
      await deleteBook(_id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card key={_id}>
      <Card.Img
        variant="top"
        src={`${import.meta.env.VITE_API_BASE_URL}/${thumbnail}`}
        className="object-fit-cover"
        style={{ aspectRatio: "16/9" }}
        alt="..."
      />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="my-2 d-flex gap-3 flex-row justify-content-between align-items-center">
          <span>{stock}</span>
          <Button
            className="d-flex gap-2 align-items-center flex-nowrap text-light"
            variant="danger"
            onClick={handleDeleteBook}
          >
            Delete
            {isSuccess ? (
              <FontAwesomeIcon icon={faCheckCircle} />
            ) : (
              <FontAwesomeIcon icon={faShoppingCart} />
            )}
            {isLoading && <Spinner size="sm" />}
          </Button>
        </div>
      </Card.Body>
      {author && <Card.Footer className="text-muted">By {author}</Card.Footer>}
    </Card>
  );
}
