import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "./hotcollections.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

  const fetchCollections = async () => {
    try {
      const response = await axios.get(apiKey);
      setCollections(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  useEffect(() => {
    fetchCollections();
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <Slider {...settings}>
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="skeleton-slide">
                  <div className="skeleton nft_coll">
                    <div className="nft_wrap skeleton-image"></div>
                    <div className="nft_coll_pp skeleton-author-image">
                      <i className="fa fa-check checkmark"></i>
                    </div>
                    <div className="nft_coll_info skeleton-info">
                      <div className="skeleton-title"></div>
                      <div className="skeleton-code"></div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {collections.map((collection, index) => (
                <div key={index} data-aos="fade-up">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid img-main"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
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

export default HotCollections;
