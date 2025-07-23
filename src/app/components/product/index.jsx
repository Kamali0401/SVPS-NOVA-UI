
import {Button,FloatingLabel,
Table} from 'react-bootstrap';
import React, { useEffect,useState } from "react";
import './styles.css';
import { BsFillBagPlusFill } from "react-icons/bs";
import { useNavigate  } from "react-router-dom";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
// redux mapping
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, productsSelector,SetCurrentItem } from "../../redux/slices/productSlice";
//import CategoryTree from '../category'

const ItemsPage = () => {
  
  // set up dispatch
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  console.log(productsSelector)
  const [sidebarOpen, setsidebarOpen] = useState(isMobile ? false : true);

  const onSetSidebarOpen = () => {
  
    setsidebarOpen(!sidebarOpen);
  }
  // hook to fetch items
  useEffect(() => {
    dispatch(fetchProducts("Sarees",''));
   }, [dispatch]);
  // fetch data from our store
  const { loading, error, productList } = useSelector(productsSelector);
  const  goToProductDetails=(index) => {
    console.log("product index" ,index)
         dispatch(SetCurrentItem(index)).then(
         navigate('/ProductDetails', { state: { id: index, color: 'green' } }));
  }


  const arrayChunk = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    return chunks;
  };
  // render the items
  const renderItems = () => {



    // loading state
    if (loading) return <strong>Loading please wait...</strong>;
    
    // error state
    if (error) return <strong>Items not available at this time</strong>;
    
    console.log(productList)
    // regular data workflow
     return (
      productList ? 

      <div  className="Container">
     <div className='row_cell_temp'>
     <div className='col-lg-8 col-xs-12 col-centered'>
     <Button  onClick={onSetSidebarOpen} title="Hit me to hide myself!">CATEGORIES</Button>
       <div id="demo" className={"collapse" + (sidebarOpen ? '.in' : '')}>
     
     </div>
       </div>
     <div className='row_cell_temp'>
    

      <div  className="Container">

     {arrayChunk( productList, 3).map((row, i) => (

         <div key={i} className="row row-cols-4"> 

          {row.map((col, i) => (
              <div className="col border-dark">
            
              < img 
                src={"data:image/png;base64," +
                col.photo
                 }
                 className="img-fluid" alt="Responsive image"
                 onClick={()=>goToProductDetails(productList.indexOf(col))}
                 />

                 <FloatingLabel   className="description">{col.productDescription}</FloatingLabel>
                 <FloatingLabel  className="description">Price : <span>&#8377;</span>{col.productRate}</FloatingLabel>
                 <FloatingLabel  className="description">Offer Price : <span>&#8377;</span>{col.productDiscountedRate }</FloatingLabel>
                 <div >
                 {/* disabled={!i.isAddEnabled} */}
                 
                 <Button onClick={()=>goToProductDetails(productList.indexOf(col))}   >
                 

                Buy Now
                               
                 </Button>
               

                      </div>
                  </div>
          ))}
           </div>
      ) )}
    </div>
    </div>
    </div>
    </div>
    :<strong>no data</strong>);
  };

  // template
  return (
    // onWheel={()=> {dispatch(fetchProducts("Sarees"));}}
    <div  >
     
  <br></br>
      <ul>{ renderItems()}</ul>
    </div>
  );
};

export default ItemsPage;
























// import React, { Component,Fragment } from 'react';
// // import { Button,Text,Image,div,FlatList,KeyboardAvoidingdiv,Scrolldiv,TouchableOpacity, Alert  } from 'react-native';
// import { connect } from 'react-redux';
// import styles from './styles';

// // import Icon from "react-native-vector-icons/Feather";

// //import Icon from 'react-native-vector-icons'
// // import {AddToCart,
// //   UpdateCart,
// //   GetLookUp,
// //   setselectedUnit
// // } from '../../redux/product/actions';




// class Product extends Component {
//   constructor(props){
//       super(props);
    
