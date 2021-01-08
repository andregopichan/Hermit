import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';

class FoodCard extends Component {
  state = { items: [], category: '', cart: [] };

  componentWillReceiveProps = async (nextProps) => {
    await this.setState({ category: nextProps.category });
    await this.fetchMenuItems();
  };

  fetchMenuItems = async (props) => {
    const response = await fetch(`api/menu/${this.state.category}/items`);
    const items = await response.json();
    this.setState({ items: items });
  };

  clickHandler = async (e, item) => {
    e.preventDefault();
    const tempCart = await this.state.cart;
    await tempCart.push(item);

    await this.setState({ cart: tempCart });
    await this.props.onAddToCart(this.state.cart);
  };

  // Logic to render price a button if we have no price
  renderButtons = (item) => {
    if (item.price) {
      return (
        <div>
          <Card.Text>${item.price}</Card.Text>
          <Button variant="primary" onClick={(e) => this.clickHandler(e, item)}>
            Add to Cart
          </Button>
        </div>
      );
    } else if (!item.price) {
      return (
        <div>
          <Card.Text>No Price</Card.Text>
          <Button variant="secondary" disabled>
            Add to Cart
          </Button>
        </div>
      );
    }
  };

  renderCategories = () => {
    return (
      <div>
        {Object.values(this.state.items).map((item) => (
          <div className="category-mainpage-info">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.caption}</Card.Title>
                <Card.Text>A delicious item 🦆</Card.Text>
                {this.renderButtons(item)}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    );
  };

  render() {
    return <div>{this.renderCategories()}</div>;
  }
}

export default FoodCard;
