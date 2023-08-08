import Card from "react-bootstrap/Card";
import { IProduct } from "../../../../types";

export default function ProductCard({ product }: { product: IProduct }) {
  const {
    quantity,
    _id = "",
    book: { thumbnail, title, price, author },
  } = product;

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
        </div>
      </Card.Body>
      {author && <Card.Footer className="text-muted">By {author}</Card.Footer>}
    </Card>
  );
}
