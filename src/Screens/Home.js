import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import Footer from "../Components/Footer";

export default function Home() {
  const [search,setSearch]=useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFoodItem(data[0]); // Assuming data[0] contains foodItem
        setFoodCat(data[1]); // Assuming data[1] contains foodCat
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
      <div className="carousel-inner" id="carousal" style={{ maxHeight: '500px' }}>
      <div className="carousel-caption" style={{zIndex:"10"}}>
        <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
    </div>
      </div>
        <div className="carousel-item active">
          <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{filter:"brightness(30%"}} alt="Burger" />
        </div>
        <div className="carousel-item">
          <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{filter:"brightness(30%"}} alt="Pastry" />
        </div>
        <div className="carousel-item">
          <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{filter:"brightness(30%"}} alt="Chicken" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

      </div>
      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length !== 0 ? (
                  foodItem
                    .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card foodItem={filterItems}
                            options={filterItems.options[0]}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>no such data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>no data to display</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
