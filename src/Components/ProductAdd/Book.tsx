import React from "react";

export default function Book(props: any) {
  return (
    <label
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
      htmlFor=""
    >
      <div>Weight</div>
      <div>
        <input
          id="weight"
          onChange={props.handleWrite}
          type="sku"
          className="weight"
        />
      </div>
    </label>
  );
}
