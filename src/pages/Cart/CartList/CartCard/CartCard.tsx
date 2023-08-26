import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDeleteProductByIdMutation } from "../../../../services/api";
import { Spinner } from "react-bootstrap";
import { IProduct } from "../../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export default function CartCard({ product }: { product: IProduct }) {
  const { quantity, _id = "", book } = product;
  const { thumbnail, title, price, author } = { ...book };
  const [removeFromCart, { isLoading }] = useDeleteProductByIdMutation();

  const handleRemove = async () => {
    try {
      await removeFromCart(_id);
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
        <div className="d-flex align-items-center justify-content-between">
          <span className="display-6">${price * quantity}</span>
          <Button variant="dark" onClick={handleRemove}>
            <FontAwesomeIcon icon={faMinus} />{" "}
            {isLoading && <Spinner size="sm" />}
          </Button>
        </div>
      </Card.Body>
      {author && <Card.Footer className="text-muted">By {author}</Card.Footer>}
    </Card>
  );
}
