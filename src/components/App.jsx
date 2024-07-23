import { useEffect, useState } from "react";
import List from "./List/List";
import { fetchNews } from "../services/api";

const App = () => {
  const [hits, setHits] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchNews("css");
        setHits(response.hits);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div>
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
