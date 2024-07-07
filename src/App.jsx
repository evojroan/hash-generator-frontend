import {useState} from "react";
import axios from "axios";

function App() {
  const [value, setValue] = useState("");
  const [algorithm, setAlgorithm] = useState("sha256");
  const [hash, setHash] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      //修改前
      //const response = await axios.post("http://localhost:3000/",
      //修改後
      const response = await axios.post(
        "https://hash-generator-backend.vercel.app/",
        {
          text: value,
          algorithm: algorithm
        }
      );
      setHash(response.data.hash);
    } catch (error) {
      console.error("錯誤！", error);
    }
  }
  return (
    <>
      <h1>輸入</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={event => {
            setValue(event.target.value);
          }}
        />
        <select
          value={algorithm}
          onChange={e => setAlgorithm(e.target.value)}>
          <option value="sha256">SHA-256</option>
          <option value="md5">MD5</option>
        </select>
        <button type="submit">計算</button>
      </form>
      <h1>輸出</h1>
      <div>{hash}</div>
    </>
  );
}

export default App;
