import { useEffect, useState } from "react";
import List from "./List/List";
import axios from "axios";

const App = () => {
  const [hits, setHits] = useState([]);
  useEffect(() => {
    axios
      .get("https://hn.algolia.com/api/v1/search?query=react")
      .then((res) => setHits(res.data.hits))
      .catch();
  }, []);
  return (
    <div>
      <List items={hits} />
    </div>
  );
};

export default App;
