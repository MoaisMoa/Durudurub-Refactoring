import React from 'react'
import Layout from '../common/Layout'

import { HeroSection } from '../components/home/HeroSection'
import { CategorySection } from '../components/home/CategorySection'
import { AdBanner } from '../components/home/AdBanner'

const Home = () => {

  const handleCategoryClick = (category: string) => {
    console.log(category)
  }

  const handleMoreClick = () => {
    console.log("더보기 클릭")
  }

  const handleExploreClick = () => {
    console.log("모임 둘러보기")
  }

  return (
    <Layout>
      <HeroSection onExploreClick={handleExploreClick} />
      <AdBanner />
      <CategorySection
        onCategoryClick={handleCategoryClick}
        onMoreClick={handleMoreClick}
      />
    </Layout>
  )
}

export default Home