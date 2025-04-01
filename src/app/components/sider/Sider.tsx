"use client"

import { authFirebase } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link"
import { useEffect, useState } from "react";
import { FaHouse, FaMusic, FaPodcast, FaHeart, FaRightFromBracket, FaUser, FaUserPlus } from "react-icons/fa6";
import { MenuItem } from "./MenuItem";

export const Sider = () => {
  const [isLogin, setIsLogin] = useState<boolean>();

  useEffect(() => {
    onAuthStateChanged(authFirebase, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  const menu = [
    {
      icon: <FaHouse />,
      title: "Trang Chủ",
      link: "/"
    },
    {
      icon: <FaMusic />,
      title: "Danh mục bài hát",
      link: "/categories"
    },
    {
      icon: <FaPodcast />,
      title: "Ca sĩ",
      link: "/singers"
    },
    {
      icon: <FaHeart />,
      title: "Bài hát yêu thích",
      link: "/wishlist",
      isLogin: true
    },
    {
      icon: <FaRightFromBracket />,
      title: "Đăng xuất",
      link: "/logout",
      isLogin: true
    },
    {
      icon: <FaUser />,
      title: "Đăng nhập",
      link: "/login",
      isLogin: false
    },
    {
      icon: <FaUserPlus />,
      title: "Đăng ký",
      link: "/register",
      isLogin: false
    }
  ];

  return (
    <>
      <div className="bg-[#212121] h-[100vh] fixed w-[280px]">
        <div className="bg-[#1C1C1C] py-[10px] px-[15px]">
          <Link href="/" className="flex justify-center items-center">
            <img 
              // src="/logo.svg" 
              src="/demo/Logo.png"
              alt="Logo" 
              className="h-[100px] w-auto"
            />
          </Link>
        </div>
        <nav className="py-[30px] px-[20px]">
          <ul className="">
            {menu.map((item, index) => (
              <MenuItem item={item} isLogin={isLogin} key={index} />
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}