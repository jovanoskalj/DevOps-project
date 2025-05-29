import {useCallback, useEffect, useState} from "react";
import orderRepository from "../repository/orderRepository.js";
import {data} from "react-router";
//
// const initialState = {
//     "orders": [],
//     "loading": true,
// };

const useOrder = () => {
    const [order, setOrder] = useState(null);


    const fetchPendingOrder = useCallback(() => {

        orderRepository
            .findPending()
            .then((response) =>
                setOrder(
                    response.data
                ))
            .catch((error) => console.log(error));
    }, []);

    const confirmPendingOrder = useCallback((data) => {
        orderRepository
            .confirmPendingOrder(data)
            .then(() => {
                console.log("Successfully confirmed a new product.");
                fetchPendingOrder();
            })
            .catch((error) => console.log(error));
    }, [fetchPendingOrder]);


    // TODO: Implement this.
    const cancelPendingOrder = useCallback((data) => {
        orderRepository
            .cancelPendingOrder(data)
            .then(() => {
                console.log("Successfully confirmed a new product.");
                fetchPendingOrder();
            })
            .catch((error) => console.log(error));
    }, [fetchPendingOrder]);

    useEffect(() => {
        fetchPendingOrder();
    }, [fetchPendingOrder]);


    return {order, fetchPendingOrder, confirmPendingOrder, cancelPendingOrder};
};

export default useOrder;