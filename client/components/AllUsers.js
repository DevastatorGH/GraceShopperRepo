import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users"

export class AllUsers extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const users = this.props.users;
        return (
        <div>
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user.id}>
                            <div>
                                <p>ID: { user.id}</p>
                                <p>USERNAME: { user.username}</p>
                                <p>EMAIL: { user.email}</p>
                                <p>ADMIN: { String(user.isAdmin)}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
        )
    }
}

const mapState = (state) => {
    return { users: state.users };
};

const mapDispatch = (dispatch) => {
    return {
        getUsers: (user) => dispatch(fetchUsers(user))
    };
};

export default connect(mapState, mapDispatch)(AllUsers)