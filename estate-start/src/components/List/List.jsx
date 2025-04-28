import "./List.scss";
import { listData } from "../../lib/dummydata";
import Card from "../../components/Card/Card";

const List = ({posts}) => {
  return (
    <div className="list">
      {posts.map((item) => (<Card key={item.id} item={item}></Card>))}
    </div>
  )
}

export default List
