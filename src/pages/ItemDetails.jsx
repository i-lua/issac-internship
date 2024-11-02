import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./itemdetails.css";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setItemDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
    window.scrollTo(0, 0);
  }, [nftId]);

  if (loading) {
    return (
      <div className="item-details-skeleton">
        <div className="poster-id">
          <div className="skeleton-box-id skeleton-poster-id"></div>
        </div>
        <div className="details-id">
          <div className="skeleton-box-id skeleton-title-id"></div>
          <div className="skeleton-info-counts-id">
            <div className="skeleton-box-id skeleton-info-box"></div>
            <div className="skeleton-box-id skeleton-info-box"></div>
          </div>
          <div className="skeleton-box-id skeleton-description-id"></div>
          <div className="skeleton-box skeleton-author-title-id"></div>
          <div className="skeleton-author-id">
            <div className="skeleton-box-id skeleton-author-image-id"></div>
            <div className="skeleton-box-id skeleton-author-name-id"></div>
          </div>
          <div className="skeleton-box skeleton-author-title-id"></div>
          <div className="skeleton-author-id">
            <div className="skeleton-box-id skeleton-author-image-id"></div>
            <div className="skeleton-box-id skeleton-author-name-id"></div>
          </div>
          <div className="skeleton-box skeleton-author-title-id"></div>
          <div className="skeleton-price">
            <div className="skeleton-box-id skeleton-price-image-id"></div>
            <div className="skeleton-box-id skeleton-price-amount-id"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemDetails.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                  data-aos="fade-right"
                />
              </div>
              <div className="col-md-6" data-aos="fade-left">
                <div className="item_info">
                  <h2>{itemDetails.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemDetails.title}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemDetails.likes}
                    </div>
                  </div>
                  <p>{itemDetails.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.ownerId}`}>
                            <img
                              className="lazy"
                              src={itemDetails.ownerImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.ownerId}`}>
                            {itemDetails.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.creatorId}`}>
                            <img
                              className="lazy"
                              src={itemDetails.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.creatorId}`}>
                            {itemDetails.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemDetails.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
