import React from "react"
import { connect } from "react-redux"
import { fetchOrder } from "../store/auth"


export class Order extends React.Component {
    componentDidMount() {
        this.props.getOrder()
    }

    render() {
        const order = this.props.order

        return order ? (
            <div>
                <ul>

                </ul>

            </div>
        )
    }
}

const mapState = (state) => {
    return { order: state.order };
  };
  
  const mapDispatch = (dispatch, { history }) => {
    return {
      getOrder: () => dispatch(fetchOrder(),
    };
  };
  
  export default connect(mapState, mapDispatch)(Order);
