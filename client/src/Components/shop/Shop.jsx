import React, { useState } from "react";
import styles from './Shop.module.css';
import candid from '/shop/candid-7YBRhk5NVV8-unsplash.jpg';
import candidpack from '/shop/candid-33AM1lbWadc-unsplash.jpg';
import invisalign from '/shop/candid-FDuefSgoO8E-unsplash.jpg';
import listerine from '/shop/mishaal-zahed-KDJ1TbLDoOo-unsplash.jpg';
import { HiOutlineShoppingBag } from "react-icons/hi";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { motion } from 'framer-motion';
import { PaystackButton} from 'react-paystack'
import Confirmation from "../confirmation/Confirmation";

function Shop() {
    const publicKey = 'pk_test_820d3ff0ec4efe9b501e85c8408874dcbe30377c'
    const [cartAdd, setCartAdd] = useState(0);
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = useState(false);
    const[isVisible, setIsVisible] = useState(false)
    const [name, setName] = useState('')
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
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
            alert("Payment Received")
            setIsVisible(true);
        },
        onClose: () => alert("Do you want to cancel")    
    }

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

 

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const addToCart = (price) => {
        setCartAdd(cartAdd + 1);
        setAmount((prevTotal => prevTotal + price));
        console.log(amount)
    };

    const removeFromCart = (price) => {
        if (cartAdd && amount) {
            setCartAdd(cartAdd - 1);
            setAmount((prevTotal => prevTotal - price));
        }
        console.log(amount)
    };

    const shopInventory = [
        {
            name: 'Candid Whitener',
            description: '',
            price: 250 * 100,
            image: candid
        },
        {
            name: 'Candid Pack',
            description: '',
            price: 400 * 100,
            image: candidpack
        },
        {
            name: 'Invisalign',
            description: '',
            price: 180 * 100,
            image: invisalign
        },
        {
            name: 'Listerine Mouthwash',
            description: 'BEST SELLER',
            price: 200 * 100,
            image: listerine
        }
    ];

    const fadeIn = {
        initial: { opacity: 0, y: 80 },
        animate: (index) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.25 * index, duration: 0.5 }
        })
    };

    return (
        <>
        {isVisible && (
            <div className={styles.confirm}>
                <Confirmation isVisible={true} header={"Payment Successful"} text={`A confirmation Email has been sent to ${email}`}/>
            </div>
        )}
        {!isVisible && (
            <div>
                <div className={styles.subcontainer}>
                    <>
                        <p className={styles.header}>DENTES+</p>
                        <div className={styles.cartContainer}>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                <HiOutlineShoppingBag size={25} className={styles.cartIcon} />
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <form onSubmit={handleSubmit}>
                                    <DialogTitle>CHECKOUT</DialogTitle>
                                    <DialogContent className={styles.dialogue}>
                                        <DialogContentText>
                                            Proceed to Checkout
                                        </DialogContentText>
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
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>CANCEL</Button>
                                        <PaystackButton {...componentProps} />
                                    </DialogActions>
                                </form>
                            </Dialog>
                            {cartAdd > 0 && <span className={styles.badge}>{cartAdd}</span>}
                        </div>
                    </>
                 
                </div>
                <div className={styles.container}>
                    {shopInventory.map((item, cindex) => (
                        <motion.div
                            key={cindex}
                            className={styles.polaroid}
                            variants={fadeIn}
                            initial='initial'
                            whileInView='animate'
                            viewport={{ once: false }}
                            custom={cindex}
                        >
                            <img src={item.image} alt={item.name} />
                            <div className={styles.info}>
                                <div>
                                    <p className={styles.ItemName}>{item.name}</p>
                                    <p className={styles.describe}>{item.description}</p>
                                    <p>{item.price / 100} GHC</p>
                                </div>
                                <div className={styles.cart}>
                                    <button onClick={() => addToCart((item.price))}>+</button>
                                    <button onClick={() => removeFromCart((item.price))}>-</button>
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
