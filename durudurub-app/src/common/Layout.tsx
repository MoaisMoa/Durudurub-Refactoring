import React from 'react'
import { Navbar } from '@/components/header/Navbar'
import { useNavigate } from "react-router-dom";
interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {

  const navigate = useNavigate();

  const handleLogoClick = () => {
    console.log("홈 이동")
  }

  const handleSignupClick = () => {
    console.log("회원가입")
  }

  const handleLoginClick = () => {
    console.log("로그인")
  }

  const handleMiniGameClick = () => {
    console.log("미니게임......")
  }

  const handleExploreClick = (query?: string) => {
    console.log("모임 검색:", query)
  }

  return (
    <>
      <Navbar
        onLogoClick={handleLogoClick}
        onSignupClick={handleSignupClick}
        onLoginClick={handleLoginClick}
        onMiniGameClick={handleMiniGameClick}
        onExploreClick={handleExploreClick}

        onMyPageClick={() => navigate("/mypage")}
        onMyMeetingsClick={() => navigate("/myMeetings")}
        onNoticeClick={() => navigate("/notice")}
        onAdminClick={() => navigate("/admin")}
      />

      <div className="container mx-auto px-4">
        {children}
      </div>
    </>
  )
}

export default Layout