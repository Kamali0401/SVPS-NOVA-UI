import { createSlice } from '@reduxjs/toolkit';
import {
    AsyncGet,AsyncPost
 } from '../../services/https';
 
 import {API} from '../../services/endpoints'

export const productSlice = createSlice({
  name: 'productList',
  initialState: {
    loading: false,
    error: false,
    productList: [],
    value:0,
    curIndex:0,
    CartList:[],
    placeOrderSuccess:0,
    Orders:[],
    OrderDetails:[],
    OrderStatus:[],
    additemSuccess:''

  },
  reducers: {
    setLoading: (state) => {
        state.loading = true;
      },
    getProduct:  (state, { payload }) => {
       console.log(payload)
        state.loading = false;
        state.error = false;
        state.productList = payload;

    },
    addToCart: (state) => {
      state.value -= 1
    },
    submitCart: (state, action) => {
      state.value += action.payload
    },
    setError: (state) => {
        state.error = true;
      },
    setCurIndex:(state,{payload}) => {
        state.curIndex = payload;
      },
    AddToCart:(state,{payload}) => {
        state.CartList = payload;
      },
    UpdateCart:(state,{payload}) => {
        state.CartList = payload;
      },
    placeOrder:(state,{payload}) => {
        state.loading = false;
        state.error = false;
        state.placeOrderSuccess = payload;
      },
    getOrder:(state,{payload}) => {
        state.loading = false;
        state.error = false;
        state.Orders = payload;
        state.OrderDetails=[];
        state.OrderStatus=[];
      },
    getOrderDetail:(state,{payload}) => {
        state.loading = false;
        state.error = false;
        state.OrderDetails= payload;
      },
    getOrderStatus:(state,{payload}) => {
        state.loading = false;
        state.error = false;
        state.OrderStatus= payload;
      },
    updateOrderStatus:(state,{payload}) => {
        state.loading = false;
        state.error = false;
        state.OrderStatus= payload
      },
    addNewItem:(state,{payload}) => {
        state.loading = false;
        state.error = false;
        state.additemSuccess= payload
      },
  },

})

// Action creators are generated for each case reducer function
export const { getProduct, addToCart, submitCart,setLoading,setError,setCurIndex,AddToCart,UpdateCart,placeOrder,getOrder,getOrderDetail,getOrderStatus,updateOrderStatus,addNewItem } = productSlice.actions
export const productsSelector = (state => state.products||[]);
export default productSlice.reducer;

export function SetCurrentItem(index) {
  return async (dispatch) => {
      dispatch(setCurIndex(index));
 };
}


export function AddItemToCart(cartList) {
  return async (dispatch) => {
      dispatch(AddToCart(cartList));
 };
}
export function UpdateItemToCart(cartList) {
  return async (dispatch) => {
      dispatch(UpdateCart(cartList));
 };
}
  export function fetchProducts(catDesc,subcateDescVal) {
    var QryString="";
    if (subcateDescVal!="")
    {
      QryString= "CatDesc="+ catDesc+"&SubCatDesc=" +subcateDescVal;
    }
    else 
    {
      QryString= "CatDesc="+ catDesc;
    }

    return async (dispatch) => {
        dispatch(setLoading())
        AsyncGet(API.getProducts+"?"+QryString)
        .then((response) => {
            console.log('response,',response)
            dispatch(getProduct(response.data));
         })
        .catch((er) => {
            console.log('am in error,',er)
          dispatch(setError());
          dispatch(setLoading());
        });
    };
  }
  export function PlaceOrder(data) {
    return async (dispatch) => {
        dispatch(setLoading())
        AsyncPost(API.placeOrder,data)
        .then((response) => {
      
            dispatch(placeOrder(response.data));
            dispatch(UpdateCart([]));
            
         })
        .catch((er) => {
          dispatch(placeOrder(0));
          dispatch(setError());
          dispatch(setLoading());
        });
    };
  }

  export function GetOrders(OrderID,CustomerMobNo) {
    return async (dispatch) => {
        dispatch(setLoading())
        AsyncGet(API.getOrders +"?OrderID="+OrderID +"&UserId=1&CustomerMobNo=" +CustomerMobNo)
        .then((response) => {
             dispatch(getOrder(response.data));
        })
        .catch((er) => {  
          dispatch(setError());
          dispatch(setLoading());
        });
    };
  }
  export function GetOrderDetails( CustomerMobNo,  orderId) {
    return async (dispatch) => {
        dispatch(setLoading())
        AsyncGet(API.getOrderDetails +"?OrderId="+ orderId)
        .then((response) => {
             dispatch(getOrderDetail(response.data));
        })
        .catch((er) => {
          dispatch(setError());
          dispatch(setLoading());
        });
    };
  }
  export function GetOrderStatus(orderId,CustomerMobno) {
    return async (dispatch) => {
        dispatch(setLoading())
        AsyncGet(API.getOrderStatus + "?OrderID="+orderId)
        .then((response) => {
             dispatch(getOrderStatus(response.data));
        })
        .catch((er) => {
           dispatch(setLoading());
        });
    };
  }

  export function UpdateOrderStatus(data) {
    return async (dispatch) => {
        dispatch(setLoading())
        AsyncPost(API.updateOrderStatus,data)
        .then((response) => {
               dispatch(updateOrderStatus(response.data));
        })
        .catch((er) => {
          dispatch(setError());
          dispatch(setLoading());
        });
    };
  }

  export function AddProduct(data) {
    console.log("itemdata",data)
    return async (dispatch) => {
        dispatch(setLoading())
        AsyncPost(API.addproduct,data)
        .then((response) => {
               dispatch(addNewItem(response.data));
        })
        .catch((er) => {
          dispatch(setError());
          dispatch(setLoading());
        });
    };
  }