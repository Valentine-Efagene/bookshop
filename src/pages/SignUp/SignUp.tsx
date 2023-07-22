import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { ISignUpDto } from "../../types";
import { useSignUpMutation } from "../../services/api";

function SignIn() {
  const [signUp] = useSignUpMutation();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ISignUpDto>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(data: ISignUpDto) {
    try {
      const response = await signUp(data);
      console.log({ "signup response": response });
    } catch (error) {
      console.log({ "Sign up error": error });
    }
  }

  return (
    <Form
      className={`p-2 pb-5 d-grid gap-3 text-left col-md-6 col-12 mx-auto`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Welcome to Our Bookshop</h1>
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Form.Control type="email" {...field} />}
        />
        <Form.Text className="text-muted">{errors?.email?.message}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="firstName">First Name</Form.Label>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: false }}
          render={({ field }) => <Form.Control {...field} />}
        />
        <Form.Text className="text-muted">
          {errors?.firstName?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="lastName">Last Name</Form.Label>
        <Controller
          name="lastName"
          control={control}
          rules={{ required: false }}
          render={({ field }) => <Form.Control {...field} />}
        />
        <Form.Text className="text-muted">
          {errors?.lastName?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Form.Control type="password" {...field} />}
        />
        <Form.Text className="text-muted">
          {errors?.password?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password Confirm</Form.Label>
        <Controller
          name="passwordConfirm"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Form.Control type="password" {...field} />}
        />
        <Form.Text className="text-muted">
          {errors?.password?.message}
        </Form.Text>
      </Form.Group>
      <p>
        Already have an account?{" "}
        <Link to="/" className="text-reset">
          Sign In
        </Link>
      </p>
      <Form.Group>
        <Button disabled={isSubmitting} className="btn-dark" type="submit">
          Sign Up{" "}
          {isSubmitting && (
            <Spinner animation="border" size="sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Button>
      </Form.Group>
    </Form>
  );
}

export default SignIn;
