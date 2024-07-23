import { Form, Formik, Field } from "formik";
const SearchBar = ({ setQuery }) => {
  const initialValues = {
    query: "",
  };
  const handleSubmit = (values) => {
    setQuery(values.query);
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field name="query" placeholder="Enter search value" type="search" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
