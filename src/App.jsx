import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("london");
  const [getInput, setGetInput] = useState("London");
  const [clouds, setClouds] = useState("");
  const [sky, setSky] = useState("");
  const [image, setImage] = useState("");
  const [temp, setTemp] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [mistake, setMistake] = useState("");

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api_key}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((item) => {
        setClouds(item.weather[0].main);
        setSky(item.weather[0].description);
        setImage(
          `https://openweathermap.org/img/w/${item.weather[0].icon}.png`
        );
        setTemp((item.main.temp - 273.15).toFixed(2) + "°");
        setMin((item.main.temp_min - 273.15).toFixed(2) + "°");
        setMax((item.main.temp_max - 273.15).toFixed(2) + "°");
      })
      .catch((err) => {
        setMistake(err.message);
      });
  }, [getInput]);

  const handleClick = () => {
    setGetInput(input);
    setMistake("");
  };

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="wrapper">
      <div className="form">
        <input
          type="text"
          placeholder="Type City name..."
          onChange={handleOnChange}
        />
        <button onClick={handleClick}>Search</button>
      </div>
      {mistake ? (
        <h1>{mistake}</h1>
      ) : (
        <div className="result">
          <h1 className="city">{getInput.toUpperCase()}</h1>
          <p className="clouds">{clouds}</p>
          <p className="sky">{sky}</p>
          <img src={image} alt="" />
          <h1 className="temp">{temp}</h1>
          <div>
            <p>
              <span>min</span>
              <span className="min">{min}</span>
            </p>
            <p>
              <span>max</span>
              <span className="max">{max}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
