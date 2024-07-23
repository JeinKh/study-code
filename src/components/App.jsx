import { useEffect, useState } from "react";
import List from "./List/List";
import { fetchNews } from "../services/api";
import SearchBar from "./SearchBar/SearchBar";
import { Comment } from "react-loader-spinner";

const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchNews(query);
        setHits(response.hits);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query]);
  return (
    <div>
      <SearchBar setQuery={setQuery} />
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
      <List items={hits} />
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
