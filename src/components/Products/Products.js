import React from "react";
import { connect } from "react-redux";
import { load } from "../../localStorage";
import { verRequest, logout } from "../../modules/Auth/actions";
import { getIsAuthorized } from "../../modules/Auth/auth";
import Category from "../Category";
import { DropdownComponent } from "../DropdownComponent";
import {
  channelsRequest,
  categoriesRequest,
  aspectsRequest,
  clearSublevel
} from "../../modules/Marketplace/actions";
import {
  getMarketplaceChannels,
  getMarketplaceError,
  getMarketplaceResults,
  getAspects
} from "../../modules/Marketplace/marketplace";
import styles from "./Products.module.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Input,
  Label,
  Button
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const MapStateToProps = state => ({
  aspects: getAspects(state),
  searchResults: getMarketplaceResults(state),
  channels: getMarketplaceChannels(state),
  isAuthorized: getIsAuthorized(state),
  error: getMarketplaceError(state)
});

const MapDispatchToProps = {
  verRequest,
  channelsRequest,
  categoriesRequest,
  aspectsRequest,
  logout,
  clearSublevel
};

class Products extends React.Component {
  state = {
    dropdownIsOpen: false
  };

  componentDidMount() {
    if (load("access" !== null)) this.props.verRequest();
    this.props.channelsRequest();
  }

  toggle = () => {
    const { dropdownIsOpen } = this.state;
    this.setState({
      dropdownIsOpen: !this.state.dropdownIsOpen
    });
  };

  logout = () => {
    const { logout } = this.props;
    localStorage.removeItem("access");
    logout();
  };

  getCategories = data => {
    const { clearSublevel, categoriesRequest } = this.props;
    clearSublevel(data.level);
    categoriesRequest({
      level: data.level,
      channel_id: data.id,
      parent_id: data.parent_id
    });
  };

  getProductInfo = data => {
    const { aspectsRequest } = this.props;
    if (data.is_leaf) {
      aspectsRequest(data.id);
    } else {
      const searchFilter = {
        level: data.level + 1,
        parent_id: data.category_id
      };
      this.getCategories(searchFilter);
    }
  };

  render() {
    const { channels, searchResults, aspects } = this.props;
    const { dropdownIsOpen } = this.state;
    return (
      <>
        <Button className={styles.button} onClick={this.logout}>
          Logout
        </Button>
        <Dropdown isOpen={dropdownIsOpen} toggle={this.toggle}>
          <DropdownToggle className={styles.button} caret>
            Channels
          </DropdownToggle>
          <DropdownMenu>
            {channels &&
              channels.map((item, index) => (
                <DropdownComponent
                  data={Object.assign(item, {
                    parent_id: 0,
                    level: 1
                  })}
                  key={index}
                  getCategories={this.getCategories}
                />
              ))}
          </DropdownMenu>
        </Dropdown>
        <>
          <div className={styles.searchResultWindow}>
            {searchResults.length > 0 &&
              searchResults.map((item, index) => (
                <Category
                  key={index}
                  list={item}
                  getProductInfo={this.getProductInfo}
                />
              ))}
          </div>
        </>
        <>
          {aspects.length > 0 && (
            <div className={styles.aspectsWindow}>
              {aspects &&
                aspects.map((item, index) => (
                  <div key={index} className={styles.input}>
                    <Label>
                      <b>{item.localizedAspectName}</b>
                    </Label>
                    {item.aspectMode === "SELECTION_ONLY" ? (
                      <Input type="select">
                        {item.aspectValues &&
                          item.aspectValues.map((item, index) => (
                            <React.Fragment key={index}>
                              <option>{item}</option>
                            </React.Fragment>
                          ))}
                      </Input>
                    ) : (
                      <Input placeholder={item.localizedAspectName} />
                    )}
                  </div>
                ))}
            </div>
          )}
        </>
      </>
    );
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(Products);