//       this.state={
//         productCode:this.props.thisproduct.productCode,
//         productId: this.props.thisproduct.productId,
//         productDesc: this.props.thisproduct.productDesc,
//         metricId:  this.props.thisproduct.metricId,
//         price: this.props.thisproduct.price,
//         offerPrice:  this.props.thisproduct.offerPrice===0?this.props.thisproduct.price:  this.props.thisproduct.offerPrice,
//         unit:'',
//         isAddEnabled:false,
//         photo:'data:image/jpeg;base64,${'+ this.props.thisproduct.photo +'}',
//         Quantity:1,
//         totalItemPrice:10,
//         selectedItems: [
//           {
//             id: 1,
//             name: '50kg',
//           }
//         ],
//         defaultUnit:0,
//         CartList:[],
//         isItemAdded:false,
//         APIUnits:[],
//         MatricDesc:'',
//       }
//   }
//      filteredArray=(arr, value)=> {
//       var newArray = [];
      
//       arr.forEach(function(o){
//         if (o.eaaDetailsId.toString() === value.toString())
//         {
//             console.log(o.vendorName)
//             newArray.push(o);
//          }
//         } );
       
//       return newArray? newArray[0] : null; // or undefined
    
    
//     }
//   _listEmptyComponent = () => {
//     return (
//         <div>
//             <Text>oops!!!</Text>
//         </div>
//     )
// }
// onAddItemtoCart = () =>{
  
//   const {
//         productCode,productId,
//         productDesc, metricId,
//         price,offerPrice,
//         unit,Quantity,totalItemPrice} = this.state

//         // Alert.alert( productCode+"--" +productId+"--" +
//         //   productDesc+"--" + metricId+"--" +
//         //   price+"--" +offerPrice,
//         //   unit+"--" +Quantity+"--" +totalItemPrice);
//         if(this.props.CartList.length==0 )
//         {

//           console.log('am here in if ')
//         let CartProductModel={
//            productCode:productCode,
//            productId:productId,
//            productDesc:productDesc,
//            metricId:metricId,
//            price:price,
//            offerPrice:offerPrice,
//            unit:unit, 
//            Quantity:Quantity,
//            totalItemPrice:(Quantity*offerPrice),
//            ProductQty:Quantity,
//            ProductRate:offerPrice,
//         }
//         const newArray = [];
//         newArray.push(CartProductModel);
//         console.log('added first item ')
//         console.log( newArray)
//         this.props.AddToCart(newArray);
//         this.setState({
//           isItemAdded: true,
//         })

//       }
//       else{
       
//         let CartProductModel={
//           productCode:productCode,
//           productId:productId,
//           productDesc:productDesc,
//           metricId:metricId,
//           price:price,
//           offerPrice:offerPrice,
//           unit:unit,
//           Quantity:Quantity,
//           totalItemPrice:(Quantity*offerPrice),
//           ProductQty:Quantity,
//           ProductRate:offerPrice,
//        }
//  console.log( this.state.Quantity);  
//        console.log( CartProductModel);  
//        const newArray = [];
//       this.props.CartList.forEach(obj => {
//          if (obj.productId !== productId) {
//           console.log( obj.productId + '= ' + productId);  
//            newArray.push(obj )
//          }
    
//        });

//    if(this.state.Quantity!==0){
//       newArray.push(CartProductModel);
//       this.setState({
//         isItemAdded: true,
//       })
//     }
//     else{
//       this.setState({
//         isItemAdded: false,
//       })
//     }
    
//     this.props.UpdateCart(newArray);

//     console.log( 'the length '+this.props.CartList.length);  
    
//       }

// }  
// onIncrement = () => {
//   this.setState((state) => {
//     return {Quantity: state.Quantity + 1,totalItemPrice:(state.Quantity*state.offerPrice) };
//   });
//   this.setState((state) => {
//     return {totalItemPrice:(state.Quantity * state.offerPrice)};
//   });
//  this.onAddItemtoCart();
// };
// onDecrement = () => {
//   this.setState((state) => {
//     return { Quantity:state.Quantity!==1? state.Quantity - 1:1};
//   });
//   this.setState((state) => {
//     return {totalItemPrice:(state.Quantity * state.offerPrice)};
//   });
//   if(this.state.Quantity===0)
//   {
    
    
//   }
//   this.onAddItemtoCart();
// };
// CalculatePrice=(name)  =>{

//   let amount=0;
//   let price=this.props.thisproduct.offerPrice===0?this.props.thisproduct.price:this.props.thisproduct.offerPrice
//   switch(name) {
 
