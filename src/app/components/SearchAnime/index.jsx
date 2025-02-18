'use client'
import {useRef} from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import {useRouter} from 'next/navigation'
const Search = () => {
    const inputRef = useRef(null);
    const router = useRouter();
    const handleSearch = (event) => {
        if(!inputRef.current || inputRef.current.value === "") return
        if (event.key === 'Enter') {
            event.preventDefault();
            const query = inputRef.current.value;
            router.push(`/search/${query}`);
        }        
    }
    return (
        <div className="relative" >
                    <input
                        type="text"
                        placeholder="Search"
                        className="px-4 py-2 rounded  w-full  bg-[#543A14] text-[#000]" 
                        ref={inputRef}
                        onKeyDown={handleSearch}
                    />
                    <button className="absolute right-2 top-2 end-2 text-black" onClick={handleSearch}>
                        <MagnifyingGlass size={24} color="#000" />
                    </button>
            </div>
    )
}
export default Search;
