import { useQuery } from '@apollo/client';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { LOAD_BY_CATEGORY } from './Queries';
import Spinner from './Spinner';



const RelatedCategory = ({ category,id }) => {
  const history = useHistory();

  const { loading, data } = useQuery(LOAD_BY_CATEGORY, { variables: { category } });
  const on_click = (id) => {
    history.push(`/watch/${id}`);
  }

  
  if (loading) {
    return <Spinner />
  }
  var filterData = [];
  filterData = data && data.getByCategory.filter((item) => {
    return item.watch_id !== (id * 1);
  });


  return (
    <div className="category-main">
      {
        filterData && filterData.map((item, i) => {
          const { name, brand, description } = item;
          return <section key={i} className="category">
            <h4> {brand} {name}</h4>
            <article className="text-center p-4">
              <p style={{ height: '120px' }}>{description.substring(0, 80) + '...'}</p>
              <button onClick={() => on_click(item.watch_id)} className="btn">View</button>
            </article>
          </section>
        })
      }
      {
        filterData && filterData.length <= 0 ? <center className="w-100">
          <h3>Coming Soon...</h3>
        </center> : null
      }
    </div>
  )
}

export default RelatedCategory
