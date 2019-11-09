import React, {Component} from 'react';
import {MdAddShoppingCart} from 'react-icons/md';
import {ProductList} from './styles';
import api from '../../services/api';
import {formatPrice} from '../../util/format';

export default class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    // console.log(response.data);
    // response.data.forEach(item => {
    //   item.price = formatPrice(item.price);
    // });

    // this.setState({products: response.data});
    this.setState({products: data});
  }

  componentDidUpdate(_, prevState) {}

  render() {
    const {products} = this.state;
    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt="Tênis" />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button">
              <div>
                <MdAddShoppingCart size={16} color="#fff" /> 3
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}
