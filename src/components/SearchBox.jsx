import React from "react";

const SearchBox = ({ value, onChange, onSubmit }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Cari tamu berdasarkan nama atau alamat...."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      onSubmit={e => onSubmit(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
