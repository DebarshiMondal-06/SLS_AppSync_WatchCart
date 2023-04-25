import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { createGlobalContext } from './ContextGlobal';
import Spinner from './Spinner';



const WatchSection = () => {
  const { watchData } = useContext(createGlobalContext);
  const { getWatches } = watchData.data || {};

  if (watchData.loading) {
    return <Spinner />
  }

  return (
    <div className="watch-sec">
      <section className="watch-items container">
        {
          getWatches.watches && getWatches.watches.map((items, i) => {
            const getKey = items.watch_id;
            const { name, brand, price } = items;
            return <Link key={i} to={`/watch/${getKey}`} className="card" style={{ width: '20rem' }}>
              <img src={`https://self-project-image-bucket.s3.ap-south-1.amazonaws.com/${name}.jpg`}
                className="home_watch_view card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-capitalize">{brand + ' ' + name}</h5>
                <p className="card-text">${price}</p>
              </div>
            </Link>
          })
        }
      </section>
    </div>
  )
}

export default WatchSection

