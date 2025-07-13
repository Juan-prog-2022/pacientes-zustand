
export default function Error({children} : {children: React.ReactNode}) {
  return (
    <p className="tect-center my-4 bg-red-600 text-white font-bold p-3 uppercase">{children}</p>
  )
}
