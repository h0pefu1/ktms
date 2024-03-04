import Card from 'components/card'
import React, { ReactNode } from 'react'

export type CardButtonProps={
    icon:ReactNode,
    title:string,
    onClick:any,
    iconInText?:ReactNode,
    extra?: string;
}


function CardButton({icon,title,onClick,iconInText,extra}:CardButtonProps) {
  return (
    <Card 
    
    onClick={onClick}
    extra={`!flex-row flex-grow items-center rounded-[20px] ${extra}`} >
    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
      <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
        <span className="flex items-center text-brand-500 dark:text-white">
          {icon}
        </span>
      </div>
    </div>

    <div className="h-50 ml-4 flex w-full mr-5 justify-between items-center">
      {/* <p className="font-dm text-sm font-medium text-gray-600">{title}</p> */}
      <h4 className="text-xl font-bold text-navy-700 dark:text-white flex">
        {title} 
      </h4>
      <div >
        {iconInText}
      </div>
    </div>
  </Card>
  )
}

export default CardButton