import React from "react";
import { gql, useQuery } from "@apollo/client";
import {GET_BOOKS} from "../queries/queries";

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  return (
    <div>
      {!loading && (
        <div>
          <h1>BookList</h1>
          {data && data.books.map((value:any) => <p key={value.id}>{value.name}</p>)}
        </div>
      )}
      {loading && <p>loading</p>}
    </div>
  );
};

export default BookList;
