import React, { useEffect, useState, useCallback} from "react";
import { Toast } from "react-bootstrap";
import AddProduct from "./AddProduct";
import Product from "./Product";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notificatons";
import {
    getProducts as getProductList,
    buyProduct,
    createProduct,
} from "../../utils/marketplace";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProducts = useCallback( async () => {
        try{
            setLoading(true);
            setProducts( await getProductList());
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const AddProduct = async (data) => {
        try {
            setLoading(true);
            createProduct(data).then( (response) => {
                getProducts();
            });
            Toast(<NotificationSuccess text="Product added successfully." />);
        } catch (error) {
            console.log(error);
            Toast(<NotificationError text="Failed to create a product" />);
        } finally {
            setLoading(false);
        }
    };
    
    const buy = async (id, price) => {
        try {
            setLoading(true);
            await buyProduct({
                id, price
            }).then((response) => getProducts());
            Toast(<NotificationSuccess text="Product bought successfully." />);
        } catch (error) {
            console.log(error);
            Toast(<NotificationError text="Failed to purchase product." />);
        }finally {
            setLoading(false);
        }
    };
    
    useEffect( ()=> { getProducts();}, []);
    
    return (
        <>
            {! loading ? (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fs-4 fw-bold-mb-0">Street Food</h2>
                        <AddProduct save={AddProduct} />
                    </div>
                    <Row xs={1} sm={2} lg={3} className="g-3 mb-5 g-xl-4 g-xxl-5">
                        {products.map((_product) => (
                            <Product
                                product={{ ..._product, }}
                                buy={buy}
                            />
                        ))}
                    </Row>
                </>
            ) : ( <Loader />
            )}
        </>
    );
};

export default Products;

