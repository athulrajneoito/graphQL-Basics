
import { IResolvers } from "graphql-tools";
import { postValidation } from "../../validators";


export const post = {
    Query: {
        /**
         * Get all posts
         * @param _parent 
         * @param _args 
         * @param param2 Context containing Mongoose models and middleware result
         * @returns all Posts popupated by author
         * @author athulraj2002
         */
        getAllPosts: async (_parent: any, _args: any, { Post }: any) => await Post.find({}).populate('author'),


        /**
         * Get a sigle post by Post ID
         * @param _parent 
         * @param param1 id of the post
         * @param param2 Context containing Mongoose models and middleware result
         * @returns a single requested post 
         * @author athulraj2002
         */
        getPostId: async (_parent: any, { id }: any, { Post }: any): Promise<any> => await Post.findById(id)
    },

    Mutation: {
        /**
         * To create new Post
         * @param _parent 
         * @param param1 new Post data
         * @param param2 Context containing Mongoose models and middleware result
         * @returns new post created
         * @author athulraj2002
         */
        createNewPost: async (_parent: any, { newPost }: any, { Post, user }: any): Promise<any> => {
            await postValidation.validate(newPost, { abortEarly: false });
            try {
                const result = await Post.create({ ...newPost, author: user._id });
                await result.populate('author').execPopulate();
                return result;
            } catch (error) {
                throw new Error(error);
            }

        },

        /**
         * To edit a post
         * @param _parent 
         * @param param1 editPost->the data to be edited
         *               id-> the ID of the post to be edited
         * @param param2 Context containing Mongoose models and middleware result
         * @returns Edited post
         * @author athulraj2002
         */
        editPost: async (_parent: any, { editPost, id }: any, { Post }: any): Promise<any> => {
            try {
                const result = await Post.findByIdAndUpdate(id, { ...editPost }, { new: true });
                return result;
            } catch (error) {
                throw new Error(error);
            }

        },


        /**
         * Function to delete a post
         * @param _parent 
         * @param param1 The ID of the post to deleted
         * @param param2 Context containing Mongoose models and middleware result
         * @returns A message
         * @author athulraj2002
         */
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