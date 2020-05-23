// React
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { getUsers } from "../../../../store/actions/userActions";

// Components
import Auxiliary from "../../../../components/HigherOrder/Auxiliary";
import Spinner from "../../../../components/Spinner/Spinner";
import UserCard from "../../../../components/Cards/UserCard";
import Review from "../../../../components/Forms/Review";
import InputGroup from "../../../../components/Inputs/InputGroup";
import SelectGroup from "../../../../components/Inputs/SelectGroup";

// Page to filter and manage site users
class ManageUsers extends Component {
  state = {
    users: null,
    filteredUsers: null,
    userFilter: "",
    roleFilter: "",
    pages: "",
    currentPage: 1,
  };

  async componentDidMount() {
    // If role is not admin or lead-guide, push them to their settings page
    const { role } = this.props.auth.user;
    if (role === "user" || role === "guide") {
      this.props.history.push("/account/settings");
    } else if (role === "admin" || role === "lead-guide") {
      // Add users to global state
      await this.props.getUsers();
      this.setState({
        users: this.props.users.users,
        filteredUsers: this.props.users.users,
        pages: Math.ceil(this.props.users.users.length / 10),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // If deleted a user, make sure to update in state
    if (this.props.users.users) {
      if (this.props.users.users.length !== nextProps.users.users.length) {
        this.setState({
          users: nextProps.users.users,
          filteredUsers: nextProps.users.users,
          pages: Math.ceil(nextProps.users.users.length / 10),
        });
      }
    }
  }

  // Handling user filters
  componentDidUpdate(prevProps, prevState) {
    const { users, userFilter, roleFilter } = this.state;
    const filterName = userFilter.toLowerCase();

    if (
      userFilter !== prevState.userFilter ||
      roleFilter !== prevState.roleFilter
    ) {
      // eslint-disable-next-line
      const filteredUsers = users.filter((user) => {
        const userName = user.name.toLowerCase();
        if (userFilter && roleFilter) {
          if (userName.startsWith(filterName) && user.role === roleFilter) {
            return user;
          }
        } else if (userFilter) {
          if (userName.startsWith(filterName)) {
            return user;
          }
        } else if (roleFilter) {
          if (user.role === roleFilter) {
            return user;
          }
        } else {
          return user;
        }
      });

      this.setState({
        filteredUsers: filteredUsers,
        pages: Math.ceil(filteredUsers.length / 10),
        currentPage: 1,
      });
    }
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { filteredUsers } = this.state;

    const { loading } = this.props.users;
    let users, content;
    let pageNumbers = [];

    if (loading || !filteredUsers) content = <Spinner />;
    else {
      // eslint-disable-next-line
      const filteredPageUsers = filteredUsers.filter((user, index) => {
        if (
          index < this.state.currentPage * 10 &&
          index >= this.state.currentPage * 10 - 10
        ) {
          return Review;
        }
      });

      users = filteredPageUsers.map((user) => {
        return (
          <UserCard
            key={user._id}
            cardClassName="users__card--border users__card--wider"
            imageURL={require(`../../../../assets/images/users/${user.photo}`)}
            name={user.name}
            email={user.email}
            role={user.role}
            userId={user._id}
            page="manageUsers"
          />
        );
      });

      for (let i = 1; i <= this.state.pages; i++) {
        pageNumbers.push(
          <p key={i} onClick={() => this.setState({ currentPage: i })}>
            {i}
          </p>
        );
      }

      content = (
        <Auxiliary>
          <div className="user-filter">
            <p>Filter users by:</p>
            <InputGroup
              type="text"
              name="userFilter"
              id="userFilter"
              placeholder="Name"
              value={this.state.userFilter}
              onChange={(e) => this.onChange(e)}
            />
            <SelectGroup
              name="roleFilter"
              options={[
                { value: "", label: "Role" },
                { value: "user", label: "User" },
                { value: "guide", label: "Guide" },
                { value: "lead-guide", label: "Lead guide" },
                { value: "admin", label: "Admin" },
              ]}
              id="roleFilter"
              value={this.state.roleFilter}
              onChange={(e) => this.onChange(e)}
            />
          </div>
          <div className="user-grid ma-bt-lg">{users}</div>
          {this.state.pages ? (
            <div className="page-numbers">{pageNumbers}</div>
          ) : null}
        </Auxiliary>
      );
    }

    return content;
  }
}

ManageUsers.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, { getUsers })(withRouter(ManageUsers));
