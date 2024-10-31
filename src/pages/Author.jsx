import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./author.css";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthorData(response.data);
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (loading) {
    return (
      <div className="main-skeleton">
        <div className="skeleton-a skeleton-items-a"></div>
        <div className="row-a">
          <div className="skeleton-profile-a">
            <div className="skeleton-a skeleton-avatar"></div>
            <div className="skeleton-text-group">
              <div className="skeleton-a skeleton-text-a"></div>
              <div className="skeleton-a skeleton-text-a"></div>
              <div className="skeleton-a skeleton-text-a"></div>
            </div>
          </div>
          <div className="skeleton-btn-container">
            <div className="skeleton-a skeleton-text-a"></div>
            <div className="skeleton-a skeleton-button-a"></div>
          </div>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <div
            className="d_item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{
              display: "inline-flex",
              backgroundSize: "cover",
              flexDirection: "column",
            }}
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
        ))}
        ;
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">
                            @{authorData.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {authorData.followers + (isFollowing ? 1 : 0)} followers
                      </div>
                      <Link
                        to="#"
                        onClick={handleFollowToggle}
                        className="btn-main"
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={authorData.nftCollection}
                    authorData={authorData}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
