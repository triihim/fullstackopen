import blogService from "../services/blogService";
import { setErrorNotification, setSuccessNotification } from "./notificationReducer";

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "BLOG_GET_ALL",
      blogs
    });
  };
};

export const createBlog = blog => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.create(blog);
      dispatch({
        type: "BLOG_CREATE",
        blog: createdBlog
      });
      dispatch(setSuccessNotification(`Blog ${createdBlog.title} created`));
    } catch(e) {
      dispatch(setErrorNotification("Blog creation failed"));
    }
  };
};

export const likeBlog = blogId => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.like(blogId);
      dispatch({
        type: "BLOG_LIKE",
        blog: likedBlog
      });
    } catch (e) {
      dispatch(setErrorNotification("Could not like the blog"));
    }
  };
};

export const deleteBlog = (blogId, callback) => {
  return async dispatch => {
    try {
      await blogService.delete(blogId);
      dispatch({
        type: "BLOG_DELETE",
        blogId
      });
      dispatch(setSuccessNotification("Blog removed"));
      if(callback) callback();
    } catch (e) {
      dispatch(setErrorNotification("Could not delete the blog"));
    }
  };
};

export const commentBlog = (blogId, comment) => {
  return async dispatch => {
    try {
      const commentedBlog = await blogService.comment(blogId, comment);
      dispatch({
        type: "BLOG_COMMENT",
        blog: commentedBlog
      });
      dispatch(setSuccessNotification("Comment posted"));
    } catch (e) {
      dispatch(setErrorNotification("Could not comment the blog"));
    }
  };
};

const blogsReducer = (state = [], action) => {
  switch(action.type) {
    case "BLOG_GET_ALL": return state.concat(action.blogs);
    case "BLOG_CREATE": return state.concat(action.blog);
    case "BLOG_LIKE": return state.filter(b => b.id !== action.blog.id).concat(action.blog);
    case "BLOG_DELETE": return state.filter(b => b.id !== action.blogId);
    case "BLOG_COMMENT": return state.filter(b => b.id !== action.blog.id).concat(action.blog);
    default: return state;
  }
};

export default blogsReducer;