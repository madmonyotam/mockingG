import React from "react";

import * as access from "plugins/access";

import Row from "plugins/Layouts/Row";
import Label from "plugins/tools/Label";
import IconButton from "plugins/icons/IconButton";

function SearchBar({ label, nested, onBack }) {
  const renderBack = () => {
    if (!nested) return;
    const btnStyle = { marginLeft: 10, marginTop: 2 };

    return (
      <IconButton
        icon={access.icon("searchBar.back")}
        color={access.color("searchBar.fg")}
        onClick={onBack}
        btnStyle={btnStyle}
      />
    );
  };

  return (
    <Row background={access.color("searchBar.bg")}>
      {renderBack()}
      <Label color={access.color("searchBar.fg")}>{label}</Label>
    </Row>
  );
}

export default SearchBar;
