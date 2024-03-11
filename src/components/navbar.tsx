import { Avatar,Space,Dropdown, Input, Modal, ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
import type { MenuProps } from 'antd'
import { LaptopOutlined, LogoutOutlined, MoonOutlined,
   PieChartFilled,
   SettingOutlined,
   SkinOutlined, SunOutlined, UserOutlined } from "@ant-design/icons";




const Navbar:React.FC = () =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme ,setTheme] = useState(localStorage.theme);
  const element = window.document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // console.log(darkQuery ,"DARK QUERY")


  const handleShow = () => {
    setIsModalOpen(true);
  }

  const handleCannle = () => {
    setIsModalOpen(false)
  }

  const items:MenuProps['items'] = [{
    label: <div className="flex gap-3">
          <div className="bg-blue-500 px-1 rounded-md">
            <UserOutlined style={{color:'white'}}/>
          </div>
         <a>profile</a>
      </div>,
    key : 0,
  },
  {
    key : 1,
    label :<div className="flex  gap-3">
      <div className="bg-purple-500 px-1 rounded-md">
          <SkinOutlined  style={{color:'white'}}/>
        </div> 
    <a onClick={handleShow}>Display Setting</a></div>,
  },

  {
    key:4,
    label : <button onClick={()=> setTheme('dark')} className="flex gap-2 items-center">
      <div className="bg-blue-500 px-1 rounded-md">
           <SettingOutlined style={{color:'white'}}/>
      </div>
      settings & privacy</button>
  },

  {
    label:<div className="flex gap-3">
        <div className="flex gap-3 bg-red-500 rounded-md px-1">
          <LogoutOutlined style={{ color:'white'}}/>
          </div>    
      <a>log out</a></div>,
    key : 10,
  },
  
  ]

  const onWindowMatch = () =>{
    if(localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)){
        element.classList.add('dark');
    }else{
        element.classList.remove("dark")
    }
}




const ChangeThmem = () => {
  return <ConfigProvider
  theme={{
    components:{
      Modal:{
        contentBg : theme === "dark" ? "#27272a" : "#ffffff",
        headerBg : theme === "dark" ? "#27272a" : "#ffffff",
      }
    }

  }}
  >
    <Modal
    footer={false}
   title={<label className="dark:bg-zinc-800
   text-neutral-700 dark:text-neutral-100
   inline-flex gap-2">
<div className="bg-blue-400 px-1 rounded-md">
<SettingOutlined style={{color:'white'}}/>
</div>
<p className=" text-[15px]">Display settings</p>
</label>}
  open={isModalOpen}
  onCancel={handleCannle}>
    <div className="grid grid-cols-3 gap-3 p-3">
       <button onClick={()=>setTheme('light')}>
        <div className="bg-blue-50 dark:bg-zinc-700 
        dark:text-neutral-100 rounded-xl my-2 p-4">
          <SunOutlined className="text-blue-500 text-[4rem]"/>
        </div>
        <p className="dark:text-neutral-100">
          light
        </p>
       </button>
       <button onClick={()=>setTheme('dark')}>
        <div className="bg-blue-50 rounded-xl
         dark:bg-zinc-700 my-2
         dark:text-neutral-100
        p-4">
          <MoonOutlined className="text-blue-500 text-[4rem]"/>
        </div>
        <p className="dark:text-neutral-100">
          dark
        </p>
       </button>
       <button onClick={()=>setTheme('system')}>
        <div className="bg-blue-50 my-2 rounded-xl
         dark:bg-zinc-700 
         dark:text-neutral-100
        p-4">
          <LaptopOutlined
           className="text-blue-500 text-[4rem]"/>
        </div>
        <p className="dark:text-neutral-100">
          system
        </p>
       </button>
       </div>
  </Modal>
  </ConfigProvider>
}

useEffect(()=>{
    switch(theme){
        case "dark":
            element.classList.add("dark")
            localStorage.setItem("theme", "dark")
            break;
        case "light":
            element.classList.remove("dark")
            localStorage.setItem("theme", "light")
            break;
        default:
            localStorage.removeItem("theme")
            onWindowMatch()
            break
    }

}, [theme])


    return <nav className="bg-blue-400 dark:text-neutral-50
     dark:bg-zinc-800
     dark:border-b
     dark:border-zinc-700 
     z-10 py-2 shadow-sm
      fixed w-full top-0">
            <div className="max-w-4xl mx-auto">
              {ChangeThmem()}
                <div className="flex items-center justify-between">
                <span className="font-bold gap-2 items-center text-white font-mono flex">
                  <PieChartFilled
                   className="text-xl"/>
                  <p>
                  កវី
                  </p>
                </span>
                 <span>
                  <Input
                  className="dark:bg-zinc-700
                  w-[20rem] rounded-lg
                   text-white dark:border-slate-500"
                  placeholder="search"
                  />
                 </span>
                <span >

                  <Dropdown
                  arrow={true} 
                  className="cursor-pointer w-full text-neutral-500"
                   trigger={['click']} menu={{items}}>
                  <Space>
                  <Avatar
                   src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" 
                  style={{ backgroundColor: '#ddd6fe' }}
                  />
                  </Space>
                  </Dropdown>
                 
                </span>
                </div>
               
            </div>
    </nav>
}


export default Navbar;