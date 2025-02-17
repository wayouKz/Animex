import Link from "next/link"
const Header = ({title,linkHref,linkTitle}: {title:string,linkHref:string,linkTitle:string}) => {
    return (
        <>
         <div className="p-3 flex justify-between">
            <h1 className="text-3xl font-bol text-center text-background">{title ? title : null} </h1>
            {linkHref && linkTitle 
            
                ? <Link href={linkHref} className="text-sm font-bold text-background ">{linkTitle}</Link> :
                null
            }
        </div>
        </>
    )
}
export default Header