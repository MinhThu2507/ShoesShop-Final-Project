import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  productList: [],
  totalQuantity: 0,
  totalAmount: 0,
  productCart: [],
  productDetail: []
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProductsByCategoryAction: (state, action) => {
      state.productList = action.payload;
    },
    getAllProductsAction: (state, action) => {
      state.productList = action.payload;
    },
    getProductByIdAction: (state, action) => {
        state.productDetail = action.payload;
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      // kiểm tra xem trong giỏ hàng đã có sản phẩm chưa
      const existingItem = state.productCart.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      // Nếu chưa: => thêm sản phẩm vào giỏ hàng
      if (!existingItem) {
        state.productCart.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        
        // Nếu đã có sản phẩm: => tăng số lượng lên, đồng thời tính lại tổng giá tiền = tiền đã có + số tiền mới
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      // Tính tổng tiền các sản phẩm trong giỏ hàng
      state.totalAmount = state.productCart.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      )
    },
    removeItem: (state, action)  =>{
      const id = action.payload;
      // Tìm sản phẩm muốn xoá
      const existingItem = state.productCart.find((item) => item.id === id);
      state.totalQuantity--;

      // Kiểm tra số lượng chỉ còn 1 sản phẩm 
      if (existingItem.quantity === 1) {
        // Xoá khỏi mảng productCart
        state.productCart = state.productCart.filter((item) => item.id !== id);
      } else {
        // còn hơn 1 sản phẩm thì giảm số lượng xuống đồng thời cập nhật số tiền mới = tổng tiền đã có - giá sản phẩm
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

       // Tính tổng tiền các sản phẩm trong giỏ hàng sau khi giảm số lượng sản phẩm
      state.totalAmount = state.productCart.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      },
      deleteItem(state, action) {
        const id = action.payload;
        const existingItem = state.productCart.find((item) => item.id === id);
        
        if (existingItem) {
          state.productCart = state.productCart.filter((item) => item.id !== id);
          state.totalQuantity = state.totalQuantity - existingItem.quantity;
        }
  
        state.totalAmount = state.productCart.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
      }

  },
});

export const { getAllProductsByCategoryAction, getAllProductsAction, deleteItem, addItem, removeItem, getProductByIdAction } =
  productReducer.actions;

export default productReducer.reducer;

// async action
export const getAllProductsApi = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });
      dispatch(getAllProductsAction(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllProductsByCategoryApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${id}`,
        method: "GET",
      });

      dispatch(getAllProductsByCategoryAction(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductById = id => {
  return async (dispatch) => {
    try {
        const result = await axios ({
          url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
          method: "GET"
        })
        dispatch(getProductByIdAction(result.data.content))
    } catch (error) {
      console.log(error)
    }
  }
}
