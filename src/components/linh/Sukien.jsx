import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function Sukien() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9999/products')
            .then((res) => {
                const suKienProducts = res.data.filter(p => p.category === "su-kien");
                setProducts(suKienProducts);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="p-4" style={{ backgroundColor: '#ebe6e6', minHeight: '100vh' }} >
            <Row className="g-4">
                {
                    products?.map((c) => (
                        <Col className='mt-3' md={2} key={c.id}>
                            <Link to={`/mua-he/${c.id}`} style={{ textDecoration: 'underline black' }}>
                                <div style={{
                                    border: '1px solid #0c0909',
                                    borderRadius: '8px',
                                    backgroundColor: 'white',
                                    padding: '15px',
                                    textAlign: 'center',
                                    transition: '0.3s',
                                    minHeight: '220px',
                                }}>
                                    <img src={c.img} style={{ width: '130px', borderRadius: '4px' }} alt={c.title} />
                                    <h6 className='mt-3' style={{
                                        color: '#333',
                                        minHeight: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }}>
                                        {c.title}
                                    </h6>
                                    <p style={{color: '#d9534f',fontWeight: 'bold', marginTop: '10px' }}>
                                            {c.price.toLocaleString('vi-VN')}đ
                                        </p>
                                </div>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default Sukien;
