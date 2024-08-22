import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './Shop.module.css';
import { HiOutlineShoppingBag } from "react-icons/hi";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { motion } from 'framer-motion';
import { PaystackButton } from 'react-paystack';
import Confirmation from "../confirmation/Confirmation";
import { useAuth } from "../AuthProvider";
import candid from '/shop/candid-7YBRhk5NVV8-unsplash.jpg';
import candidpack from '/shop/candid-33AM1lbWadc-unsplash.jpg';
import invisalign from '/shop/candid-FDuefSgoO8E-unsplash.jpg';
import listerine from '/shop/mishaal-zahed-KDJ1TbLDoOo-unsplash.jpg';

function Shop() {
    const publicKey = 'pk_test_820d3ff0ec4efe9b501e85c8408874dcbe30377c';
    const { user } = useAuth();

    const [cartAdd, setCartAdd] = useState(0);
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [items, setItems] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');

    const fetchShop = async (token) => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/shop/list/", {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setItems(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const componentProps = {
        email,
        amount,
        metadata: {
            name,
            phoneNumber
        },
        currency: "GHS",
        publicKey,
        text: "Pay",
        onSuccess: () => {
            alert("Payment Received");
            setIsVisible(true);
        },
        onClose: () => alert("Do you want to cancel")
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetchShop(token);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const addToCart = (price) => {
        setCartAdd(cartAdd + 1);
        setAmount(prevTotal => prevTotal + price);
    };

    const removeFromCart = (price) => {
        if (cartAdd && amount) {
            setCartAdd(cartAdd - 1);
            setAmount(prevTotal => prevTotal - price);
        }
    };

    const fadeIn = {
        initial: { opacity: 0, y: 80 },
        animate: (index) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.25 * index, duration: 0.5 }
        })
    };

    const cleanCart = () => {
        handleClose()
        setCartAdd(0)
        setAmount(0)
    }
    const getImage = (itemName) => {
        switch (itemName) {
            case "Candid Whitner":
                return candid;
            case "Candid Pack":
                return candidpack;
            case "Invisalign":
                return invisalign;
            case "Listerine Mouthwash":
                return listerine;
            default:
                return null;
        }
    };

    return (
        <>
            {isVisible && (
                <div className={styles.confirm}>
                    <Confirmation isVisible={true} header={"Payment Successful"} text={`A confirmation Email has been sent to ${email}`} />
                </div>
            )}
            {!isVisible && (
                <div>
                    <div className={styles.subcontainer}>
                        <>
                            <p className={styles.header}>DENTES+</p>
                            <div className={styles.cartContainer}>
                            {amount > 0 && (
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    <HiOutlineShoppingBag size={25} className={styles.cartIcon} />
                                </Button>
                            )}
                                <Dialog open={open} onClose={handleClose}>
                                    <form onSubmit={handleSubmit}>
                                        <DialogTitle>CHECKOUT</DialogTitle>
                                        <DialogContent className={styles.dialogue}>
                                            <DialogContentText>
                                                Proceed to Checkout
                                            </DialogContentText>
                                            <div className={styles.textField}>
                                            <TextField
                                                autoFocus
                                                required
                                                margin="dense"
                                                id="name"
                                                name="name"
                                                label="Full Name"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <TextField
                                                required
                                                margin="dense"
                                                id="email"
                                                name="email"
                                                label="Email Address"
                                                type="email"
                                                fullWidth
                                                variant="standard"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <TextField
                                                required
                                                margin="dense"
                                                id="phone"
                                                name="phone"
                                                label="Phone Number"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                            <TextField
                                                required
                                                margin="dense"
                                                id="address"
                                                name="address"
                                                label="Delivery Address"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={cleanCart}>Clear</Button>
                                            <PaystackButton {...componentProps} className={styles.PayButton}/>
                                        </DialogActions>
                                    </form>
                                </Dialog>
                                {cartAdd > 0 && <span className={styles.badge}>{cartAdd}</span>}
                            </div>
                        </>
                    </div>
                    <div className={styles.container}>
                        {items.map((item, cindex) => (
                            <motion.div
                                key={item.shop_id}
                                className={styles.polaroid}
                                variants={fadeIn}
                                initial='initial'
                                whileInView='animate'
                                viewport={{ once: false }}
                                custom={cindex}
                            >
                                <img src={getImage(item.item_name)} alt={item.item_name} />
                                <div className={styles.info}>
                                    <div>
                                        <p className={styles.ItemName}>{item.item_name}</p>
                                        <p className={styles.describe}>{item.description}</p>
                                        <p>{item.price} GHC</p>
                                    </div>
                                    <div className={styles.cart}>
                                        <button onClick={() => addToCart(item.price * 100)}>+</button>
                                        <button onClick={() => removeFromCart(item.price * 100)}>-</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Shop;
