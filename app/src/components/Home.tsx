import React from 'react'
import { useQuery, gql } from '@apollo/client'

import Header from './Header' 
import Footer from './Footer'
import FileSet from './FileSet'

import style from './Home.module.scss'


const ALL_FILES = gql`
  query AllFiles {
    allFiles {
      name
    }
  }
`


const Home: React.FC = () => {

  const { loading, error, data } = useQuery(ALL_FILES);

  if (loading) return (<p>Loading...</p>)
  if (error) return (<p>Error...</p>)


  return (
    <div className={ style.wrapper }>
      <Header />
      <FileSet files={data.allFiles} />
      <Footer />
    </div>
  )
} 

export default Home
