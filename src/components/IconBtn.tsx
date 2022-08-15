import { ReactNode } from "react";

interface IconBtnProps {
  Icon: any
  isActive: boolean
  color: string
  children: ReactNode
}
export function IconBtn({ Icon, isActive, color, children, ...props }: IconBtnProps) {
  return <button className={`btn icon-btn ${isActive ? 'icon-btn-active' : ''} ${color || ''}`} {...props}>
    <span className={`${children != null ? 'mr-1' : ''}`}>
      <Icon />
    </span>
    {children}
  </button>
}