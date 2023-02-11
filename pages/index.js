import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [count, setCount] = useState(1);
  const [apiRes, setApiRes] = useState([]);

  useEffect(()=>{
    fetch('/api/hello')
      .then(r=>r.json())
      .then(res=>setApiRes(res))
  },[])


  useEffect(()=>{
    const timer = setInterval(()=>setCount(n=>n+1), 1000);
    return()=>{
      clearInterval(timer);
    }
  })

  return (
    <>
      <Head>
        <title>Mon super blog</title>
      </Head>
      <Layout>
        <div>
          <h1>Compteur: {count}</h1>
        </div>
        <ul>
          <h2>Api data</h2>
          {
            apiRes.map(res=><li key={res.id}><h4>{res.name}</h4></li>)
          }
        </ul>
      </Layout>
    </>
  )
}