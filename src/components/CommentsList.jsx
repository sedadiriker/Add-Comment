import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const CommentsList = ({getComments,comments}) => {
  const [edit, setEdit] = useState(null);
  const [editComment, setEditComment] = useState('');

  const startEditing = (id, currentComment) => {
    setEdit(id);
    setEditComment(currentComment);
  };

  const cancelEdit = () => {
    setEdit(null);
    setEditComment('');
  }

  const submitEdit = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`https://2d5c0174-35e2-46ed-a706-4caa618c5aba-00-on6d7gof27w.sisko.replit.dev/comments/${id}`, { comment: editComment });
      cancelEdit();
      getComments();
    } catch (err) {
      console.error('Error updating comment:', err);
    }
  };

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
  <div className="mt-5" id="comments-container">
    {comments.map((comment) => (
      <div
        className="border border-1 py-1 px-1 d-flex gap-4 justify-content-between align-items-center"
        key={comment.id}
      >
        {edit === comment.id ? (
          <form onSubmit={(e) => submitEdit(e, comment.id)}>
            <input
              type="text"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />
            <button type="submit">Kaydet</button>
            <button onClick={cancelEdit}>İptal</button>
          </form>
        ) : (
          <div className="d-flex justify-content-between align-items-center  w-100">
            <p>{comment.comment}</p>
            <div className='d-flex gap-2'>
            <button
              className="btn btn-success"
              onClick={() => startEditing(comment.id, comment.comment)}
            >
              Düzenle
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteComment(comment.id)}
            >
              Sil
            </button>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);
}

export default CommentsList

