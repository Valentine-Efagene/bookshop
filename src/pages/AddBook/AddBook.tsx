import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import Spinner from "react-bootstrap/Spinner";
import {
  useAddBookMutation,
  useGetAllCategoriesQuery,
} from "../../services/api";
import { IAddBookDto, ICategory } from "../../types";
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function AddBook() {
  const [addBook, { isLoading, isSuccess, status }] = useAddBookMutation();
  const { data: categories } = useGetAllCategoriesQuery(undefined, {});

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IAddBookDto>({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  async function onSubmit(data: IAddBookDto) {
    try {
      const formData = new FormData();

      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail, data.thumbnail.name);
      }

      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("description", data.description);
      formData.append("stock", data.stock?.toString());
      formData.append("price", data.price?.toString());

      await addBook(formData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (status === "fulfilled") reset();
  }, [status, reset]);

  return (
    <Form
      className={`p-2 d-grid gap-3 text-left col-md-6 col-12 mx-auto`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Add a Book</h1>
      <Form.Group>
        <Form.Label htmlFor="email">Title</Form.Label>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Form.Control {...field} />}
        />
        <Form.Text className="text-muted">{errors?.title?.message}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="author">Author</Form.Label>
        <Controller
          name="author"
          control={control}
          rules={{ required: false }}
          render={({ field }) => <Form.Control type="text" {...field} />}
        />
        <Form.Text className="text-muted">{errors?.author?.message}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="thumbnail">Thumbnail</Form.Label>
        <Controller
          name="thumbnail"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <Form.Control
              type="file"
              onChange={(event) => {
                const target = event.target as HTMLInputElement;
                setValue(field.name, target.files?.[0]);
                // setValue(field.name, target.files);
              }}
            />
          )}
        />
        <Form.Text className="text-muted">
          {errors?.thumbnail?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="description">Description</Form.Label>
        <Controller
          name="description"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <Form.Control as="textarea" rows={3} {...field} />
          )}
        />
        <Form.Text className="text-muted">
          {errors?.description?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="price">Price</Form.Label>
        <Controller
          name="price"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="number" {...field} />
            </InputGroup>
          )}
        />
        <Form.Text className="text-muted">{errors?.price?.message}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="price">Stock</Form.Label>
        <Controller
          name="stock"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Form.Control type="number" {...field} />}
        />
        <Form.Text className="text-muted">{errors?.price?.message}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="category">Category</Form.Label>
        <Controller
          name="category"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <Form.Select {...field}>
              <option value={undefined}>Choose a category</option>
              {categories?.map(({ _id, name }: ICategory) => (
                <option value={_id}>{name}</option>
              ))}
            </Form.Select>
          )}
        />
        <Form.Text className="text-muted">
          {errors?.category?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Button disabled={isSubmitting} className="btn-dark" type="submit">
          Add{" "}
          {isLoading && (
            <Spinner animation="border" size="sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {isSuccess && <FontAwesomeIcon icon={faCheckCircle} />}
        </Button>
      </Form.Group>
    </Form>
  );
}

export default AddBook;
