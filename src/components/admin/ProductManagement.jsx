import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

function ProductManagement() {
  console.log("ProductManagement Render");
  const [products, setProducts] = useState([]);

  const [show, setShow] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [img, setImg] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await axios.get("http://localhost:9999/products");

      const sortedProducts = res.data.sort(
        (a, b) => Number(a.id) - Number(b.id),
      );

      setProducts(sortedProducts);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:9999/products/${id}`);

      alert("Delete Success");

      loadProducts();
    } catch (error) {
      console.log(error);
    }
  }

  function handleShow() {
    setEditingId(null);

    setTitle("");
    setPrice("");
    setCategory("");
    setImg("");

    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleEdit(product) {
    setEditingId(product.id);

    setTitle(product.title);

    setPrice(product.price);

    setCategory(product.category);

    setImg(product.img);

    setShow(true);
  }

  async function handleSaveProduct() {
    try {
      if (!title || !price || !category || !img) {
        alert("Please fill all fields");

        return;
      }

      if (Number(price) <= 0) {
        alert("Price must be greater than 0");

        return;
      }

      const productData = {
        title,
        price: Number(price),
        category,
        img,
      };

      // UPDATE
      if (editingId) {
        await axios.patch(
          `http://localhost:9999/products/${editingId}`,
          productData,
        );

        alert("Update Success");
      }

      // CREATE
      else {
        await axios.post("http://localhost:9999/products", {
          ...productData,
          reviews: [],
        });

        alert("Add Success");
      }

      setTitle("");
      setPrice("");
      setCategory("");
      setImg("");

      setEditingId(null);

      handleClose();

      loadProducts();
    } catch (error) {
      console.log(error);
    }
  }

  function getCategoryName(category) {
    switch (category) {
      case "mua-he":
        return "Mùa Hè";

      case "mua-dong":
        return "Mùa Đông";

      case "di-lam":
        return "Đi Làm";

      case "di-choi":
        return "Đi Chơi";

      default:
        return category;
    }
  }

  return (
    <>
      <h2 className="mb-3">Product Management ({products.length})</h2>

      <Button className="mb-3" onClick={handleShow}>
        Add New Product
      </Button>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>

            <th>Image</th>

            <th>Name</th>

            <th>Price</th>

            <th>Category</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>

              <img
                src={`/${p.img}`}
                alt={p.title}
                width="80"
                height="80"
                style={{
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <td>{p.title}</td>

              <td>{p.price.toLocaleString("vi-VN")}đ</td>

              <td>{getCategoryName(p.category)}</td>

              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </Button>

                <Button variant="danger" onClick={() => handleDelete(p.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>

              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>

              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>

              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>

                <option value="mua-he">Mùa Hè</option>

                <option value="mua-dong">Mùa Đông</option>

                <option value="di-lam">Đi Làm</option>

                <option value="di-choi">Đi Chơi</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>

              <Form.Control
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="/images/ao1.jpg"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="success" onClick={handleSaveProduct}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductManagement;
