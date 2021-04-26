import React from "React"
// popular to use underscore
import _ from "lodash"

const Pagination = (props) => {
  const { itemsCount, pageSize } = props

  const pagesCount = itemsCount / pageSize
  // array of [1....pagesCount].map
  const pages =  _.range(1, pagesCount + 1)

    return (

    <nav aria-label="page-navigation">
  <ul className="pagination">
    {pages.map(page => {

      return (
      <li key={page} className="page-item">
        <a className="page-link" href="#">{page}</a>
      </li>
      )
    })}

  </ul>
</nav>


    )


}


export default Pagination;