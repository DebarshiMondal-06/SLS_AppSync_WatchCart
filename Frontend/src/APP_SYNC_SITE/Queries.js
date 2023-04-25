import { gql } from "@apollo/client";

export const LOAD_WATCHES = gql`
{
  getWatches {
    watches {
      watch_id,
      name,
      brand,
      price,
    }
  }
}`;

export const LOAD_ONE_WATCH = gql`
query LoadOne($watch_id: Int!){
  getWatch(watch_id: $watch_id){
    name
    price
    category
    description
    brand
  }
}`;

export const LOAD_BY_CATEGORY = gql`
query LoadbyCategory($category : String!){
	getByCategory(category: $category){
        brand,
        name,
        description
        watch_id
    }
}`;

export const LOAD_USER_CART = gql`
query loadUserCart($user_id: String!){
  getUserOrders(user_id: $user_id){
    carts {
      count
      price
      watch_id
    }
  }
}`;

export const LOAD_SPECEIFIC_COUNT = gql`
mutation speceficCount($user_id: String!, $watch_id: Int!){
  getUserWatchCount(user_id: $user_id, watch_id: $watch_id){
      count,
  }
}`;

export const ADD_TO_CART = gql`
mutation addCart($user_id: String!, $watch_id: Int!, $count: Int!){
	addCart(user_id: $user_id, watch_id: $watch_id, count: $count){
      count
    }
}`;

export const LOGIN_USER = gql`
mutation loginUser($email: String!){
	getUser(email: $email){
      email
    }
}`;