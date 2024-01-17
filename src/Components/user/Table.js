const Table = ({handleSubmit,inputArray,elementsRef,handlevalidate,buttonRef})=>{
return(
    <div>
       {console.log("hi")}
      <h1>FormData </h1>

       <form onSubmit={handleSubmit}>
        {inputArray.map((inputEle, index) => (
          <>
            <div>
              <label key={inputEle.key}>
                {index <= inputArray.length - 2 ? inputEle.name : ""}
                <input
                  style={{ outline: "none" }}
                  key={inputEle.key}
                  type={inputEle.type}
                  name={inputEle.name}
                  defaultValue={inputEle.defaultvalue}
                  ref={elementsRef.current[inputEle.key]}
                  onChange={handlevalidate}
                  onBlur={handlevalidate}
                />
              </label>
            </div>
            <div id={inputEle.id} style={{ display: "none" }}>
              please provide valid {inputEle.id}
            </div>
          </>
        ))}
        <button type="submit" id="btn" ref={buttonRef} disabled>
          {"create"}
        </button>
      </form>
      </div>
)
}
export default Table;