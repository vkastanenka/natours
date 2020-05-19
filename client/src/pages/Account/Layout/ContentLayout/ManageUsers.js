// React
import React, { Component } from "react";
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

class ManageUsers extends Component {
  state = {
    users: null,
    filteredUsers: null,
    userFilter: "",
    roleFilter: "",
    activeFilter: "",
    pages: "",
    currentPage: 1,
  };

  async componentDidMount() {
    await this.props.getUsers();
    this.setState({
      users: this.props.users.users,
      filteredUsers: this.props.users.users,
      pages: Math.ceil(this.props.users.users.length / 10),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let { activeFilter } = this.state;
    const { users, userFilter, roleFilter } = this.state;
    const filterName = userFilter.toLowerCase();

    if (
      userFilter !== prevState.userFilter ||
      roleFilter !== prevState.roleFilter ||
      activeFilter !== prevState.activeFilter
    ) {
      const filteredUsers = users.filter((user) => {
        const userName = user.name.toLowerCase();
        if (userFilter && roleFilter && activeFilter === "true") {
          if (
            userName === filterName &&
            user.role === roleFilter &&
            user.active
          ) {
            return user;
          }
        } else if (userFilter && roleFilter && activeFilter === "false") {
          if (
            userName.startsWith(filterName) &&
            user.role === roleFilter &&
            !user.active
          ) {
            return user;
          }
        } else if (userFilter && roleFilter) {
          if (userName.startsWith(filterName) && user.role === roleFilter) {
            return user;
          }
        } else if (userFilter && activeFilter === "true") {
          if (userName.startsWith(filterName) && user.active) {
            return user;
          }
        } else if (userFilter && activeFilter === "false") {
          if (userName.startsWith(filterName) && !user.active) {
            return user;
          }
        } else if (roleFilter && activeFilter === "true") {
          if (user.role === roleFilter && user.active) {
            return user;
          }
        } else if (roleFilter && activeFilter === "false") {
          if (user.role === roleFilter && !user.active) {
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
        } else if (activeFilter === "true") {
          if (user.active) {
            return user;
          }
        } else if (activeFilter === "false") {
          if (!user.active) {
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
            active={user.active}
            role={user.role}
            userId={user._id}
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
            <SelectGroup
              name="activeFilter"
              options={[
                { value: "", label: "Registration" },
                { value: "true", label: "Active" },
                { value: "false", label: "Inactive" },
              ]}
              id="activeFilter"
              value={this.state.activeFilter}
              onChange={(e) => this.onChange(e)}
            />
          </div>
          <div className="user-grid ma-bt-lg">{users}</div>
          <div className="page-numbers">{pageNumbers}</div>
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

export default connect(mapStateToProps, { getUsers })(ManageUsers);