//     case "50gm":
//     amount =Number( (price /1000)*50    )
//       break;
//     case "100gm":
//       amount =Number( (price /1000)*100    )
//       break;
//     case "250gm":
//       amount =Number( (price /1000)*250    )
//       break;
//     case "500gm":
//       amount =Number( (price /1000)*500    )
//     break;
//     case "1kg":
//       amount =Number( price    )
//       break;
//       case "2kg":
//         amount =  Number( price*2    )
//         break;
//         case "5kg":
//           amount =  Number( price*5    )
//           break; 
//           case "10kg":
//             amount =  Number( price*10   )
//           break;
//           case "50Ml":
//             amount =Number( (price /1000)*50    )
//             break;
//             case "100Ml":
//               amount =Number( (price /1000)*100    )
//               break;
//               case "250Ml":
//                 amount =Number( (price /1000)*250    )
//                 break;
//                 case "500Ml":
//                   amount =Number( (price /1000)*500   )
//                   break;
//                   case "1ltr":
//                     amount =Number( price    )
//                     break;
//                     case "2ltr":
//                       amount =Number( price *2  )
//                       break;
//                       case "5ltr":
//                         amount =Number( price * 5  )
//                         break;
//                         case "1Nos":
//                           amount =Number( price  )
//                           break;
//                           case "2Nos":
//                             amount =Number( price *2 )
//                             break;
//                             case "4Nos":
//                               amount =Number( price *4 )
//                               break;
//                               case "12Nos":
//                                 amount =Number( price *12 )
//                                 break;

                       
//     default:
//       amount =Number( price )


//   }

//   this.setState((state)=>{
//       return{
//         offerPrice:amount
//       }
//   })
  
// } 

// onBtnPress = () =>{
//   this.props.onLogout();
// }  
// componentDidMount() {
//   const {productId,metricId}=this.state
//   if (this.props.CartList!==undefined)
//   {
//     this.props.CartList.forEach(obj => {
//       if (obj.productId === productId) {
       
//        this.setState((state) => {
//         return {Quantity:obj.Quantity};
//       });
//       this.setState((state) => {
//         return {isItemAdded:true};
//       });
//       }
 
//     });
   
//   }

//   if (metricId!==0)
//   {
//     let matricunits =[];
//   this.props.APIUnits.map(item => {
//       if(item.lookUpKey.toString()===metricId.toString())     
//       {
   
//       matricunits.push({
//               id:item.lookUpId,
//               name:item.lookUpValue
//            } )
//           }
//             })
         

//             console.log(matricunits)
//     this.setState((state)=>{
//       return {APIUnits: matricunits}
//     })
// let desc=''
//     switch(metricId) {
 
//       case 1:
//         desc ='Kg'
//         break;
//         case 4:
//           desc ='Box'
//           break;
//           case 5:
//             desc ='Nos'
//             break;  
//             case 6:
//             desc ='Ltr'
//             break;          
//         default:
//           desc ='Kg'
//     }
//     this.setState((state)=>{
//       return {MatricDesc: desc}
//     })

//         };
    

// }
// render() {
//   const{isItemAdded} = this.state
//   return (
       
//      <div  className={flProductContainer}>
//     {/* <Product productid={id} itemname={itemname} price={price} offerprice ={offerprice}/> */}


//     <SafeAreadiv>
//         <div className={row}>
//    <div className={row_cell_temp}>
//         < Image 
//            source={{
//             uri: this.state.photo
//           }}
//             // indicator={ProgressBar} 
//              indicatorProps={{
//                size: 80,
//                borderWidth: 0,
//                borderRadius:40,
//                color: 'rgba(150, 150, 150, 1)',
//                unfilledColor: 'rgba(200, 200, 200, 0.2)'
//             }}
//                className={{
//                 width: 110, 
//                   height: 110, 
//                   borderRadius:110/2,
//                     alignItems: 'center',
//                     margin: 5,
//                     justifyContent: 'center',
//             }}
//             />
//             </div>
//             <div className={row_cell_temp}>
//                  <Text  className={productnameTiny}>{this.state.productDesc}</Text>
//                  <Fragment>
//                {/* <Scrolldiv  className={scrolldiv}> */}
//                         <SearchableDropdown
//                             // multi={true}
//                             selectedItems={this.state.selectedItems}
//                             onItemSelect={(item) => {
//                            const items = this.state.selectedItems;
//                             items.push(item)
                           
