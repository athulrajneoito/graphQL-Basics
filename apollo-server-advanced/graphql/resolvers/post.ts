


export const post = {
    Query: {
        getAllPosts: (_parent:any,_args:any,{Post}:any) => {
            return Post.find({});
        },
    },
    Mutation:{
        createNewPost:async(_parent:any , {newPost}:any,{Post}:any)=>{
            
            const result = await Post.create(newPost);
            return result;
        }
    }
}