import React from "react";

type ListProps = {
  token: string;
};
const List: React.FC<ListProps> = ({ token }) => {
  return (
    <div>
      <div>List of the items</div>
    </div>
  );
};

export default List;
