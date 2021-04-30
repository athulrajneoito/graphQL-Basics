


export const post = {
    Query: {
        getAllPosts: (_parent: any, _args: any, { Post }: any) => Post.find({}),
        getPostId: async (_parent: any, { id }: any, { Post }: any): Promise<any> => await Post.findById(id)
    },
    Mutation: {
        createNewPost: async (_parent: any, { newPost }: any, { Post }: any): Promise<any> => {
            const result = await Post.create(newPost);
            return result;
        },

        editPost: async (_parent: any, { editPost, id }: any, { Post }: any): Promise<any> => {
            const result = await Post.findByIdAndUpdate(id, { ...editPost }, { new: true });
            return result;
        },
        deletePost: async (_parent: any, { id }: any, { Post }: any) => {
            try {
                const deletedPost = await Post.findByIdAndDelete(id);
                return {
                    id: deletedPost.id,
                    message: "Post Removed"
                }
            } catch (error) {
                return {
                    id: id,
                    message: error.message
                }
            }

        }
    }
}