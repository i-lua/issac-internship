import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "./newitems.css";
import Timer from "../timer";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiKey);
        setNewItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 4,
    swipeToSlide: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <Slider {...settings}>
              {[1, 2, 3, 4].map((_, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp skeleton-circle--ni">
                    <i className="fa fa-check checkmark"></i>
                  </div>
                  <div className="skeleton-ni skeleton-image--ni"></div>
                  <div className="nft__item_info">
                    <h4>
                      <div className="skeleton-ni skeleton-text--ni skeleton-title--ni" />
                    </h4>
                    <div className="nft__item_price">
                      <div className="skeleton-ni skeleton-text--ni skeleton-price--ni" />
                    </div>
                    <div className="nft__item_like">
                      <div className="skeleton-ni skeleton-like--ni" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {newItems.map((item, index) => (
                <div className="nft__item" key={index} data-aos="fade-up">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${item.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Creator: ${item.authorName}`}
                    >
                      <img
                        className="lazy"
                        src={item.authorImage}
                        alt={item.authorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <Timer expiryDate={item.expiryDate} />

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "-5px",
        backgroundColor: "white",
        border: "1px solid black",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        zIndex: "1",
        padding: "5px",
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="20px"
        height="10px"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "block",
        }}
      >
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      </svg>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: "-5px",
        backgroundColor: "white",
        border: "1px solid black",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        zIndex: "1",
        padding: "5px",
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="20px"
        height="10px"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "block",
        }}
      >
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      </svg>
    </div>
  );
};

export default NewItems;
