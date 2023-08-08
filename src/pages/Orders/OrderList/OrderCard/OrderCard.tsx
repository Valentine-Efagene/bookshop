import Card from "react-bootstrap/Card";
import { IOrder } from "../../../../types";
import { Link } from "react-router-dom";

export default function OrderCard({ order }: { order: IOrder }) {
  const { _id = "", products, buyer, status } = order;
  const amount =
    products?.reduce(
      (acc, curr) => acc + curr?.quantity * curr?.book?.price,
      0
    ) ?? 0;

  const getName = () => {
    return buyer?.email;
  };

  return (
    <Card key={_id}>
      <Card.Body>
        <Card.Title className="card-title">{}</Card.Title>
        <div className="d-flex align-items-center justify-content-between">
          <span className="">{getName()}</span>
          <Link to={`/orders/${_id}`}>View</Link>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted d-flex align-items-center justify-content-between">
        <span>${amount}</span>
        <span>{status}</span>
      </Card.Footer>
    </Card>
  );
}
