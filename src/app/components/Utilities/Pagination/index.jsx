const paginations = ({page, setPage,pageTerbaru } ) => {

    const handleNextPage = ()  => {
        pageTerbaru((prevState) => prevState + 1);
    }
    const handlePrevPage = ()  => {
        pageTerbaru((prevState) => prevState - 1);
    }
    
    return (
        <div className="flex items-center justify-center my-6 mb-2">
                {page > 1 && (
                    <button className="bg-[#854836] text-white px-4 py-2 rounded-full hover:bg-[#7c3a15] transition duration-300 shadow-md" onClick={handlePrevPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
                <p>{page}/{setPage}</p>
                {page < setPage && (
                    <button className="bg-[#854836] text-white px-4 py-2 rounded-full hover:bg-[#7c3a15] transition duration-300 shadow-md" onClick={handleNextPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>
    )
}
export default paginations