import React, {useEffect, useRef, useState} from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router';

/**
 * @author Zetian Huang
 */
interface successProps{
    success:boolean
}

function UpdateSuccess(){
  let navigate = useNavigate();

    const onClick=()=>{
      navigate("/customer/account")
    }


    useEffect(() => {
        return () => {
        };
    }, [])
    const element = (
    <div>
      <Result
        status="success"
        title="Successfully updated Password!"
        subTitle="waiting for redirection"
        extra={[
          <Button type="primary" key="console" onClick={onClick}>
            Go back
          </Button>,
          ]}/>
      </div>)
      return element
}

export default UpdateSuccess;

