import { useEffect } from 'react';
import axios from 'axios';

const CommentsList = ({getComments,comments}) => {
  useEffect(() => {
    getComments()
  }, []);

const deleteComment = async (id) => {
  try{
    await axios.delete(`https://2d5c0174-35e2-46ed-a706-4caa618c5aba-00-on6d7gof27w.sisko.replit.dev/comments/${id}`)
  }catch(err){
    console.log(err)
  }
  getComments()
}
  return (
    <div className="mt-5 d-flex flex-column gap-1" id="comments-container">
       {comments.map((comment) => (
        <div className="border border-1 py-1 px-1 d-flex gap-4 justify-content-between align-items-center" key={comment.id}>{comment.comment}      <button className="btn btn-danger" onClick={() => deleteComment(comment.id)}>Sil</button>
        </div>
      ))}
    </div>
  )
}

export default CommentsList

