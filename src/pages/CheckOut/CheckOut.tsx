import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import {
  api,
  useCreateOrderMutation,
  useGetAllProductsQuery,
} from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../store";
import { PaystackButton } from "react-paystack";
import { ChangeEventHandler, useState } from "react";
import { ICreateOrderDto } from "../../types";

interface ICheckOutDto {
  email: string;
  amount: number;
  name: string;
  phone: string;
}

const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

function CheckOut() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.auth);
  const { data: products } = useGetAllProductsQuery({ page: 1, limit: 8 });
  const [createOrder, { error, isSuccess, isLoading }] =
    useCreateOrderMutation();
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

  useEffect(() => {
    if (error) {
      alert("Could not save order");
    }
  }, [error]);

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
    onSuccess: () => {
      const orderDto: ICreateOrderDto = {
        products: products ?? [],
        buyer: profile?._id ?? "",
      };

      createOrder(orderDto).then(() =>
        dispatch(api.util.invalidateTags(["Products"]))
      );
    },
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
      {isLoading && <span>Loading...</span>}
      <PaystackButton className="btn btn-dark" {...componentProps} />
      {isSuccess && <span>Saved!</span>}
    </Form>
  );
}

export default CheckOut;
