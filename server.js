import express from "express";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import axios from 'axios'

let app = express();

let schema = buildSchema(`
type Post{
    userId:Int,
    id:Int,
    title:String,
    body:String
}
type User{
name:String,
num:Int,
place:String
}
type Query{
    hello:String,
    welcomeMessage(name:String):String,
    getUser:User,
    getUsers:[User],
    getDataFromJsonPlaceHolder:[Post]
}
`);

let root = {
  hello: () => {
    return "helloooooo";
  },
  welcomeMessage(args) {
    return `${args.name} welcome to graphql`;
  },
  getUser: () => {
    const user = {
      name: "abc",
      num: 123,
      place: "aaaaaaa",
    };
    return user;
  },
  getUsers: () => {
    let users = [
      {
        name: "Rahul",
        num: 123,
        place: "aaaaaaa",
      },
      {
        name: "Shibu",
        num: 456,
        place: "bbbb",
      },
    ];
    return users;
  },
  getDataFromJsonPlaceHolder:async()=>{
    let result=await axios.get('https://jsonplaceholder.typicode.com/posts')
    return result.data
  }
};

app.use(
  "/abc",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);

app.listen(4000, () => console.log("server running on port 4000"));
