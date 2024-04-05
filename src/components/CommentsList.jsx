import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const CommentsList = ({getComments,comments}) => {
  const [edit, setEdit] = useState(null);
  const [editComment, setEditComment] = useState('');

  const cancelEdit = () => {
    setEdit(null);
    setEditComment('');
  }

  const submitEdit = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`/comments/${id}`, { comment: editComment });
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
    <div className="mt-5 d-flex flex-column gap-1" id="comments-container">
      {comments.map((comment) => (
        <div className="border border-1 py-1 px-1 d-flex gap-4 justify-content-between align-items-center" key={comment.id}>
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
            <>
              {comment.comment}
              <button className="btn btn-success" onClick={() => submitEdit(comment)}>Düzenle</button>
              <button className="btn btn-danger" onClick={() => deleteComment(comment.id)}>Sil</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentsList

