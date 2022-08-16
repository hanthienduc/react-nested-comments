import { ReactNode } from "react";

interface IconBtnProps {
  Icon: any
  isActive: boolean
  color?: string
  children?: ReactNode
  onClick: () => void

  disabled?: boolean
}
export function IconBtn({ Icon, isActive, color, disabled, children, ...props }: IconBtnProps) {
  return <button className={`btn icon-btn ${isActive ? 'icon-btn-active' : ''} ${color || ''}`} disabled={disabled} {...props}>
    <span className={`${children != null ? 'mr-1' : ''}`}>
      <Icon />
    </span>
    {children}
  </button>
}