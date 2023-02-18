import React from "react";

export default function Furniture(props: any) {
  return (
    <div>
      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        htmlFor=""
      >
        <div>Height (CM)</div>
        <div>
          <input onChange={props.handleWrite} className="height" id="height" />
        </div>
      </label>
      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        htmlFor=""
      >
        <div>Width (CM)</div>
        <div>
          <input onChange={props.handleWrite} className="width" id="width" />
        </div>
      </label>
      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        htmlFor=""
      >
        <div>Length (CM)</div>
        <div>
          <input onChange={props.handleWrite} className="length" id="length" />
        </div>
      </label>
    </div>
  );
}