//                             this.setState({ selectedItems: items });
                           
//                             this.CalculatePrice(item.name);
//                             var index= this.state.APIUnits.findIndex(obj => obj.name=== item.name );
//                             this.setState({ unit: item.name, isAddEnabled:true,defaultUnit:index.toString()});
                            
//                            // this.props.setselectedUnit(index);
                           
//                             }}
//                             containerclassName={{
//                                  padding: 5,
//                                  maxHeight: '80%',
//                                  zindex:-1
//                                  }}
//                             onRemoveItem={(item, index) => {
//                             const units = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                           
//                             }}
//                             itemclassName={{
//                             padding: 10,
//                             marginTop: 2,
//                             backgroundColor: '#ddd',
//                             borderColor: '#bbb',
//                             borderWidth: 1,
//                             borderRadius: 5,
//                             zindex:1
//                             }}
//                             itemTextclassName={{ color: '#222' }}
//                             itemsContainerclassName={{ 
//                                 maxHeight: 80,
//                                 zindex:1,
//                                 marginLeft:60,
//                                 top:25,
//                                 position: 'absolute'
                      
//                              }}
                             
//                             items={this.state.APIUnits}
//                             defaultIndex={2}
//                             chip={true}
//                             resetValue={false}
//                             textInputProps={
//                             {
//                                 placeholder: "Select Quantity",
//                                 underlineColorAndroid: "transparent",
//                                 style: {
//                                     padding: 12,
//                                     borderWidth: 1,
//                                     borderColor: '#ccc',
//                                     borderRadius: 5,
//                                 },
//                                 onTextChange: text => this.setState({ unit: text })
                                
//                             }
//                             }
//                             listProps={
//                             {
//                                 nestedScrollEnabled: true,
//                             }
//                             }
//                         />
//                         </Fragment>
//                 {/* </Scrolldiv> */}
//                  <Text  className={tiny}>Price : {this.state.price.toFixed(2) }/{this.state.MatricDesc}</Text>
//                  <Text  className={offertiny}>OfferPrice : {this.state.offerPrice.toFixed(2)}</Text>
//                  {!isItemAdded?
//                  <div >
//                  <TouchableOpacity onPress={this.onAddItemtoCart}  disabled={!this.state.isAddEnabled} className={myButton}>
//                      <Icon name='plus' size={32} color='#fff' />
                     
//            </TouchableOpacity></div>
//                   // <Button
//                   //   onPress={this.onAddItemtoCart}
//                   //   className={[common, loginfont]}
//                   //   title="Add"
//                   //   />
//                   :
//                     <div>
//                         <TouchableOpacity 
//                           className={floatingButtonMinus}
//                           onPress={this.onDecrement}
//                         >
//                           <Icon name="minus-circle" size={20} color="#00b33c" />
//                         </TouchableOpacity>

//                         <Text className={offertiny}>Quantity: {this.state.Quantity}</Text>
//                         <TouchableOpacity 
//                           className={floatingButton}
//                           onPress={this.onIncrement}
//                         >
//                           <Icon name="plus-circle" size={20} color="#00b33c" />
//                         </TouchableOpacity>
//                         </div>
//                     }


//                       </div>
//                   </div>
                  
//     </SafeAreadiv>
//      </div>
  
  
    
    
   
  
//   // </ImageBackground>
//   );
// }
// }

// // function mapDispatchToProps(dispatch) {
// // return{
// //   navigateToScreenMainStack: (url) => dispatch(navigateToScreenMainStack(url)),
// //   AddToCart:(data)=>dispatch(AddToCart(data)),
// //   UpdateCart:(data)=>dispatch(UpdateCart(data)),
// //   GetLookUp:(data)=>dispatch(GetLookUp(data)),
// //   setselectedUnit:(index)=>dispatch(setselectedUnit(index)),
// //   //onLogout:()=>dispatch(onLogout())
// // }
// // }
// // const mapStateToProps = (state) => {
// // return {
// //   CartList:state.productState.CartList,
// //   APIUnits:state.homeState.APIUnits,
// //   defaultUnit:state.productState.defaultUnit,
// //  };
// // }
// export default connect(null, null)(Product);

