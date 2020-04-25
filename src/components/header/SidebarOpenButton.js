import React from "react";
import { connect } from "react-redux";

import { changeSidebarOpenState } from "../../actions/sidebar";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

class SidebarOpenButton extends React.Component {
  render() {
    return (
      <IconButton onClick={this.open} color="inherit">
        <MenuIcon />
      </IconButton>
    );
  }

  open = () => {
    this.props.changeSidebarOpenState(true);
  };
}

export default connect(null, { changeSidebarOpenState })(SidebarOpenButton);
