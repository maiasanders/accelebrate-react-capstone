import { SubmitHandler, useForm } from "react-hook-form"
import styles from './CreditCardForm.module.css'
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { Order } from "../../utils/types";

interface CreditCardFormInput {
    pan: string;
    expiryMonth: number;
    expiryYear: number;
    cvv: string;
}

const CreditCardForm = () => {

    const cartItems = useContext(CartContext)

    const { register, handleSubmit } = useForm<CreditCardFormInput>()
    const onSubmit: SubmitHandler<CreditCardFormInput> = (data) => {
        const order: Order = {
            ordertime: Date.now.toString(),
            area:
        }
    } // TODO add handling to add order to database

    // TODO add form validation

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <h3>Add Payment Info</h3>
        <div className="input-group">
            <label htmlFor="pan">Card Number</label>
            <input {...register("pan")} />
        </div>
        <div className="input-group">
            <label>Expiration</label>
            <input {...register("expiryMonth", { required: true, maxLength: 16, minLength: 14, })} id={styles.expiryMonth} />/
            <input {...register("expiryYear")} id={styles.expiryYear} />
        </div>
        <div className="input-group">
            <label htmlFor="cvv">CVV</label>
            <input {...register("cvv")} placeholder="CVV" id={styles.cvv} />
        </div>
        <button type="submit">Submit Payment Info</button>
    </form>)
}

export default CreditCardForm
