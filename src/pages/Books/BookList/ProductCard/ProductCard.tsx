import { ChangeEventHandler, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { IBook, IProduct } from "../../../../types";
import { useAddProductToCartMutation } from "../../../../services/api";
import { Spinner } from "react-bootstrap";
import { useAppSelector } from "../../../../store";

const DEFAULT_QUANTITY = 1;

export default function ProductCard({ book }: { book: IBook }) {
  const { profile } = useAppSelector((state) => state.auth);
  const [addToCart, { isLoading, isSuccess }] = useAddProductToCartMutation();
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);
  const { thumbnail, title, _id, author, price, stock, description } = book;

  const handleQuantityChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setQuantity(Number(e.target.value));

  const handleAddToCart = async () => {
    const product: IProduct = {
      quantity,
      book,
      buyer: profile?._id,
    };

    try {
      await addToCart(product);
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
        <span className="display-6">${price * quantity}</span>
        <div className="my-2 d-flex gap-3 flex-row justify-content-between align-items-center">
          <Form.Control
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
            type="number"
            style={{
              width: "6rem",
            }}
            name="quantity"
            max={stock}
          />
          <Button
            className="d-flex gap-2 align-items-center flex-nowrap"
            variant="dark"
            onClick={handleAddToCart}
          >
            Add to cart
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
