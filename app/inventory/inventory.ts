import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface InventoryItem {
  itemId: number;
  itemName: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isPopular: boolean;
  comment?: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class Inventory {
  inventoryList: InventoryItem[] = [];
  message = '';
  isSuccess = false;

  itemId = 0;
  itemName = '';
  category: any = '';
  quantity = 0;
  price = 0;
  supplierName = '';
  isPopular = false;
  comment = '';

  operateName = '';
  newQty = 0;
  newPrice = 0;
  newPopular = false;

  calculateStockStatus(qty: number): 'In Stock' | 'Low Stock' | 'Out of Stock' {
    if (qty <= 0) return 'Out of Stock';
    if (qty <= 10) return 'Low Stock';
    return 'In Stock';
  }

  addItem() {
    if (!this.itemName || !this.category || !this.supplierName) {
      this.showMessage('Error: All fields required!', false);
      return;
    }
    const newItem: InventoryItem = {
      itemId: this.itemId,
      itemName: this.itemName,
      category: this.category,
      quantity: this.quantity,
      price: this.price,
      supplierName: this.supplierName,
      stockStatus: this.calculateStockStatus(this.quantity),
      isPopular: this.isPopular,
      comment: this.comment
    };
    this.inventoryList.push(newItem);
    this.showMessage('Added successfully!', true);
  }

  updateItemByName() {
    const item = this.inventoryList.find(i => i.itemName.toLowerCase() === this.operateName.toLowerCase());
    if (!item) { this.showMessage('Item not found', false); return; }
    item.quantity = this.newQty;
    item.price = this.newPrice;
    item.isPopular = this.newPopular;
    item.stockStatus = this.calculateStockStatus(this.newQty);
    this.showMessage('Updated successfully!', true);
  }

  deleteItemByName() {
    const index = this.inventoryList.findIndex(i => i.itemName.toLowerCase() === this.operateName.toLowerCase());
    if (index === -1) { this.showMessage('Item not found', false); return; }
    this.inventoryList.splice(index, 1);
    this.showMessage('Deleted successfully!', true);
  }

  showMessage(text: string, success: boolean) {
    this.message = text;
    this.isSuccess = success;
    setTimeout(() => this.message = '', 3000);
  }

  getStockColor(status: string) {
    if (status === 'Out of Stock') return 'red';
    if (status === 'Low Stock') return 'orange';
    return 'green';
  }
}