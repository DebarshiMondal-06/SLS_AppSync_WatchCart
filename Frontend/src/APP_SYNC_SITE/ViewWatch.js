/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Spinner from './Spinner';
import { BiArrowBack } from 'react-icons/bi';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TO_CART, LOAD_ONE_WATCH, LOAD_SPECEIFIC_COUNT } from './Queries';
import RelatedCategory from './RelatedCategory';
import OpenModal from './Modal';
import { createGlobalContext } from './ContextGlobal';



const ViewWatch = () => {
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const [cookie] = useCookies();
  const [btn, setBtn] = useState(false);
  const [show, setShow] = useState(false);
  const { refetch, setLoading, loading } = useContext(createGlobalContext);
  var [addUserCartData] = useMutation(ADD_TO_CART);
  var [getUserWatchCount] = useMutation(LOAD_SPECEIFIC_COUNT);
  const { data } = useQuery(LOAD_ONE_WATCH, {
    variables: { watch_id: id },
  });



  // getting User's Specefic Watch Count ***********************************
  const count_specefic = (user, watch) => {
    setLoading(true);
    getUserWatchCount({
      variables: {
        user_id: user,
        watch_id: watch
      }
    }).then((res) => {
      setLoading(false);
      const { getUserWatchCount } = res.data;
      if (getUserWatchCount && getUserWatchCount.count > 0) setValue(getUserWatchCount.count);
      else setValue(0);
    })
  }
  useEffect(() => {
    if (id && cookie.authToken) {
      count_specefic(cookie.authToken, id);
    }
  }, [id, cookie]);



  // Updating User's Cart ***********************************
  useEffect(() => {
    if (btn && value >= 0 && id) {
      update_cart();
    }
  }, [value]);



  if (loading || !data || !data.getWatch) {
    return <Spinner />
  }
  const { brand, name, description, price, category } = data.getWatch;
  let update_cart = () => {
    addUserCartData({
      variables: {
        user_id: cookie && cookie.authToken,
        watch_id: id,
        count: value,
      }
    }).then(() => {
      refetch();
    })
  };
  return <main className="container">
    {show ? <OpenModal show={show} setShow={setShow} /> : null}
    <section className="row" style={{ marginTop: 50 }}>
      <div className="col-md-1">
        <article className="back_btn"> <Link to='/'><BiArrowBack className="fa-long-arrow-alt-left" /></Link></article>
      </div>
      <div className="col-md-5 mt-5">
        <div className="watch_img_card mb-5">
          <img src={`https://self-project-image-bucket.s3.ap-south-1.amazonaws.com/${name}.jpg`}
            className="card-img-top" alt="..." />
        </div>
      </div >
      <div className="col-md-5 watch_desc_section" style={{ marginTop: '10rem' }}>
        <p style={{ fontSize: 20 }}>
          <span className="badge bg-secondary"> {category}</span>
        </p>
        <p>{brand + ' ' + name}</p>
        <h2 className='price'>${price}</h2>
        <article>
          {description}
        </article>
        <section className="quantity">
          <button className="btn" onClick={() => {
            setBtn(true)
            cookie.authToken ? setValue(value <= 0 ? value : value - 1) : setShow(true);
          }}><span className="add">-</span></button>
          <span className="value">&nbsp;&nbsp;{value || 0}&nbsp;&nbsp;</span>
          <button className="btn" onClick={() => {
            cookie.authToken ? setValue(value + 1) : setShow(true);
            setBtn(true);
          }}><span className="sub">+</span></button>
        </section>
      </div>
      <div className="col-md-1"></div>
      <div>
        <h3 style={{ padding: '10px 1px', textDecoration: 'underline' }}>Related Category</h3>
        <RelatedCategory category={category} id={id} />
      </div>
    </section >
  </main>
}

export default ViewWatch
