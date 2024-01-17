const Search = ({optimizedFn,searchText}) =>{
    return(

        <input
        type="text"
        name="searchTerm"
        ref={searchText}
        onChange={(e) => optimizedFn(e.target.value)}
      />
    )

}
export default Search;