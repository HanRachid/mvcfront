import React from "react";

export default function DVD(props: any) {
  return (
    <label
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
      htmlFor=""
    >
      <div>Size (MB)</div>
      <div>
        <input
          onChange={props.handleWrite}
          type="sku"
          id="size"
          className="size"
        />
      </div>
    </label>
  );
}
