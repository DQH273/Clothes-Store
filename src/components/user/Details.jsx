import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { CartContext } from "./CartProvider";

function Details() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [reviewName, setReviewName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const { loadCartCount } = useContext(CartContext);

  // load product detail
  useEffect(() => {
    axios
      .get(`http://localhost:9999/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // add to cart
  async function handleAddToCart() {
    try {
      const res = await axios.get(
        `http://localhost:9999/carts?productId=${id}`,
      );

      // đã tồn tại
      if (res.data.length > 0) {
        const cartItem = res.data[0];

        await axios.patch(`http://localhost:9999/carts/${cartItem.id}`, {
          quantity: cartItem.quantity + 1,
        });
      }

      // chưa tồn tại
      else {
        await axios.post("http://localhost:9999/carts", {
          productId: id,
          title: product.title,
          price: product.price,
          img: product.img,
          quantity: 1,
        });
      }

      loadCartCount();

      alert("Add To Cart Success");
    } catch (error) {
      console.log(error);
    }
  }

  // add review
  async function handleAddReview() {
    try {
      if (!reviewName || !comment || !rating) {
        alert("Please fill all fields");
        return;
      }

      const newReview = {
        reviewerName: reviewName,
        comment: comment,
        rating: Number(rating),
        date: new Date().toISOString(),
      };

      const updatedReviews = [...product.reviews, newReview];

      await axios.patch(`http://localhost:9999/products/${id}`, {
        reviews: updatedReviews,
      });

      setProduct({
        ...product,
        reviews: updatedReviews,
      });

      setReviewName("");
      setComment("");
      setRating("");

      alert("Add Review Success");
    } catch (error) {
      console.log(error);
    }
  }

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="mt-4">
      <Card className="p-4">
        <Row>
          <Col md={5}>
            <img src={`/${product.img}`} alt={product.title} width="100%" />
          </Col>

          <Col md={7}>
            <h2>{product.title}</h2>

            <p>
              <b>Category:</b> {product.category}
            </p>

            <p>
              <b>Price:</b> {product.price.toLocaleString("vi-VN")}đ
            </p>

            <p>
              <b>Total Reviews:</b> {product.reviews.length}
            </p>

            <Button variant="success" onClick={handleAddToCart}>
              Add To Cart
            </Button>
          </Col>
        </Row>
      </Card>

      {/* REVIEW LIST */}
      <Card className="mt-4 p-4">
        <h3>Reviews</h3>

        {product.reviews.map((review, index) => (
          <Card key={index} className="mb-3 p-3">
            <h5>{review.reviewerName}</h5>

            <p>Rating: ⭐ {review.rating}</p>

            <p>{review.comment}</p>

            <small>{new Date(review.date).toLocaleDateString("vi-VN")}</small>
          </Card>
        ))}
      </Card>

      {/* ADD REVIEW */}
      <Card className="mt-4 p-4">
        <h3>Add Review</h3>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Reviewer Name</Form.Label>

            <Form.Control
              type="text"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>

            <Form.Control
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleAddReview}>
            Submit Review
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Details;
