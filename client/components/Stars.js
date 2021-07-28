import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import star from '../public/starr.png';
import dynamic from 'next/dynamic';
import ModalData from '../components/ModalData';

const Stars = (props) => {

const [starData, setData] = useState('');
const [showData, setShowData] = useState(false);

function onClick(starData){
  setData(starData);
  setShowData(true);
}

const starArr= [];
for(let i = 0; i < props.dbData.length; i++) {
  starArr.push(<Image onClick={()=> onClick(props.dbData[i])} key={i} id='star-child' width={50} height={50} src={star}></Image>)
}
  return (
    <div className='star-container'>
       {starArr}
       {showData ? <ModalData setShowData={setShowData} starData={starData}/> : ''}
    </div>
  )
}

export default Stars
