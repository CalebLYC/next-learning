import Head from 'next/head';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';

export default function Post({post}) {  
    const router = useRouter()
    useEffect(() => {
        if(!post){
            router.push('/fetchFailedPage')
        }    
    }, [post, router])

    return (
        post && 
            <>
                <Head>
                    <title>{post.title}</title>
                </Head>
                <Layout>
                    <h2>{post.title}</h2>
                    <div>
                        {post.body}
                    </div>
                </Layout>
            </>
    )     
}

export async function getStaticPaths() {
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const posts = await res.json()
      
        // Get the paths we want to pre-render based on posts
        const paths = posts.map((post) => ({
          params: { id: post.id.toString() },
        }))
      
        // We'll pre-render only these paths at build time.
        // { fallback: false } means other routes should 404.
        return { paths, fallback: false }
    } catch (error) {
        console.error(error)
        return { paths: [], fallback: true }
    }
  }



export async function getStaticProps({params}){
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
        const post = await res.json()

        return{
            props:{
                post,
            }
        }
    }catch (error) {
        console.error(error);
        return {
          props: {
            post: null,
          },
        };
    }
}