import "./Carousel.css";
import React, { useState } from "react";
import rightArrow from "../../assets/icons/right-arrow.svg";
import leftArrow from "../../assets/icons/left-arrow.svg";

const Carousel = ({ recentOrders }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(recentOrders.length / itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? recentOrders.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= recentOrders.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  // Calculate the active page index based on the currentIndex
  const activeDotIndex = Math.floor(currentIndex / itemsPerPage);

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {recentOrders
          .slice(currentIndex, currentIndex + itemsPerPage)
          .map((recentOrder) => (
            <div key={recentOrder.id} className="carousel-card">
              <img
                className="recent-item-image"
                src={`http://localhost:3000/${recentOrder.item.image}`}
                alt=""
              />
              <div className="recent-item-info">
                <div className="recent-item-name">{recentOrder.item.name}</div>
                <div className="recent-item-quantity">
                  <b>{recentOrder.quantity} Unit</b> | €{" "}
                  {recentOrder.totalPrice}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="carousel-button left" onClick={prevSlide}>
        <img src={leftArrow} alt="" />
      </div>
      <div className="carousel-button right" onClick={nextSlide}>
        <img src={rightArrow} alt="" />
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeDotIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index * itemsPerPage)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
