const Headers = ({title,page }  ) => {
    return (
        <div className="p-3 flex justify-center mt-4 bg-primary rounded shadow">
           <h1 className="text-3xl font-bold   text-white" style={{ color: 'white' }}>{title} #{page}</h1>
        </div>
    )
}
export default Headers