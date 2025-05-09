import "./listPage.scss";
import Filter from "../../components/Filter/Filter";
import Card from "../../components/Card/Card";
import Map from "../../components/Map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";


const ListPage = () => {

  const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter></Filter>
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
              {(postResponse) => postResponse.data.map((post)=>(
                <Card key={post.id} item={post}></Card>
              ))}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
              <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
                {
                  (postResponse) => <Map items={postResponse.data}></Map> 
                }
              </Await>
        </Suspense>
      </div>
    </div>
  )
}

export default ListPage
