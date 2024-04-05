import AddComments from "../components/AddComments"
import CommentsList from "../components/CommentsList"
import { useState, useEffect } from "react"
import axios from "axios"


const Home = () => {
  //! Yorumların takip edildiği tutulacağı State
  const [comments, setComments] = useState([])

  //! Yorumları çağırma
  const getComments = async () =>{
// console.log(comments)
    try{
      const res = await axios('https://2d5c0174-35e2-46ed-a706-4caa618c5aba-00-on6d7gof27w.sisko.replit.dev/comments')
      setComments(res.data)
    }catch(err) {
      console.log(err)
    }
  }

useEffect(() =>{
  getComments()
},[])

  return (
    <div>
      <AddComments getComments={getComments}/>  {/* Burası post ama posttan sonra liste yenilenmesi için get yapılmalı!!! */}
      <CommentsList comments={comments} getComments={getComments}/>  {/* Burda yorumlar listeleniyor, delete,Put işlemleri var.  */}

    </div>
  )
}

export default Home
