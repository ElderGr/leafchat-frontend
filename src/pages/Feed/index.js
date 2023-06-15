import React, { useState, useEffect } from 'react';

import "./styles.css"

import { FaImages, FaLeaf, FaComment, FaTimesCircle, FaTimes } from "react-icons/fa";

import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";

import api from '../../services/api';
import { TimestampToDate } from "../../functions/TimestampToDate";
import { parseJwt } from "../../services/auth";

export default function Feed() {

  const [posts, setPosts] = useState([])
  const [postText, setPostText] = useState('');
  const [postFiles, setPostFiles] = useState([]);
  const [postFilesPreview, setPostFilesPreview] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState('');

  //comments
  const [selectedPost, setSelectedPost] = useState('');
  const [selectedComments, setSelectedComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(async () => {
    async function posts() {
      try {
        const response = await api.get('/posts');
        console.log(response.data)
        setPosts(response.data);
      } catch (err) {
        console.log(err)
      }
    }
    posts();
  }, [])

  const removeImage = (target) => {
    const postsPreviewCopy = postFilesPreview.filter((img, index) => { return index !== target });
    const postsCopy = postFiles.filter((img, index) => { return index !== target });

    setPostFilesPreview(postsPreviewCopy);
    setPostFiles(postsCopy);
  }

  const readURL = (e) => {
    if (e.target.files) {

      /* Get files in array form */
      const files = Array.from(e.target.files);
      /* Map each file to a promise that resolves to an array of image URI's */
      Promise.all(files.map(file => {
        return (new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', (ev) => {
            resolve(ev.target.result);
          });
          reader.addEventListener('error', reject);
          reader.readAsDataURL(file);
        }));
      }))
        .then(images => {
          /* Once all promises are resolved, update state with image URI array */
          const copyFiles = [files, ...postFiles];
          const copyFilesPreview = [images, ...postFilesPreview];
          setPostFiles(copyFiles)
          setPostFilesPreview(copyFilesPreview)

        }, error => {
          console.error(error);
        });
    }
  }

  const handleValues = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', postFiles.length !== 0 ? postFiles[0][0] : '');
    data.append('content', JSON.stringify({
      content: postText,
      owner: parseJwt()
    }));

    await api.post('/posts', data);

    setPostFiles([]);
    setPostFilesPreview([]);
    setPostText('');
  }

  const handleLike = async (postId) => {
    await api.post(`posts/${postId}/like`, {}, {
      headers: {
        user: parseJwt().id
      }
    });

    const newPosts = await api.get('posts')
    setPosts(newPosts.data);
  }

  const handleComents = async (e) => {
    e.preventDefault();

    await api.post(`/posts/${selectedPost}/comment`, {
      owner: parseJwt(),
      content: comment
    })
    
    setComment('');

    const response = await api.get('/posts');
    setPosts(response.data);
  }

  return (
    <div>
      <form className='border p-3' onSubmit={handleValues}>
        <textarea
          placeholder='Escreva seu post...'
          className='form-control'
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          rows="4"
        />

        <div className='mt-3 d-flex flex-wrap'>
          {
            postFilesPreview.map((imageURI, index) =>
              (
                <div key={index} style={{ margin: '0 1%', backgroundImage: `url(${imageURI})`, width: '7rem', height: '5rem', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} alt="Photo uploaded">
                  <FaTimesCircle style={{ cursor: 'pointer' }} onClick={() => removeImage(index)} />
                </div>
              ))
          }
        </div>

        <div className='col-12 p-0 d-flex align-items-center justify-content-between'>
          <label for='file' style={{ width: '3.5%', height: '10%', color: 'white', cursor: 'pointer' }}>
            <FaImages style={{ width: '30px', height: '30px' }} />
          </label>
          <div>
            <input onChange={readURL} id='file' name='file' multiple style={{ display: 'none' }} type='file' />
          </div>
          <button type='submit' disabled={postText === '' ? true : false} className='btn btn-success'><b>Publicar</b></button>
        </div>
      </form>



      <div style={{ overflowY: 'scroll', height: 'calc(100vh - 276px)', minHeight: "162px", minWidth: '500px' }}>
        {posts.map((item, index) => (
          <div className='border p-3 d-flex'>
            <div className='image-container'>
            </div>
            <div className='pr-1 pl-3 col-10'>
              <div onClick={() => {
                setForm('comentario');
                setSelectedPost(item.id)
                setModal(!modal)
              }}>
                <div>
                  <h4 className='text-white' style={{ fontWeight: 'bold', margin: '0' }}>{item.owner !== undefined && item.owner.name}</h4>
                  <span style={{ opacity: 0.5 }} className='text-white'><b>{TimestampToDate(item.timestamp)}</b></span>
                </div>
                <div className='mt-3 mb-3'>{item.content}</div>
                <div style={{ maxHeight: '400px', overflow: 'hidden' }}>
                  <img style={{ width: '100%', height: '100%' }} className="post-image" src={item.image} alt="" />
                </div>
              </div>


              <div>
                <button type='button' onClick={() => handleLike(item.id)} style={{ background: 'none', border: 'none', color: 'white' , outline: 'none', marginTop: '1.5%' }} className='pr-3' >
                  <FaLeaf />
                  <span className='ml-1' >
                    {item.likes !== undefined && item.likes.length}
                  </span>
                </button>

                <button type='button' style={{ background: 'none', border: 'none', color: 'white' }} onClick={() => {
                  setForm('allComentarios');
                  setSelectedComments(item.comments === undefined ? [] : item.comments)
                  setSelectedPost(item.id)
                  setModal(!modal)
                }}>
                  <FaComment />
                  <span className='ml-1'>
                    {item.comment !== undefined ? item.comments.length : ''}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>




      <MDBModal isOpen={modal} toggle={() => setModal(!modal)}>
        <MDBModalHeader toggle={() => setModal(!modal)} style={{background: '#8AC48C', color: 'white'}}>
          <b>Inserir comentário</b>
        </MDBModalHeader>
        <MDBModalBody className='p-0'>
          {form === 'comentario' ? (
            <form onSubmit={handleComents} className='p-3'>
              <textarea className='form-control' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Faça seu comentário'></textarea>

              <button type='submit' className='btn btn-success btn-block mt-2'>Comentar</button>
            </form>
          ) : (
              <div className='pt-2 pb-2'>
                {selectedComments.map(item => {
                  return (
                    <div key={item.id} className='pb-2 pt-2' style={{borderBottom: '1px solid #E8E8E8'}}>
                      <div className='col-2'></div>
                      <div className='col-10'>
                        <h5 className='m-0'><b>{item.owner !== undefined && item.owner.name}</b></h5>
                        <div style={{color: '#BFBFBF', marginBottom: '2%'}}>{TimestampToDate(item.timestamp)}</div>
                        <div>{item.content}</div>
                        <div></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
        </MDBModalBody>
      </MDBModal>
    </div>
  );
}
