import './style.css'
import React, { Component } from 'react'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}