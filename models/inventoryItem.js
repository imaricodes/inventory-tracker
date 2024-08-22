import mongoose, { Schema } from "mongoose";

const inventorySchema = new Schema(
    {
        itemName: {type: String, required: true},
        itemSerialNumber: {type: String, required: false}
    },
    {timestamps: true}
)

const InventoryItem = mongoose.models.InventoryItem  || mongoose.model('InventoryItem', inventorySchema)

export default InventoryItem;