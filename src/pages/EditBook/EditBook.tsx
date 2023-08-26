import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import Spinner from "react-bootstrap/Spinner";
import {
  useUpdateBookByIdMutation,
  useGetAllCategoriesQuery,
  useGetBookByIdQuery,
} from "../../services/api";
import { ICategory, IUpdateBookDto } from "../../types";
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function EditBook() {
  const { id } = useParams();

  const { data: book } = useGetBookByIdQuery(id ?? "");
  const [updateBook, { isLoading, isSuccess }] = useUpdateBookByIdMutation();
  const { data: categories } = useGetAllCategoriesQuery(undefined, {});

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IUpdateBookDto>({
    defaultValues: {
      title: book?.title ?? "",
      author: book?.author ?? "",
      stock: book?.stock ?? 0,
      description: book?.description ?? "",
      price: book?.price ?? 0,
      category: book?.category ?? "",
    },
  });

  // https://stackoverflow.com/a/64307087/6132438
  useEffect(() => {
    const initialData = {
      title: book?.title ?? "",
      author: book?.author ?? "",
      stock: book?.stock ?? 0,
      description: book?.description ?? "",
      price: book?.price ?? 0,
      category: book?.category ?? "",
    };

    reset(initialData);
  }, [book, reset]);

  async function onSubmit(data: IUpdateBookDto) {
    if (
      Object.keys(data).length === 0 ||
      book === undefined ||
      book._id === undefined
    ) {
      return;
    }

    try {
      const formData = new FormData();

      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail, data.thumbnail.name);
      }

      if (data.title) formData.append("title", data.title);
      if (data.category) formData.append("category", data.category);
      if (data.author) formData.append("author", data.author);
      if (data.description) formData.append("description", data.description);
      if (data.stock) formData.append("stock", data.stock?.toString());
      if (data.price) formData.append("price", data.price?.toString());

      await updateBook({ id: book._id, formData }).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form
      className={`p-2 d-grid gap-3 text-left col-md-6 col-12 mx-auto`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Edit</h1>
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
          Save Changes{" "}
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

export default EditBook;
