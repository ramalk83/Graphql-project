const graphql=require('graphql');
const _=require('lodash');

var books=
   [ {name:'My Book1',genre:'Science1',id:'1',authid:'1'},
     {name:'My Book2',genre:'Science2',id:'2',authid:'1'},
     {name:'My Book3',genre:'Science3',id:'3',authid:'1'}
]

var authors=
   [ {name:'Author1',age:23,id:'1'},
   {name:'Author2',age:33,id:'2'},
   {name:'Author3',age:43,id:'3'},
]

const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
}= graphql;

//Book type
const BookType=new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            reslove(parent,args){
                return _.find(authors,{id:parent.authid})
            }
        }
    })
})

//Book type
const AuthorType=new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt}
    })
})


//Root query

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
            return _.find(books,{id:args.id})
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
            return _.find(authors,{id:args.id})
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery
})