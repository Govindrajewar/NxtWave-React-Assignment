import React from "react";
import "../style/FailureView.css";
import listCreationFailure from "../assets/list-creation-failure.png";

function FailureView({ handleRetry }) {
  return (
    <div className="failure-view">
      <img src={listCreationFailure} alt="listCreationFailure" />

      <h1>Something went wrong. Please try again</h1>

      <button className="retry-btn" onClick={handleRetry}>
        Try Again
      </button>
    </div>
  );
}

export default FailureView;
