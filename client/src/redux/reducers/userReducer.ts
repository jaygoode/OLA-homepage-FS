import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Credentials, UserReducerState } from "../../types/user";

const initialState: UserReducerState = {
  userList: [],
  currentUser: {
    _id: "630a1ec68730e0a256ecf8dc",
    firstname: "burnham",
    lastname: "admin",
    email: "admin@gmail.com",
    password: "$2b$10$kBbRpmy2o4FLznWUv9qXLOvGsewlrKmLqLcJxnABHCJlvAOPEO7Li",
    role: "admin",
    goingToEvent: "63063ad92f337a8229cfa2f4",
  },
};

export const getUsers = createAsyncThunk("getUsers", async () => {
  try {
    const data = await fetch("http://localhost:5000/users");
    let result = await data.json();
    return result;
  } catch (error: any) {
    return error.message;
  }
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async (update: Partial<User>) => {
    try {
      console.log(update);
      const response = await fetch(`http://localhost:5000/users/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });
      const result = await response.json();
      return result;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const createUser = createAsyncThunk("createUser", async (user: User) => {
  const { firstname, lastname, email, password, role } = user;
  try {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        password: password,
        email: email,
        role: role,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error: any) {
    return error.message;
  }
});

export const deleteUser = createAsyncThunk("deleteUser", async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    return error.message;
  }
});

export const login = createAsyncThunk(
  "login",
  async (credentials: Credentials) => {
    const { email, password } = credentials;
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      });
      const result = await response.json();
      console.log(result);
      return result;
      // if (result) {
      //   localStorage.setItem("token", result);
      //   const data = await fetch("http://localhost:5000/users", {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   });
      //   const user = await data.json();
      //   return user;
      // }
      // return undefined;
    } catch (error: any) {
      return error.message;
    }
  }
);

const userSlice = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = undefined;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.userList = action.payload;
        return state;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.userList.map((user) => {
          if (user._id === action.payload._id) {
            user = action.payload;
            return user;
          }
          return state;
        });
        if (state.currentUser && state.currentUser._id === action.payload._id) {
          state.currentUser = action.payload;
        }
        return state;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        if (state.currentUser && state.currentUser.role === "customer") {
          state.currentUser = action.payload;
        } else if (state.currentUser && state.currentUser.role === "admin") {
          state.userList.push(action.payload);
        }
        return state;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<User>) => {
        return state;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
        console.log(action.payload);
        return state;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
