import React, { useEffect,Fragment,useState } from "react";
import './header.css';
const ProductSize = (props) => {
    let intitialSizeObject={
        "XS":false,
        "S":false,
        "M":false,
        "L":false,
        "XL":false,
        "2XL":false,
        "4XL":false,
        "5XL":false,
    }
const [sizetick,setTick]=useState(intitialSizeObject);


const [sizeVal,setSize]=useState(false)
 
 
    
   const setSelectedSize=(size)=>{
    for (var key in sizetick) {
        if (key==size) {
            sizetick[key] =true;
        }
        else{
            sizetick[key] =false;  
        }
      }
      
            setTick(sizetick);
            setSize(size);
            props.setSelectedSize(size);
    }

  
    // render the items
    const renderItems = () => {

       return (
         <div className="flex-mainContainer">

             <div className='circleSize' ><a className ="subtitleTick" onClick={() => setSelectedSize("XS")}>XS</a>{ sizetick["XS"]  && <span className="tbletterT">&#10003;</span>}</div>
             <div className='circleSize'  ><a  className ="subtitleTick" onClick={() =>setSelectedSize("S")}>S</a>{ sizetick["S"]  && <span className="tbletterT">&#10003;</span>}</div>
             <div className='circleSize'  ><a  className ="subtitleTick" onClick={() =>setSelectedSize("M")}>M</a>{ sizetick["M"]  && <span className="tbletterT">&#10003;</span>}</div>
             <div className='circleSize'  ><a  className ="subtitleTick" onClick={() =>setSelectedSize("L")}>L</a>{ sizetick["L"]  && <span className="tbletterT">&#10003;</span>}</div>
             <div className='circleSize'  ><a  className ="subtitleTick" onClick={() =>setSelectedSize("XL")}>XL</a>{ sizetick["XL"]  && <span className="tbletterT">&#10003;</span>}</div>
             <div className='circleSize'  ><a  className ="subtitleTick" onClick={() =>setSelectedSize("2XL")}>2XL</a>{ sizetick["2XL"]  && <span className="tbletterT">&#10003;</span>}</div>
             <div className='circleSize' ><a  className ="subtitleTick" onClick={() =>setSelectedSize("4XL")}>4XL</a>{ sizetick["4XL"]  && <span className="tbletterT">&#10003;</span>}</div>
             <div className='circleSize'  ><a  className ="subtitleTick" onClick={() =>setSelectedSize("5XL")}>5XL</a>{ sizetick["5XL"]  && <span className="tbletterT">&#10003;</span>}</div>

         </div>
       )
     
    };
  
    // template
    return (
        <div  >
         { renderItems()}
      </div>
    );
  };
  
  export default ProductSize;
  
  
  
  
  
  