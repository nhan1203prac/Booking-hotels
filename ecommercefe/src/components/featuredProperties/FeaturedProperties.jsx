import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";
const FeaturedProperties = () => {
  const {data,loading,error} = useFetch("/hotels/featuredProperties?featured=true&limit=4")
  // const {data,loading,error} = useFetch("/hotels?limit=4")


  return (
    <div className="fp">
      {loading?("Loading waiting..."):(<>
      {data.map((item,index)=>(

      <div className="fpItem" key={index}>
        <img
          src={item.photos[0]}
          alt=""
          className="fpImg"
        />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">${item.cheapestPrice}</span>
        {item.rating && 
        <div className="fpRating">
          <button>{item.rating}</button>
          <span>Excellent</span>
        </div>
        }
      </div>
      ))
      }</>) }
    </div>
  );
};

export default FeaturedProperties;
