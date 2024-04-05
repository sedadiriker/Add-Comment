import { useState } from "react";
import axios from "axios";

const AddComments = ({getComments}) => {
  const [comment, setComment] = useState('');
console.log(comment)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = comment
    postComments(newComment)
    setComment("")
  }

  const postComments = async (comment) => {
    try{
      await axios.post('https://2d5c0174-35e2-46ed-a706-4caa618c5aba-00-on6d7gof27w.sisko.replit.dev/comments', {comment:`${comment}`} )
      getComments()

    }catch(err) {
      console.log(err)
    }
  }
  
  return (
    <div>
        <h2 className="my-3">React Nasıl Gidiyor?</h2>
      <form className="d-flex gap-3" id="comment-form" onSubmit={handleSubmit}>
        <input type="text" id="comment-input" placeholder="Yorumunuzu yazın" value={comment} onChange={(e) => setComment(e.target.value)} required />
        <button className="btn btn-success" type="submit">Yorum Ekle</button>
      </form>
    </div>
  )
}

export default AddComments
