import ShopWomen from '../../assets/shopWomens.jpg';
import ShopMen from '../../assets/shopMens.jpg';
import './styles.scss';

const Directory = () => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${ShopWomen})` }}>
          <a>Shop Women</a>
        </div>
        <div className="item" style={{ backgroundImage: `url(${ShopMen})` }}>
          <a>Shop Men</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
