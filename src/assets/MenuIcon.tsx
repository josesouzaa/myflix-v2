interface MenuIconProps {
  className?: string
}

export function MenuIcon({ className }: MenuIconProps) {
  return (
    <svg
      className={className ? className : ''}
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14 12.85H1v1.3h13v-1.3zm0-4H1v1.3h13v-1.3zm-13-4h13v1.3H1v-1.3zm13-4H1v1.3h13V.85z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}