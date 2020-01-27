import React, { Fragment, useState } from "react";
import { useBranch } from "baobab-react/hooks";
import { Modal, ClickAwayListener } from "@material-ui/core";

import * as access from "plugins/access";

import Center from "plugins/Layouts/Center";
import Row from "plugins/Layouts/Row";
import Column from "plugins/Layouts/Column";
import Label from "plugins/tools/Label";
import IconButton from "plugins/icons/IconButton";

function Menu(params) {
  const { openMenu, dispatch } = useBranch({ openMenu: ["openMenu"] });
  const [focus, setFocus] = useState(null);

  const closeMenu = () => {
    dispatch(tree => {
      tree.set("openMenu", false);
    });
  };

  const renderBack = () => {
    if (!focus) return;
    const btnStyle = { marginLeft: 10, marginTop: 2 };

    return (
      <IconButton
        icon={access.icon("searchBar.back")}
        color={access.color("menu.headerFg")}
        onClick={() => {
          setFocus(null);
        }}
        btnStyle={btnStyle}
      />
    );
  };

  const MenuHeader = () => {

    const label = focus ? access.translate(focus) : access.translate("menu");

    return (
      <Row
        background={access.color("menu.headerBg")}
        color={access.color("menu.headerFg")}
      >
        {renderBack()}
        <Label fontSize={'14px'} >{label.toUpperCase()}</Label>
      </Row>
    );
  };

  const MenuItem = ({ label, onClick }) => {
    return (
      <Row
        menuItem={true}
        style={{ boxShadow: "unset" }}
        background={access.color("menu.bg")}
        onClick={onClick}
      >
        <Label>{label}</Label>
      </Row>
    );
  };

  const renderMainMenu = () => {

    if(focus) return null;

    const handleSave = () => {
      setFocus("save");
    };

    const handleNew = () => {
      setFocus("new");
    };

    const handleOpen = () => {
      setFocus("open");
    };

    const handleRemove = () => {
      setFocus("remove");
    };

    return (
      <Fragment>
        <MenuItem label={access.translate("Save as")} onClick={handleSave} />
        <MenuItem label={access.translate("New project")} onClick={handleNew} />
        <MenuItem
          label={access.translate("Open project")}
          onClick={handleOpen}
        />
        <MenuItem
          label={access.translate("Remove project")}
          onClick={handleRemove}
        />
      </Fragment>
    );
  };

  return (
    <Modal open={openMenu} onEscapeKeyDown={closeMenu}>
      <Center>
        <ClickAwayListener onClickAway={closeMenu}>
          <Column
            background={access.color("menu.headerBg")}
            width={"300px"}
            height={"250px"}
            style={{ borderRadius: 4, boxShadow: "unset" }}
          >
            <MenuHeader />
            {renderMainMenu()}
          </Column>
        </ClickAwayListener>
      </Center>
    </Modal>
  );
}

export default Menu;
