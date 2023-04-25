/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { Button, Modal } from 'react-bootstrap';
import { LOGIN_USER } from './Queries';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';



const Modall = ({ show, setShow }) => {
  const [, setCookie] = useCookies();
  const [loginUser] = useMutation(LOGIN_USER);
  const [inputs, setInputs] = useState('');
  const [checkValid, setCheckValid] = useState(false);
  const [btnDis, setBtnDis] = useState(false);
  var regex = /\S+@\S+\.\S+/;



  const submit = () => {
    if (!inputs || !regex.test(inputs)) {
      return setCheckValid(true);
    }
    loginUser({
      variables: {
        email: inputs,
      },
    }).then((el) => {
      if (el.data && el.data.getUser) {
        const { email } = el.data.getUser;
        setCookie('authToken', email, { path: '/' });
        toast.success('Logined Successfully!');
        if (show) {
          setTimeout(() => {
            setShow(false);
          }, 1000);
        }
      } else {
        setBtnDis(true);
        toast.error('Login Failed! try again');
      }
    });
  }



  useEffect(() => {
    if (btnDis) setBtnDis(false);
    if (inputs && !regex.test(inputs)) {
      setCheckValid(true);
    }
    else {
      setCheckValid(false);
    }
  }, [inputs]);





  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Login here</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b className="lead">Please authenticate in order to process!</b>
        <article className="modal-body mt-2">
          <div className="">
            <label>Type Email</label>
            <input
              value={inputs}
              onChange={(e) => setInputs(e.target.value)}
              type="email"
              className="form-control"
              style={{ borderColor: checkValid ? 'red' : 'gainsboro' }}
            />
          </div>
          <p className="font-weight-bold">Demo User: demo@mail.com</p>
        </article>
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ padding: '5px 20px' }} variant="danger" type="button" onClick={() => setShow(false)}>
          <i className="fas fa-times fa-2x"></i>
        </Button>
        <Button disabled={btnDis} variant="primary" style={{ padding: '5px 15px' }} type="button" onClick={() => submit()}>
          <i className="fas fa-check fa-2x"></i></Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modall
