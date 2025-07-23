
import React, { useState } from "react";
import { Button, Table, Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {
    productsSelector,
    AddProduct
} from "../redux/slices/productSlice";


const NewItem = () => {


    // set up dispatch
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    //state
    const [productID, setproductID] = useState(0);
    const [productDescription, setproductDescription] = useState("");
    const [productCustomerID, setproductCustomerID] = useState("");
    const [productCustomerName, setproductCustomerName] = useState("");
    const [productNumber, setproductNumber] = useState("");
    const [productItems, setproductItems] = useState("");
    const [productType, setproductType] = useState("");
    const [productSizeId, setproductSizeId] = useState("");
    const [productSize, setproductSize] = useState("");
    const [verCol, setverCol] = useState("");
    const [isActive, setisActive] = useState("");
    const [productRate, setproductRate] = useState("");
    const [productDiscount, setproductDiscount] = useState("");
    const [catDesc, setcatDesc] = useState("");
    const [subCatDesc, setsubCatDesc] = useState("");
    const [photo, setphoto] = useState("");


    const [checked, setChecked] = React.useState(false);
    // fetch data from our store
    const {
        loading,
        error,
        additemSuccess
    } = useSelector(productsSelector);
    const isFormValid = () => {
        return productDescription && productItems && productSize && productRate && catDesc && subCatDesc && photo
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const handleFileRead = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setphoto(base64.replace("data:image/jpeg;base64,", ""));
        console.log(base64)
    }
    const AddItem = () => {
        var product =
        {
            "productID": 0,
            "productDescription": productDescription,
            "productCustomerID": productCustomerID,
            "productCustomerName": productCustomerName,
            "productNumber": productNumber,
            "productItems": productItems,
            "productType": productType,
            "productSizeId": productSizeId,
            "productSize": productSize,
            "verCol": "2022-02-21T08:09:43.051Z",
            "isActive": isActive ? 1 : 0,
            "productRate": productRate,
            "productDiscount": productDiscount,
            "productDiscountedRate": productRate / productDiscount,
            "catDesc": catDesc,
            "subCatDesc": subCatDesc,
            "photo": photo
        }
        dispatch(AddProduct(product))
    }
    // const sumTotal = arr =>
    //     arr.reduce((sum, { offerPrice, Quantity }) => sum + offerPrice * Quantity, 0)


    const onTextValueChange = (e) => {

        switch (e.target.id) {
            case "productDescription":
                setproductDescription(e.target.value)
                break;
            case "productCustomerID":
                setproductCustomerID(e.target.value)
                break;
            case "productCustomerName":
                setproductCustomerName(e.target.value)
                break;
            case "productNumber":
                setproductNumber(e.target.value)
                break;
            case "productItems":
                setproductItems(e.target.value)
                break;
            case "productType":
                setproductType(e.target.value);
                break;
            case "productSizeId":
                setproductSizeId(e.target.value)
                break;
            case "productSize":
                setproductSize(e.target.value)
                break;
            case "isActive":
                setisActive(e.target.value)
                break;
            case "productRate":
                setproductRate(e.target.value)
                break;
            case "productDiscount":
                setproductDiscount(e.target.value)
                break;
            case "catDesc":
                setcatDesc(e.target.value);
                break;
            case "subCatDesc":
                setsubCatDesc(e.target.value);
                break;
            default:
                break;
        }
    }

    const renderItems = () => {

        // loading state
        if (loading) return <strong>Loading please wait...</strong>;

        // error state
        if (error) return <strong>Items not available at this time</strong>;
        if (additemSuccess !== '') return <strong>New Item has been added</strong>;

        // regular data workflow
        return (

            <div className="flcontainer">
                <Tabs defaultActiveKey="Home"
                    id="controlled-tab-example">
                    <Tab eventKey="home" title="Add New Product">


                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Enter Product Details</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr >
                                    <td >
                                        <label htmlFor="productDescription">Product Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productDescription"
                                            onChange={onTextValueChange}
                                            value={productDescription}
                                        />
                                    </td>
                                    <td >
                                        <label htmlFor="productCustomerID">Customer ID</label>
                                        <input
                                            type="text"
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            className="form-control"
                                            id="productCustomerID"
                                            onChange={onTextValueChange}
                                            value={productCustomerID}
                                        />
                                    </td>
                                </tr>
                                <tr >

                                    <td >
                                        <label htmlFor="productCustomerName">Customer Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productCustomerName"
                                            onChange={onTextValueChange}
                                            value={productCustomerName}
                                        />
                                    </td>
                                    <td >
                                        <label htmlFor="productNumber">Product Number</label>
                                        <input
                                            type="text"
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            className="form-control"
                                            id="productNumber"
                                            onChange={onTextValueChange}
                                            value={productNumber}
                                        />
                                    </td>
                                </tr>
                                <tr >
                                    <td >
                                        <label htmlFor="productItems">Product Details</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productItems"
                                            onChange={onTextValueChange}
                                            value={productItems}
                                        />
                                    </td>

                                    <td >
                                        <label htmlFor="productType">Product Type</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productType"
                                            onChange={onTextValueChange}
                                            value={productType}
                                        />
                                    </td>
                                </tr>
                                <td >
                                    <label htmlFor="productSizeId">Product Size Id</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        id="productSizeId"
                                        onChange={onTextValueChange}
                                        value={productSizeId}
                                    />
                                </td>
                                <td >
                                    <label htmlFor="productSize">Product Size</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productSize"
                                        onChange={onTextValueChange}
                                        value={productSize}
                                    />
                                </td>
                                <tr>
                                    <td >
                                        <label htmlFor="isActive">Active</label>

                                        <input type="checkbox"
                                            defaultChecked={true}
                                            value={isActive}
                                            id="isActive"
                                            onChange={onTextValueChange}
                                            value={isActive}
                                        />

                                    </td>
                                    <td >
                                        <label htmlFor="productRate">productRate</label>
                                        <input
                                            type="text"
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            className="form-control"
                                            id="productRate"
                                            onChange={onTextValueChange}
                                            value={productRate}
                                        />
                                    </td>
                                </tr><tr>
                                    <td >
                                        <label htmlFor="productDiscount">productDiscount</label>

                                        <input
                                            type="text"
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            className="form-control"
                                            id="productDiscount"
                                            onChange={onTextValueChange}
                                            value={productDiscount}
                                        />
                                    </td>
                                    <td >
                                        <label htmlFor="catDesc">Category</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="catDesc"
                                            value={catDesc}
                                            onChange={onTextValueChange} />
                                    </td>
                                </tr><tr>
                                    <td >
                                        <label htmlFor="subCatDesc">Sub Category</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subCatDesc"
                                            value={subCatDesc}
                                            onChange={onTextValueChange} />
                                    </td>
                                    <td >
                                        <label htmlFor="photo">photo</label>
                                        <input
                                            type="file"
                                            id="photo"

                                            onChange={handleFileRead} />
                                        < img
                                            src={"data:image/png;base64," +
                                                photo
                                            }
                                            className="img-fluid" alt="Responsive image"

                                        />
                                    </td>

                                </tr>
                            </tbody>
                            <tfoot>

                                <tr>
                                    <td colSpan="3"><Button onClick={AddItem} disabled={!isFormValid()}> ADD PRODUCT </Button></td>
                                </tr>

                            </tfoot>
                        </Table>
                    </Tab>
                    <Tab eventKey="profile" title="Edit Product">

                    </Tab>

                </Tabs>
            </div >



        )
    };

    // template
    return (
        // onWheel={()=> {dispatch(fetchProducts("Sarees"));}}
        <div  >
            {renderItems()}
        </div>
    );
};

export default NewItem;