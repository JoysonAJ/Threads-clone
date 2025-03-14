export type signInType = {
  userName: string;
  email: string;
  password: string;
};


export type logInType = {
    email: string;
    password: string;
  };


  export type UserProfileType = {
    _id: string;
    createdAt: string;
    email: string;
    followers: any[]; // You can replace `any` with a more specific type if necessary
    profilePic: string;
    replies: any[]; // Again, replace `any` with a more specific type if needed
    reposts: any[]; // Replace `any` with a more specific type if necessary
    threads: any[]; // Replace `any` with a more specific type if necessary
    updatedAt: string;
    userName: string;
  };