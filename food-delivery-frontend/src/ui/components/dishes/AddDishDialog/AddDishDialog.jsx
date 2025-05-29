import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import useRestaurants from "../../../../hooks/useRestaurants.js";

const initialFormData = {
    "name": "",
    "description": "",
    "price": "",
    "quantity": "",
    "restaurantId": ""
};


const AddDishDialog = ({open, onClose, onAdd}) => {

    const restaurants = useRestaurants();
    const [formData, setFormData] = useState(initialFormData);
    // TODO: Implement this.
    const handleSubmit = () => {
        onAdd(formData);
        setFormData(initialFormData);
        onClose();
    };
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };




    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Product</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Description"
                    name="description"
                    fullWidth
                    multiline
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                />
                <TextField
                    margin="dense"
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Restaurant</InputLabel>
                    <Select
                        name="restaurantId"
                        label="Restaurant"
                        variant="outlined"
                        value={formData.restaurantId}
                        onChange={handleChange}
                        className="restaurant-select"
                        MenuProps={{PaperProps: {style: {maxHeight: 100}}}}>
                        {restaurants.map((restaurant) => (
                            <MenuItem
                                key={restaurant.id}
                                value={restaurant.id}
                                className="restaurant-option"
                            >
                                {restaurant.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary" className="submit-btn" onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDishDialog;