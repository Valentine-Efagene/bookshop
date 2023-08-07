import Form from "react-bootstrap/Form";
import { useGetAllProductsQuery } from "../../services/api";
import { useAppSelector } from "../../store";
import { PaystackButton } from "react-paystack";
import { ChangeEventHandler, useState } from "react";

interface ICheckOutDto {
  email: string;
  amount: number;
  name: string;
  phone: string;
}

const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

function CheckOut() {
  const { profile } = useAppSelector((state) => state.auth);
  const { data: products } = useGetAllProductsQuery();
  const amount =
    products?.reduce(
      (acc, curr) => acc + curr?.quantity * curr?.book?.price,
      0
    ) ?? 0;

  const initialValues: ICheckOutDto = {
    email: profile?.email ?? "",
    name: `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`,
    amount,
    phone: "",
  };

  const [data, setData] = useState(initialValues);

  const { email, name, phone } = data;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
      custom_fields: [],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),

    onClose: () => alert("Wait! Don't leave :("),
  };

  return (
    <Form
      className={`p-2 pb-5 d-grid gap-3 text-left col-md-6 col-12 mx-auto`}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1>Welcome to Our Bookshop</h1>
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="phone">Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
      </Form.Group>
      <span className="display-6 fw-bold">${amount}</span>
      <PaystackButton className="btn btn-dark" {...componentProps} />
    </Form>
  );
}

export default CheckOut;
