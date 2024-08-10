import styled from "styled-components";
import "./App.css";
import { useEffect, useState } from "react";
import SearchResults from "./components/searchResults/SearchResults";

export const BASE_URL = "http://localhost:9000"; //endpoint

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    // useEffect helps to perform the network call and fetch data before the rendering of UI

    const fetchFoodData = async () => {
      //performing network call to fetch data from backend

      setLoading(true);

      try {
        const response = await fetch(BASE_URL); // fetch() is a JS API to perform network call

        const json = await response.json(); // converting the response into json

        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };

    fetchFoodData();
  }, []); //[] is passed so the useEffext only runs once

  const searchFood = (event) => {
    const searchValue = event.target.value;

    if (searchValue == "") {
      setFilteredData(null);
    }

    const filter = data?.filter(
      (
        value // to compare the search and backend data value
      ) => value.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterfood = (type) => {
    if (type == "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter(
      (
        value // to compare the search and backend data value
      ) => value.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>{"loading..."}</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="logo.svg" alt="Logo" />
          </div>

          <div className="search">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search Food..."
            />
          </div>
        </TopContainer>

        <FilterContainer>
          <Button onClick={() => filterfood("all")}>All</Button>
          <Button onClick={() => filterfood("breakfast")}>Breakfast</Button>
          <Button onClick={() => filterfood("lunch")}>Lunch</Button>
          <Button onClick={() => filterfood("dinner")}>Dinner</Button>
        </FilterContainer>
      </Container>

      <SearchResults data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.div`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      color: white;
      border: 1px solid #ff4343;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;

      &::placeholder{
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;
export const Button = styled.button`
  background-color: #ff4343;
  color: white;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f22f2f;
  }
`;
