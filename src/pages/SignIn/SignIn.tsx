import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { useSignInMutation } from "../../services/api";
import { saveToken } from "../../services/authSlice";
import { useAppDispatch } from "../../store";

interface ISignInDto {
  email: string;
  password: string;
}

function SignIn() {
  const dispatch = useAppDispatch();
  const [signIn] = useSignInMutation();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ISignInDto>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: ISignInDto) {
    try {
      const { access_token } = await signIn(data).unwrap();
      dispatch(saveToken(access_token));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form
      className={`p-2 d-grid gap-3 text-left col-md-6 col-12 mx-auto`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Welcome Back</h1>
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Form.Control {...field} />}
        />
        <Form.Text className="text-muted">{errors?.email?.message}</Form.Text>
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
      <p>
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-reset">
          Sign Up
        </Link>
      </p>
      <Form.Group>
        <Button disabled={isSubmitting} className="btn-dark" type="submit">
          Sign In{" "}
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
