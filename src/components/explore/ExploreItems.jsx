import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Timer from "../timer";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [itemsToShow, setItemsToShow] = useState(8);

  useEffect(() => {
    const fetchExploreItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${sortOption}`
        );
        setExploreItems(response.data);
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [sortOption]);

  const handleSortChange = (e) => {
    const { value } = e.target;
    setSortOption(value);
  };

  const loadMoreItems = () => {
    setItemsToShow((prev) => prev + 4);
  };

  if (loading) {
    return [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
      <div
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        style={{ display: "block", backgroundSize: "cover" }}
        key={index}
      >
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
    ));
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.slice(0, itemsToShow).map((explore, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${explore.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={explore.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <Timer expiryDate={explore.expiryDate} />

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
              <Link to="/item-details">
                <img
                  src={explore.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{explore.title}</h4>
              </Link>
              <div className="nft__item_price">{explore.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{explore.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        <button onClick={loadMoreItems} className="btn-main lead">
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
