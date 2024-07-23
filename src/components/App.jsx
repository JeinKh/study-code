import { useEffect, useState } from "react";
import List from "./List/List";
import { fetchNews } from "../services/api";
import SearchBar from "./SearchBar/SearchBar";
import { Comment } from "react-loader-spinner";

const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchNews(query, page);
        setHits((prev) => [...prev, ...response.hits]);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = (query) => {
    setQuery(query);
    setHits([]);
    setPage(0);
  };
  return (
    <div>
      <SearchBar setQuery={handleSetQuery} />
      {isLoading && (
        <Comment
          visible={true}
          height="180"
          width="180"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#fff"
          backgroundColor="#F4442E"
        />
      )}
      {isError && <p>Something wrong! Try again...</p>}
      <List items={hits} />
      <button onClick={() => setPage((prev) => prev + 1)}>Load more</button>
    </div>
  );
};

// useEffect(() => {
//     axios
//       .get("https://hn.algolia.com/api/v1/search?query=react")
//       .then((res) => setHits(res.data.hits))
//       .catch();
//   }, []);
export default App;
