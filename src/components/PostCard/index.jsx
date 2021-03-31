import React from "react";
import P from "prop-types";
import "./styles.css";

export const PostCard = ({ id, cover, title, body }) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div className="post-content">
      <h2>
        {title} {id}
      </h2>
      <p>{body}</p>
    </div>
  </div>
);

PostCard.propTypes = {
  id: P.number.isRequired,
  cover: P.string.isRequired,
  title: P.string.isRequired,
  body: P.string.isRequired,
};
