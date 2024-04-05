import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const CommentsList = ({getComments,comments}) => {
  //! düzenlenen yorumun state i(id)
  const [edit, setEdit] = useState(null);
  //! düzenlenen yorum metni
  const [editComment, setEditComment] = useState('');

  //! Düzenle tıklandığında devreye girer!!
  const startEditing = (id, currentComment) => {
    setEdit(id); // id yi al
    setEditComment(currentComment); // yeni yorumu al
  };
//! Düzenlemeyi onaylama
  const submitEdit = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`https://2d5c0174-35e2-46ed-a706-4caa618c5aba-00-on6d7gof27w.sisko.replit.dev/comments/${id}`, { comment: editComment });
      cancelEdit(); // düzenlemeden çık!!
      getComments(); // yorum listesini yenile
    } catch (err) {
      console.error('Error updating comment:', err);
    }
  };
//! Düzenleme modundan çıkarımak için!! Başlangıç değerlerine döndürür...
  const cancelEdit = () => {
    setEdit(null);
    setEditComment('');
  }

//! yorum silme
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

