// service
import Post from "/domain/entities/Post.ts";
// service
export const pagingPost = async ()=>{
    return await Post.all()
}