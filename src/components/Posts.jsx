import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {
    const {post} = useSelector(store=> store.post)
  return (
    <div>
        {
            post.map((post, index) => (
                <Post key={index} post={post} />
            ))
        }
    </div>
  )
}

export default Posts
