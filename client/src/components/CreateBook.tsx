import React, {  FormEvent, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_AUTHOR, CREATE_BOOK, GET_BOOKS } from "../queries/queries";

const CreateBook = () => {


  // GraphQL hooks
  const { loading, error, data } = useQuery(GET_AUTHOR);
  const [addBook] = useMutation(CREATE_BOOK);

  // react hooks
  const [formData, setFormData] = useState({
    name: null,
    genre: null,
    authorId: null,
  });

  /**
   * Function to update state for forms
   * @param value field value
   * @param field field name
   */
  const updateForm = (value: string, field: string) => {
    let newValue: any = { ...formData };
    newValue[field] = value;
    setFormData(newValue);
  };

  /**
   * Function to submit Form
   * @param event mouse click event
   */
  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    addBook({
      variables: { ...formData },
      refetchQueries: [{ query: GET_BOOKS }],
    });
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form id="add-book" onSubmit={(e:FormEvent) => submitForm(e)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={(e:FormEvent<HTMLInputElement>) => updateForm(e.currentTarget.value, "name")}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={(e:FormEvent<HTMLInputElement>) => updateForm(e.currentTarget.value, "genre")}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={(e:FormEvent<HTMLSelectElement>) => updateForm(e.currentTarget.value, "authorId")}>
            <option>Select Author</option>
            {data &&
              data.authors.map((value: any) => (
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              ))}
          </select>
        </div>

        <button type="submit">Create Book</button>
      </form>
    </div>
  );
};

export default CreateBook;
